package com.redmountain.shotflow.probe

import com.redmountain.shotflow.camera.ccapi.CcapiClient
import com.redmountain.shotflow.camera.ccapi.HttpResponse
import com.redmountain.shotflow.camera.ccapi.HttpTransport
import com.redmountain.shotflow.flash.FlashPower
import com.redmountain.shotflow.flash.ManualFlashController
import com.redmountain.shotflow.flash.Prompter
import com.redmountain.shotflow.flow.FlowEvent
import com.redmountain.shotflow.flow.FlowRunner
import com.redmountain.shotflow.flow.Flows
import com.redmountain.shotflow.flow.ShotFlow
import com.redmountain.shotflow.flow.Step
import com.redmountain.shotflow.monitor.Filters
import com.redmountain.shotflow.monitor.FocusPeaking
import com.redmountain.shotflow.monitor.Frame
import com.redmountain.shotflow.monitor.Histogram
import com.redmountain.shotflow.overlay.ImageRect
import com.redmountain.shotflow.overlay.Overlays
import kotlinx.coroutines.future.await
import kotlinx.coroutines.runBlocking
import java.awt.BasicStroke
import java.awt.Color
import java.awt.RenderingHints
import java.awt.image.BufferedImage
import java.io.ByteArrayInputStream
import java.io.File
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse.BodyHandlers
import java.time.Duration
import javax.imageio.ImageIO
import kotlin.system.exitProcess

/** java.net.http transport for running on a laptop joined to the same Wi-Fi as the camera. */
class JdkTransport : HttpTransport {
    private val client = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(5)).build()
    override suspend fun send(method: String, url: String, jsonBody: String?): HttpResponse {
        val body = jsonBody?.let { HttpRequest.BodyPublishers.ofString(it) } ?: HttpRequest.BodyPublishers.noBody()
        val req = HttpRequest.newBuilder(URI(url)).timeout(Duration.ofSeconds(30))
            .header("Content-Type", "application/json").method(method, body).build()
        val r = client.sendAsync(req, BodyHandlers.ofByteArray()).await()
        return HttpResponse(r.statusCode(), r.body())
    }
}

/** In the terminal, "turn the flash on" becomes: print it, wait for Enter. */
val enterPrompter = Prompter { message ->
    print("\n>>> $message, then press Enter ")
    readlnOrNull()
}

const val USAGE = """
ShotFlow test tool. Camera and laptop on the same Wi-Fi, camera in M.

  info       <ip>                         what the camera supports, flash controls, live view speed
  shoot      <ip>                         take one picture
  bracket    <ip> [count=5] [step=1]      ambient bracket, e.g.  bracket 192.168.1.40 7 1
  flambient  <ip> [count=5] [step=1] [flash=16] [pull=-2|none]
                                          bracket, flash frame at 1/flash, window pull, flash off
  snapshot   <ip>                         save live view frames with every overlay and filter as PNGs
"""

fun main(args: Array<String>) = runBlocking {
    if (args.size < 2) { println(USAGE); exitProcess(1) }
    val (cmd, host) = args
    val rest = args.drop(2)
    val cam = CcapiClient(JdkTransport(), host)
    try {
        when (cmd) {
            "info" -> info(cam, host)
            "shoot" -> { cam.shoot(); println("Shot taken.") }
            "bracket" -> runFlow(cam, Flows.bracket(rest.int(0, 5), rest.dbl(1, 1.0)))
            "flambient" -> runFlow(
                cam,
                Flows.flambient(
                    ambientCount = rest.int(0, 5),
                    ambientStep = rest.dbl(1, 1.0),
                    flashPower = FlashPower.fraction(rest.int(2, 16)),
                    windowPullStops = rest.getOrNull(3).let { if (it == "none") null else it?.toDouble() ?: -2.0 },
                ),
            )
            "snapshot" -> snapshot(cam)
            else -> { println(USAGE); exitProcess(1) }
        }
    } catch (e: java.net.ConnectException) {
        println("Can't reach the camera at $host:8080. Check it shows as connected on the camera, the IP, and that the laptop is on the same Wi-Fi.")
        exitProcess(2)
    }
}

private fun List<String>.int(i: Int, d: Int) = getOrNull(i)?.toInt() ?: d
private fun List<String>.dbl(i: Int, d: Double) = getOrNull(i)?.toDouble() ?: d

