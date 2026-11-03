package com.redmountain.shotflow

import com.redmountain.shotflow.camera.CameraBackend
import com.redmountain.shotflow.camera.SettingKey
import com.redmountain.shotflow.camera.SettingState
import com.redmountain.shotflow.camera.ShutterSpeed
import com.redmountain.shotflow.camera.ccapi.CcapiClient
import com.redmountain.shotflow.camera.ccapi.HttpResponse
import com.redmountain.shotflow.camera.ccapi.HttpTransport
import com.redmountain.shotflow.flash.FlashController
import com.redmountain.shotflow.flash.FlashPower
import com.redmountain.shotflow.flow.BracketOrder
import com.redmountain.shotflow.flow.FlowEvent
import com.redmountain.shotflow.flow.FlowRunner
import com.redmountain.shotflow.flow.Flows
import com.redmountain.shotflow.monitor.Filters
import com.redmountain.shotflow.monitor.FocusPeaking
import com.redmountain.shotflow.monitor.Frame
import com.redmountain.shotflow.monitor.Histogram
import com.redmountain.shotflow.overlay.ImageRect
import com.redmountain.shotflow.overlay.OverlayKind
import com.redmountain.shotflow.overlay.Pt
import com.redmountain.shotflow.overlay.OverlaySpec
import com.redmountain.shotflow.overlay.Overlays
import kotlinx.coroutines.test.runTest
import kotlin.math.abs
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

/** Canon's third-stop shutter list, 30" to 1/8000. */
val TV_LIST: List<String> = listOf(
    "30\"", "25\"", "20\"", "15\"", "13\"", "10\"", "8\"", "6\"", "5\"", "4\"", "3\"2", "2\"5", "2\"", "1\"6", "1\"3",
    "1\"", "0\"8", "0\"6", "0\"5", "0\"4", "0\"3", "1/4", "1/5", "1/6", "1/8", "1/10", "1/13", "1/15", "1/20", "1/25",
    "1/30", "1/40", "1/50", "1/60", "1/80", "1/100", "1/125", "1/160", "1/200", "1/250", "1/320", "1/400", "1/500",
    "1/640", "1/800", "1/1000", "1/1250", "1/1600", "1/2000", "1/2500", "1/3200", "1/4000", "1/5000", "1/6400", "1/8000",
)

open class FakeCamera(var tv: String = "1/30", var mode: String = "m") : CameraBackend {
    val log = mutableListOf<String>()
    override suspend fun get(key: SettingKey) = when (key) {
        SettingKey.SHUTTER -> SettingState(tv, TV_LIST + "bulb")
        SettingKey.MODE_DIAL -> SettingState(mode, listOf("m", "av", "tv"))
        else -> SettingState("", emptyList())
    }
    override suspend fun set(key: SettingKey, value: String) { if (key == SettingKey.SHUTTER) tv = value; log += "set ${key.path}=$value" }
    override suspend fun shoot(af: Boolean) { log += "shoot @$tv" }
    override suspend fun startLiveView(cameraDisplayOn: Boolean) {}
    override suspend fun stopLiveView() {}
    override suspend fun liveViewFrame() = ByteArray(0)
}

class FakeFlash : FlashController {
    override val name = "fake"
    val log = mutableListOf<String>()
    override suspend fun setFiring(enabled: Boolean) { log += if (enabled) "on" else "off" }
    override suspend fun setPower(power: FlashPower) { log += "power ${power.label()}" }
}

class ExposureTest {
    @Test fun parsesCanonShutterStrings() {
        assertEquals(1.0 / 125, ShutterSpeed.parseSeconds("1/125"))
        assertEquals(0.5, ShutterSpeed.parseSeconds("0\"5"))
        assertEquals(1.3, ShutterSpeed.parseSeconds("1\"3")!!, 1e-9)
        assertEquals(30.0, ShutterSpeed.parseSeconds("30\""))
        assertEquals(null, ShutterSpeed.parseSeconds("bulb"))
    }
}

class FlashPowerTest {
    @Test fun labelsLikeAFlash() {
        assertEquals("1/1", FlashPower.FULL.label())
        assertEquals("1/16", FlashPower.fraction(16).label())
        assertEquals("1/16 +0.3", FlashPower(3.7).label())
        assertEquals("1/128", FlashPower.fraction(128).label())
        assertEquals("1/8 +0.7", FlashPower(2.4).snapped().label()) // 2.33 stops below full
    }
}

