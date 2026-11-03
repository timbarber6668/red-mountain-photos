package com.redmountain.shotflow.overlay

import kotlinx.serialization.Serializable
import kotlin.math.PI
import kotlin.math.cos
import kotlin.math.sin

/** A point in frame coordinates: x and y from 0 to 1, top-left origin. The view scales to pixels. */
data class Pt(val x: Double, val y: Double)

/** Overlays are just polylines, so the Android view draws them all the same way. */
data class Polyline(val points: List<Pt>)

const val PHI = 1.618033988749895

@Serializable
enum class OverlayKind {
    THIRDS, PHI_GRID, GRID, DIAGONALS, GOLDEN_TRIANGLES, GOLDEN_SPIRAL, CENTER_CROSS, CROP_GUIDE, HORIZON,
}

/**
 * One entry in the overlay library. Saved as JSON so you can build and name your own
 * ("Kitchen: thirds + 4:5 crop") and switch between them from the viewfinder.
 */
@Serializable
data class OverlaySpec(
    val kind: OverlayKind,
    val color: Long = 0xCCFFFFFF,
    val strokeDp: Float = 1f,
    /** GRID: columns and rows. */
    val cols: Int = 4,
    val rows: Int = 4,
    /** CROP_GUIDE: target aspect, width over height (4:5 = 0.8, 1:1 = 1.0, 16:9 = 1.777). */
    val cropAspect: Double = 0.8,
    /** GOLDEN_SPIRAL and GOLDEN_TRIANGLES: mirror to put the eye of the spiral where you want it. */
    val flipH: Boolean = false,
    val flipV: Boolean = false,
    /** HORIZON: tilt in degrees from the phone or camera level, drawn through the centre. */
    val tiltDeg: Double = 0.0,
    /** Draw this layer inside a centred crop of this aspect instead of the full frame (e.g. thirds within 4:5). */
    val insideCrop: Double? = null,
)

@Serializable
data class OverlayPreset(val name: String, val layers: List<OverlaySpec>)

object Overlays {
    val defaultLibrary = listOf(
        OverlayPreset("Rule of thirds", listOf(OverlaySpec(OverlayKind.THIRDS))),
        OverlayPreset("Phi grid", listOf(OverlaySpec(OverlayKind.PHI_GRID))),
        OverlayPreset("Golden spiral", listOf(OverlaySpec(OverlayKind.GOLDEN_SPIRAL))),
        OverlayPreset("Golden triangles", listOf(OverlaySpec(OverlayKind.GOLDEN_TRIANGLES))),
        OverlayPreset("Diagonals", listOf(OverlaySpec(OverlayKind.DIAGONALS))),
        OverlayPreset("Verticals check (4x4)", listOf(OverlaySpec(OverlayKind.GRID, cols = 4, rows = 4))),
        OverlayPreset("Instagram 4:5", listOf(OverlaySpec(OverlayKind.CROP_GUIDE, cropAspect = 0.8), OverlaySpec(OverlayKind.THIRDS, insideCrop = 0.8))),
        OverlayPreset("Web banner 16:9", listOf(OverlaySpec(OverlayKind.CROP_GUIDE, cropAspect = 16.0 / 9))),
    )

    /** [frameAspect] = width / height of the live view, so shapes that depend on angles stay true. */
    fun build(spec: OverlaySpec, frameAspect: Double): List<Polyline> {
        val crop = spec.insideCrop
        if (crop != null) {
            val (x0, y0, cw, ch) = cropBox(crop, frameAspect)
            return build(spec.copy(insideCrop = null), crop).map { pl ->
                Polyline(pl.points.map { Pt(x0 + it.x * cw, y0 + it.y * ch) })
            }
        }
        val raw = when (spec.kind) {
            OverlayKind.THIRDS -> grid(3, 3)
            OverlayKind.GRID -> grid(spec.cols, spec.rows)
            OverlayKind.PHI_GRID -> {
                val a = 1 / (PHI * PHI); val b = 1 / PHI // 0.382 and 0.618
                listOf(v(a), v(b), h(a), h(b))
            }
            OverlayKind.DIAGONALS -> listOf(line(0.0, 0.0, 1.0, 1.0), line(1.0, 0.0, 0.0, 1.0))
            OverlayKind.CENTER_CROSS -> listOf(line(0.47, 0.5, 0.53, 0.5), line(0.5, 0.5 - 0.03 * frameAspect, 0.5, 0.5 + 0.03 * frameAspect))
            OverlayKind.GOLDEN_TRIANGLES -> goldenTriangles(frameAspect)
            OverlayKind.GOLDEN_SPIRAL -> goldenSpiral(frameAspect)
            OverlayKind.CROP_GUIDE -> cropGuide(spec.cropAspect, frameAspect)
            OverlayKind.HORIZON -> horizon(spec.tiltDeg, frameAspect)
        }
        return raw.map { pl ->
            Polyline(pl.points.map { Pt(if (spec.flipH) 1 - it.x else it.x, if (spec.flipV) 1 - it.y else it.y) })
        }
    }

    private fun line(x1: Double, y1: Double, x2: Double, y2: Double) = Polyline(listOf(Pt(x1, y1), Pt(x2, y2)))
    private fun v(x: Double) = line(x, 0.0, x, 1.0)
    private fun h(y: Double) = line(0.0, y, 1.0, y)
    private fun grid(cols: Int, rows: Int) =
        (1 until cols).map { v(it.toDouble() / cols) } + (1 until rows).map { h(it.toDouble() / rows) }