suspend fun info(cam: CcapiClient, host: String) {
    val apis = cam.listApis()
    val settings = runCatching { cam.allShootingSettings() }.getOrElse { println("settings: ${it.message}"); null }
    File("ccapi-$host.json").writeText("""{"apis":$apis,"shootingSettings":${settings ?: "null"}}""")
    println("Connected. Saved ccapi-$host.json (send this file over, it shows everything your body supports).")

    val everything = apis.toString() + (settings?.toString() ?: "")
    val interesting = Regex("\"[^\"]*(flash|speedlite|strobe|aeb|bracket)[^\"]*\"", RegexOption.IGNORE_CASE)
        .findAll(everything).map { it.value }.toSortedSet()
    println("\nFlash and bracketing related names found:")
    if (interesting.isEmpty()) println("  none (flash control will need the USB or radio route)") else interesting.forEach { println("  $it") }

    println("\nLive view speed (medium size, 50 frames)...")
    runCatching {
        cam.startLiveView()
        val t0 = System.nanoTime()
        var bytes = 0L
        repeat(50) { bytes += cam.liveViewFrame().size }
        val secs = (System.nanoTime() - t0) / 1e9
        println("  %.1f fps, about %d KB per frame".format(50 / secs, bytes / 50 / 1024))
        cam.stopLiveView()
    }.onFailure { println("  live view failed: ${it.message}") }
}

/** Shows the plan (every shutter speed it will use), waits for Enter, then shoots. */
suspend fun runFlow(cam: CcapiClient, flow: ShotFlow) {
    val runner = FlowRunner(cam, ManualFlashController(enterPrompter), enterPrompter)
    val plan = runner.plan(flow)
    println("\n${flow.name}  (base shutter ${plan.baseTv})")
    var tv = plan.baseTv
    plan.resolved.forEach { (step, value) ->
        when (step) {
            is Step.Shutter -> tv = value ?: "?"
            is Step.Shoot -> println("  ${step.label.padEnd(22)} $tv")
            is Step.Flash -> println("  (flash ${if (step.firing) "ON" + (step.power?.let { " at ${it.label()}" } ?: "") else "OFF"})")
            else -> {}
        }
    }
    plan.warnings.forEach { println("  warning: $it") }
    if (!plan.canRun) { plan.problems.forEach { println("  cannot run: $it") }; return }

    print("\nPress Enter to start, Ctrl+C to cancel ")
    readlnOrNull()
    val t0 = System.currentTimeMillis()
    runner.run(flow) { e ->
        when (e) {
            is FlowEvent.ShotTaken -> println("  ${e.number}/${e.total}  ${e.label.padEnd(22)} ${e.tv}")
            is FlowEvent.Finished -> println("Done in %.1f s. Shutter back to ${e.restoredTv}.".format((System.currentTimeMillis() - t0) / 1000.0))
            else -> {}
        }
    }
}

/**
 * Grabs a live view frame and writes it out once per overlay preset and once per filter, so
 * you can see on your laptop what the app will show on the phone. Files go in ./snapshots.
 */
suspend fun snapshot(cam: CcapiClient) {
    cam.startLiveView()
    Thread.sleep(800) // first frames after starting can be black
    val jpeg = cam.liveViewFrame()
    cam.stopLiveView()
    val img = ImageIO.read(ByteArrayInputStream(jpeg)) ?: error("camera sent something that isn't a JPEG")
    val w = img.width; val h = img.height
    val frame = Frame(w, h, img.getRGB(0, 0, w, h, null, 0, w))
    val dir = File("snapshots").apply { mkdirs() }

    fun save(name: String, f: Frame, draw: (java.awt.Graphics2D) -> Unit = {}) {
        val out = BufferedImage(w, h, BufferedImage.TYPE_INT_RGB)
        out.setRGB(0, 0, w, h, f.pixels, 0, w)
        val g = out.createGraphics()
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON)
        draw(g)
        g.dispose()
        ImageIO.write(out, "png", File(dir, "$name.png"))
    }

    save("00-live", frame)
    val rect = ImageRect.fit(w.toFloat(), h.toFloat(), w.toDouble() / h)
    Overlays.defaultLibrary.forEachIndexed { i, preset ->
        save("overlay-%02d-%s".format(i + 1, preset.name.lowercase().replace(Regex("[^a-z0-9]+"), "-")), frame) { g ->
            g.color = Color(255, 255, 255, 210)
            g.stroke = BasicStroke(maxOf(1f, w / 600f))
            preset.layers.flatMap { Overlays.build(it, w.toDouble() / h) }.forEach { pl ->
                pl.points.zipWithNext().forEach { (a, b) ->
                    val (x1, y1) = rect.map(a); val (x2, y2) = rect.map(b)
                    g.drawLine(x1.toInt(), y1.toInt(), x2.toInt(), y2.toInt())
                }
            }
        }
    }
    save("filter-mono", Filters.monochrome(frame))
    save("filter-high-contrast", Filters.highContrast(frame))
    save("filter-notan-2", Filters.notan(frame, 2))
    save("filter-notan-3", Filters.notan(frame, 3))
    save("filter-zebra", Filters.zebra(frame))
    save("filter-peaking", FocusPeaking.paint(frame, FocusPeaking.mask(frame)))

    val hist = Histogram.of(frame)
    println("Saved ${dir.listFiles()!!.size} images to ${dir.absolutePath} (frame ${w}x$h).")
    println("Histogram: %.1f%% black, %.1f%% white, %.1f%% of pixels clipping in some colour channel."
        .format(hist.shadowClip() * 100, hist.highlightClip() * 100, hist.channelHighlightClip() * 100))
}