class FlowTest {
    @Test fun bracketOffsets() {
        assertEquals(listOf(-2.0, -1.0, 0.0, 1.0, 2.0), Flows.bracketOffsets(5, 1.0))
        assertEquals(listOf(-1.0, 0.0, 1.0, 2.0), Flows.bracketOffsets(4, 1.0))
        assertEquals(listOf(0.0, -1.5, 1.5), Flows.bracketOffsets(3, 1.5, BracketOrder.CENTER_FIRST))
    }

    @Test fun runsFlambientAndRestoresCamera() = runTest {
        val cam = FakeCamera(tv = "1/30")
        val flash = FakeFlash()
        val events = mutableListOf<FlowEvent>()
        FlowRunner(cam, flash) {}.run(Flows.flambient(ambientCount = 5, flashPower = FlashPower.fraction(16)), events::add)

        val shots = cam.log.filter { it.startsWith("shoot") }
        // dark to bright ambient, flash at base, window pull 2 stops under
        assertEquals(listOf("shoot @1/125", "shoot @1/60", "shoot @1/30", "shoot @1/15", "shoot @1/8", "shoot @1/30", "shoot @1/125"), shots)
        assertEquals("1/30", cam.tv, "shutter put back")
        assertEquals("off", flash.log.last(), "flash left off")
        assertTrue("power 1/16" in flash.log)
        assertEquals(7, events.filterIsInstance<FlowEvent.ShotTaken>().size)
    }

    @Test fun refusesBracketPastCameraRange() = runTest {
        val plan = FlowRunner(FakeCamera(tv = "15\""), FakeFlash()) {}.plan(Flows.bracket(5, 1.0))
        assertFalse(plan.canRun) // +2 EV from 15" is 60", camera tops out at 30"
    }

    @Test fun warnsOutsideManual() = runTest {
        val plan = FlowRunner(FakeCamera(mode = "av"), FakeFlash()) {}.plan(Flows.bracket(3, 1.0))
        assertTrue(plan.canRun)
        assertEquals(1, plan.warnings.size)
    }

    @Test fun restoresEvenWhenAShotFails() = runTest {
        var shots = 0
        val cam = object : FakeCamera(tv = "1/30") {
            override suspend fun shoot(af: Boolean) { if (++shots == 2) error("card full") }
        }
        val flash = FakeFlash()
        val result = runCatching { FlowRunner(cam, flash) {}.run(Flows.bracket(5, 1.0)) }
        assertTrue(result.isFailure)
        assertEquals("1/30", cam.tv)
    }
}

class CcapiTest {
    private class Recorder(val replies: ArrayDeque<HttpResponse>) : HttpTransport {
        val calls = mutableListOf<String>()
        override suspend fun send(method: String, url: String, jsonBody: String?): HttpResponse {
            calls += "$method $url ${jsonBody ?: ""}".trim()
            return replies.removeFirstOrNull() ?: HttpResponse(200, ByteArray(0))
        }
    }

    @Test fun readsAndWritesSettings() = runTest {
        val t = Recorder(ArrayDeque(listOf(HttpResponse(200, """{"value":"1/30","ability":["1/30","1/60"]}""".encodeToByteArray()))))
        val c = CcapiClient(t, "192.168.8.20")
        assertEquals(SettingState("1/30", listOf("1/30", "1/60")), c.get(SettingKey.SHUTTER))
        c.set(SettingKey.SHUTTER, "1/60")
        c.shoot()
        assertEquals(
            listOf(
                "GET http://192.168.8.20:8080/ccapi/ver100/shooting/settings/tv",
                "PUT http://192.168.8.20:8080/ccapi/ver100/shooting/settings/tv {\"value\":\"1/60\"}",
                "POST http://192.168.8.20:8080/ccapi/ver100/shooting/control/shutterbutton {\"af\":false}",
            ),
            t.calls,
        )
    }

    @Test fun waitsOutBusyCamera() = runTest {
        val busy = HttpResponse(503, """{"message":"Device busy"}""".encodeToByteArray())
        val t = Recorder(ArrayDeque(listOf(busy, busy, HttpResponse(200, ByteArray(0)))))
        CcapiClient(t, "cam", busyDelayMs = 1).shoot()
        assertEquals(3, t.calls.size)
    }
}