    /** Main diagonal plus a perpendicular to it from each of the other two corners (true 90 degrees on screen). */
    private fun goldenTriangles(aspect: Double): List<Polyline> {
        val w = aspect; val hgt = 1.0
        fun foot(px: Double, py: Double): Pt { // projection onto the line (0,0)->(w,h)
            val t = (px * w + py * hgt) / (w * w + hgt * hgt)
            return Pt(t * w, t * hgt)
        }
        val f1 = foot(w, 0.0); val f2 = foot(0.0, hgt)
        fun n(p: Pt) = Pt(p.x / w, p.y / hgt)
        return listOf(
            line(0.0, 0.0, 1.0, 1.0),
            Polyline(listOf(Pt(1.0, 0.0), n(f1))),
            Polyline(listOf(Pt(0.0, 1.0), n(f2))),
        )
    }

    /**
     * Fibonacci-style golden spiral: cut squares off a golden rectangle, turning each time, and
     * draw a quarter circle in each square. Built in a PHI:1 rectangle, then stretched to the
     * frame (a 3:2 frame is 1.5:1, close enough that it still reads as the classic spiral).
     * Portrait frames get the spiral rotated a quarter turn. The eye ends bottom right by default.
     */
    private fun goldenSpiral(aspect: Double, turns: Int = 10): List<Polyline> {
        var x = 0.0; var y = 0.0; var w = PHI; var hh = 1.0
        val arc = mutableListOf<Pt>()
        val squares = mutableListOf<Polyline>()
        repeat(turns) { i ->
            val cx: Double; val cy: Double; val a0: Double; val s: Double
            when (i % 4) {
                0 -> { s = hh; cx = x + s; cy = y + s; a0 = PI; squares += vSeg(x + s, y, y + hh); x += s; w -= s }
                1 -> { s = w; cx = x; cy = y + s; a0 = 1.5 * PI; squares += hSeg(y + s, x, x + w); y += s; hh -= s }
                2 -> { s = hh; cx = x + w - s; cy = y; a0 = 0.0; squares += vSeg(x + w - s, y, y + hh); w -= s }
                else -> { s = w; cx = x + w; cy = y + hh - s; a0 = 0.5 * PI; squares += hSeg(y + hh - s, x, x + w); hh -= s }
            }
            val n = 24
            for (k in 0..n) {
                if (k == 0 && arc.isNotEmpty()) continue
                val a = a0 + (PI / 2) * k / n
                arc += Pt(cx + s * cos(a), cy + s * sin(a))
            }
        }
        val portrait = aspect < 1.0
        fun norm(p: Pt): Pt {
            val q = Pt(p.x / PHI, p.y)
            return if (portrait) Pt(1 - q.y, q.x) else q // quarter turn for portrait
        }
        return (listOf(Polyline(arc)) + squares).map { pl -> Polyline(pl.points.map(::norm)) }
    }

    private fun vSeg(x: Double, y1: Double, y2: Double) = Polyline(listOf(Pt(x, y1), Pt(x, y2)))
    private fun hSeg(y: Double, x1: Double, x2: Double) = Polyline(listOf(Pt(x1, y), Pt(x2, y)))

    /** Largest centred rectangle of [target] aspect that fits in the frame. */
    private data class Box(val x0: Double, val y0: Double, val w: Double, val h: Double)

    private fun cropBox(target: Double, frame: Double): Box {
        val (cw, ch) = if (target < frame) (target / frame) to 1.0 else 1.0 to (frame / target)
        return Box((1 - cw) / 2, (1 - ch) / 2, cw, ch)
    }

    private fun cropGuide(target: Double, frame: Double): List<Polyline> {
        val (x0, y0, cw, ch) = cropBox(target, frame)
        return listOf(Polyline(listOf(Pt(x0, y0), Pt(x0 + cw, y0), Pt(x0 + cw, y0 + ch), Pt(x0, y0 + ch), Pt(x0, y0))))
    }

    private fun horizon(tiltDeg: Double, aspect: Double): List<Polyline> {
        val t = Math.toRadians(tiltDeg)
        val dx = 0.5; val dy = 0.5 * aspect * kotlin.math.tan(t) // keep the on-screen angle true
        return listOf(line(0.5 - dx, 0.5 - dy, 0.5 + dx, 0.5 + dy))
    }
}

/**
 * Where the live view picture actually sits on the phone screen. The camera's frame (3:2 on
 * most R bodies) is fitted inside the view with bars on the sides or top, and overlays must be
 * drawn in that rectangle, not across the whole view, or the thirds lines won't match the image.
 */
data class ImageRect(val left: Float, val top: Float, val width: Float, val height: Float) {
    fun map(p: Pt): Pair<Float, Float> = (left + (p.x * width).toFloat()) to (top + (p.y * height).toFloat())

    companion object {
        fun fit(viewWidth: Float, viewHeight: Float, frameAspect: Double): ImageRect {
            val viewAspect = viewWidth / viewHeight
            return if (viewAspect > frameAspect) {
                val w = (viewHeight * frameAspect).toFloat()
                ImageRect((viewWidth - w) / 2, 0f, w, viewHeight)
            } else {
                val h = (viewWidth / frameAspect).toFloat()
                ImageRect(0f, (viewHeight - h) / 2, viewWidth, h)
            }
        }
    }
}
