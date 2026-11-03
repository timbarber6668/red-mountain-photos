package com.redmountain.shotflow.probe

import com.redmountain.shotflow.camera.ccapi.CcapiClient
import com.redmountain.shotflow.camera.ccapi.HttpResponse
import com.redmountain.shotflow.camera.ccapi.HttpTransport
import kotlinx.coroutines.future.await
import kotlinx.coroutines.runBlocking
import java.io.File
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse.BodyHandlers
import java.time.Duration

/** java.net.http transport for running on a laptop joined to the same router as the camera. */
class JdkTransport : HttpTransport {
    private val client = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(5)).build()
    override suspend fun send(method: String, url: String, jsonBody: String?): HttpResponse {
        val body = jsonBody?.let { HttpRequest.BodyPublishers.ofString(it) } ?: HttpRequest.BodyPublishers.noBody()
        val req = HttpRequest.newBuilder(URI(url)).timeout(Duration.ofSeconds(15))
            .header("Content-Type", "application/json").method(method, body).build()
        val r = client.sendAsync(req, BodyHandlers.ofByteArray()).await()
        return HttpResponse(r.statusCode(), r.body())
    }
}

/**
 * Spike 1 from the README. Answers "what can this camera do over CCAPI?" in one run:
 *
 *   ./gradlew :probe:run --args="192.168.8.20"
 *
 * Writes ccapi-<host>.json with the full API list and every shooting setting, and prints
 * anything that looks like flash or bracketing control, plus live view frame rate.
 */
fun main(args: Array<String>) = runBlocking {
    val host = args.firstOrNull() ?: run { println("usage: probe <camera-ip>"); return@runBlocking }
    val cam = CcapiClient(JdkTransport(), host)

    val apis = cam.listApis()
    val settings = runCatching { cam.allShootingSettings() }.getOrElse { println("settings: ${it.message}"); null }
    File("ccapi-$host.json").writeText("""{"apis":$apis,"shootingSettings":${settings ?: "null"}}""")
    println("Saved ccapi-$host.json")

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