class MonitorTest {
    private fun frame(w: Int, h: Int, f: (Int, Int) -> Int) =
        Frame(w, h, IntArray(w * h) { val v = f(it % w, it / w); (0xFF shl 24) or (v shl 16) or (v shl 8) or v })

    @Test fun histogramCountsClipping() {
        val f = frame(10, 10) { x, _ -> if (x < 2) 0 else if (x > 7) 255 else 128 }
        val h = Histogram.of(f)
        assertEquals(0.2, h.shadowClip(), 1e-9)
        assertEquals(0.2, h.highlightClip(), 1e-9)
    }

    @Test fun peakingFindsTheSharpEdgeOnly() {
        val sharp = frame(40, 40) { x, _ -> if (x < 20) 30 else 220 }
        val m = FocusPeaking.mask(sharp)
        val hits = m.indices.filter { m[it] }.map { it % 40 }.toSet()
        assertEquals(setOf(19, 20), hits)

        val flat = frame(40, 40) { x, _ -> 100 + x / 10 } // soft gradient, nothing in focus
        assertTrue(FocusPeaking.mask(flat).none { it })
    }

    @Test fun notanSplitsIntoTwoTones() {
        val f = frame(16, 1) { x, _ -> x * 16 }
        val tones = Filters.notan(f, 2).pixels.map { it and 0xFF }.toSet()
        assertEquals(setOf(0, 255), tones)
    }
}

class OverlayTest {
    @Test fun phiGridAt382And618() {
        val xs = Overlays.build(OverlaySpec(OverlayKind.PHI_GRID), 1.5).map { it.points[0].x }
        assertEquals(0.382, xs[0], 1e-3); assertEquals(0.618, xs[1], 1e-3)
    }

    @Test fun spiralStaysInFrameAndCurlsTowardTheEye() {
        val spiral = Overlays.build(OverlaySpec(OverlayKind.GOLDEN_SPIRAL), 1.5).first().points
        assertTrue(spiral.all { it.x in -1e-9..1 + 1e-9 && it.y in -1e-9..1 + 1e-9 })
        assertEquals(0.0, spiral.first().x, 1e-9)
        assertEquals(1.0, spiral.first().y, 1e-9)
        // The eye (pole) of a golden spiral is where the rectangle's diagonals cross, at
        // phi^2/(phi^2+1) = 0.7236 of the way across and down. It is NOT the 0.618 phi-grid point.
        val eye = spiral.last()
        assertTrue(abs(eye.x - 0.7236) < 0.01 && abs(eye.y - 0.7236) < 0.01, "eye at $eye")
    }

    @Test fun goldenTrianglePerpendicularIsSquareOnScreen() {
        val aspect = 1.5
        val lines = Overlays.build(OverlaySpec(OverlayKind.GOLDEN_TRIANGLES), aspect)
        val (a, b) = lines[1].points
        val dx = (b.x - a.x) * aspect; val dy = b.y - a.y
        assertEquals(0.0, dx * aspect + dy * 1.0, 1e-9) // dot product with the diagonal (aspect, 1)
    }

    @Test fun cropGuideFor4x5InA3x2Frame() {
        val box = Overlays.build(OverlaySpec(OverlayKind.CROP_GUIDE, cropAspect = 0.8), 1.5).first().points
        assertEquals(0.8 / 1.5, box[1].x - box[0].x, 1e-9)
        // thirds drawn inside that crop: first vertical line one third into the crop box
        val thirds = Overlays.build(OverlaySpec(OverlayKind.THIRDS, insideCrop = 0.8), 1.5)
        assertEquals(box[0].x + (0.8 / 1.5) / 3, thirds[0].points[0].x, 1e-9)
    }

    @Test fun overlaysLockToTheLiveViewPictureNotTheScreen() {
        // 3:2 live view on a 2400x1080 landscape phone: picture is 1620 wide, centred
        val r = ImageRect.fit(2400f, 1080f, 1.5)
        assertEquals(ImageRect(390f, 0f, 1620f, 1080f), r)
        assertEquals(390f + 540f to 360f, r.map(Pt(1.0 / 3, 1.0 / 3)))
    }
}
