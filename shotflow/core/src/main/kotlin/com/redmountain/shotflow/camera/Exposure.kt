package com.redmountain.shotflow.camera

import kotlin.math.abs
import kotlin.math.log2
import kotlin.math.pow

/**
 * Shutter speed strings as Canon writes them over CCAPI:
 *   "1/125"  -> 1/125 s
 *   "0\"5"   -> 0.5 s   (the inch mark is the decimal point)
 *   "1\"3"   -> 1.3 s
 *   "30\""   -> 30 s
 *   "bulb"   -> not a timed value
 */
object ShutterSpeed {
    fun parseSeconds(tv: String): Double? {
        val s = tv.trim()
        if (s.contains('/')) {
            val (n, d) = s.split('/', limit = 2)
            val num = n.toDoubleOrNull() ?: return null
            val den = d.toDoubleOrNull() ?: return null
            return if (den == 0.0) null else num / den
        }
        if (s.contains('"')) {
            val (whole, frac) = s.split('"', limit = 2)
            val w = whole.toDoubleOrNull() ?: return null
            if (frac.isEmpty()) return w
            val f = frac.toDoubleOrNull() ?: return null
            return w + f / 10.0.pow(frac.length)
        }
        return s.toDoubleOrNull()
    }

    /** Time in EV relative to 1 s. Longer exposure = higher number. */
    fun stops(seconds: Double): Double = log2(seconds)
}

/** One shutter value from the camera's list, with its time in stops. */
data class TvOption(val raw: String, val stops: Double)

fun timedOptions(ability: List<String>): List<TvOption> =
    ability.mapNotNull { raw -> ShutterSpeed.parseSeconds(raw)?.let { TvOption(raw, ShutterSpeed.stops(it)) } }
        .sortedBy { it.stops }

/**
 * Pick the camera value closest to [targetStops]. Returns null when the nearest value is
 * more than [tolerance] stops away (the bracket ran off the end of the camera's range).
 */
fun nearestTv(options: List<TvOption>, targetStops: Double, tolerance: Double = 0.2): TvOption? {
    val best = options.minByOrNull { abs(it.stops - targetStops) } ?: return null
    return if (abs(best.stops - targetStops) <= tolerance) best else null
}
