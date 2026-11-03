package com.redmountain.shotflow.monitor

import kotlin.math.max
import kotlin.math.min
import kotlin.math.roundToInt
import kotlin.math.sqrt

/**
 * A decoded live view frame: ARGB pixels, row by row. This is exactly what Android's
 * Bitmap.getPixels returns, so the app decodes the JPEG once and hands the array here.
 *
 * Everything below works on the camera's JPEG preview, so the histogram describes the
 * preview (picture style, white balance applied), not the RAW file. Same as in-camera.
 */
class Frame(val width: Int, val height: Int, val pixels: IntArray) {
    init { require(pixels.size == width * height) { "pixel count does not match ${width}x$height" } }
}

private fun r(p: Int) = (p ushr 16) and 0xFF
private fun g(p: Int) = (p ushr 8) and 0xFF
private fun b(p: Int) = p and 0xFF
private fun argb(r: Int, g: Int, b: Int) = (0xFF shl 24) or (r shl 16) or (g shl 8) or b

/** Rec. 709 luma, integer math: 0..255. */
fun luma(p: Int): Int = (r(p) * 54 + g(p) * 183 + b(p) * 19) ushr 8

fun lumaPlane(f: Frame): IntArray = IntArray(f.pixels.size) { luma(f.pixels[it]) }

data class Histogram(val luma: IntArray, val red: IntArray, val green: IntArray, val blue: IntArray, val total: Int) {
    /** Share of pixels at pure black / pure white (or within [margin] levels of it). */
    fun shadowClip(margin: Int = 0) = luma.take(margin + 1).sum().toDouble() / total
    fun highlightClip(margin: Int = 0) = luma.takeLast(margin + 1).sum().toDouble() / total

    /** Any single channel blown, e.g. a red wall that clips in red before luma shows it. */
    fun channelHighlightClip(): Double = maxOf(red[255], green[255], blue[255]).toDouble() / total

    companion object {
        /** [step] samples every Nth pixel; 2 to 4 is plenty for a live histogram and much cheaper. */
        fun of(f: Frame, step: Int = 1): Histogram {
            val l = IntArray(256); val rr = IntArray(256); val gg = IntArray(256); val bb = IntArray(256)
            var n = 0
            var i = 0
            while (i < f.pixels.size) {
                val p = f.pixels[i]
                l[luma(p)]++; rr[r(p)]++; gg[g(p)]++; bb[b(p)]++
                n++
                i += step
            }
            return Histogram(l, rr, gg, bb, n)
        }
    }
}

object FocusPeaking {
    /**
     * Marks pixels on sharp edges. Sobel edge strength on luma; a pixel counts when it is in the
     * strongest [topFraction] of edges AND above [floor], so a flat, out-of-focus frame shows
     * nothing instead of lighting up noise. Live view is a downscaled preview, so treat peaking
     * as a guide and confirm with a magnified view for critical focus.
     */
    fun mask(f: Frame, topFraction: Double = 0.08, floor: Int = 60): BooleanArray {
        val w = f.width; val h = f.height
        val y = lumaPlane(f)
        val mag = IntArray(w * h)
        for (row in 1 until h - 1) {
            for (col in 1 until w - 1) {
                val i = row * w + col
                val tl = y[i - w - 1]; val t = y[i - w]; val tr = y[i - w + 1]
                val l = y[i - 1]; val rr = y[i + 1]
                val bl = y[i + w - 1]; val bo = y[i + w]; val br = y[i + w + 1]
                val gx = (tr + 2 * rr + br) - (tl + 2 * l + bl)
                val gy = (bl + 2 * bo + br) - (tl + 2 * t + tr)
                mag[i] = sqrt((gx * gx + gy * gy).toDouble()).toInt()
            }
        }
        // Threshold from a histogram of magnitudes (max Sobel value is ~1443).
        val counts = IntArray(1444)
        for (m in mag) counts[min(m, 1443)]++
        val want = (mag.size * topFraction).toInt()
        var acc = 0
        var cut = 1443
        while (cut > 0 && acc + counts[cut] <= want) { acc += counts[cut]; cut-- }
        val threshold = max(cut + 1, floor)
        return BooleanArray(mag.size) { mag[it] >= threshold }
    }

    fun paint(f: Frame, mask: BooleanArray, color: Int = 0xFFFF2D2D.toInt()): Frame =
        Frame(f.width, f.height, IntArray(f.pixels.size) { if (mask[it]) color else f.pixels[it] })
}

/** Views that strip a frame down to shape and tone so composition is easier to judge. */
object Filters {
    fun monochrome(f: Frame): Frame =
        Frame(f.width, f.height, IntArray(f.pixels.size) { val v = luma(f.pixels[it]); argb(v, v, v) })

    /**
     * Mono with a steep S-curve. [strength] 0 = plain mono, 1 = very hard. Makes the big
     * light and dark shapes obvious.
     */
    fun highContrast(f: Frame, strength: Double = 0.7): Frame {
        val k = 1.0 + strength * 9.0
        val lut = IntArray(256) { v ->
            val x = v / 255.0
            val s = 1.0 / (1.0 + Math.exp(-k * (x - 0.5)))
            val lo = 1.0 / (1.0 + Math.exp(k * 0.5)); val hi = 1.0 / (1.0 + Math.exp(-k * 0.5))
            (((s - lo) / (hi - lo)) * 255).roundToInt().coerceIn(0, 255)
        }
        return Frame(f.width, f.height, IntArray(f.pixels.size) { val v = lut[luma(f.pixels[it])]; argb(v, v, v) })
    }

    /**
     * Notan: the frame reduced to [levels] flat tones (2 = black and white, 3 adds a grey),
     * split at the frame's own luma quantiles so it adapts to dark and bright scenes.
     */
    fun notan(f: Frame, levels: Int = 2): Frame {
        require(levels in 2..4)
        val y = lumaPlane(f)
        val sorted = y.copyOf().also { it.sort() }
        val cuts = (1 until levels).map { sorted[(sorted.size - 1) * it / levels] }
        val tones = (0 until levels).map { 255 * it / (levels - 1) }
        return Frame(f.width, f.height, IntArray(y.size) { i ->
            val band = cuts.count { y[i] > it }
            val v = tones[band]; argb(v, v, v)
        })
    }

    /** Diagonal zebra stripes over anything at or above [threshold] luma (e.g. 250 = about to clip). */
    fun zebra(f: Frame, threshold: Int = 250, color: Int = 0xFFFF00FF.toInt(), period: Int = 8): Frame =
        Frame(f.width, f.height, IntArray(f.pixels.size) { i ->
            val p = f.pixels[i]
            val x = i % f.width; val yy = i / f.width
            if (luma(p) >= threshold && ((x + yy) / (period / 2)) % 2 == 0) color else p
        })
}
