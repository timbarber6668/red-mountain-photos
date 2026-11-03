package com.redmountain.shotflow.flash

import kotlin.math.ceil
import kotlin.math.roundToInt

/**
 * Manual flash power as stops below full power. 0 = 1/1, 3 = 1/8, 7 = 1/128, 8 = 1/256.
 * Shown the way flashes show it: 3.7 stops below full reads "1/16 +0.3".
 */
data class FlashPower(val stopsBelowFull: Double) {
    init { require(stopsBelowFull in 0.0..10.0) { "flash power out of range: $stopsBelowFull" } }

    /** Snap to a flash's step (1/3 stop for Canon, 0.1 for Godox). */
    fun snapped(step: Double = 1.0 / 3): FlashPower = FlashPower((stopsBelowFull / step).roundToInt() * step)

    fun label(): String {
        val s = (stopsBelowFull * 10).roundToInt() / 10.0
        val whole = ceil(s - 1e-9).toInt()
        val plus = ((whole - s) * 10).roundToInt() / 10.0
        val base = "1/${1 shl whole}"
        return if (plus == 0.0) base else "$base +$plus"
    }

    companion object {
        val FULL = FlashPower(0.0)
        fun fraction(denominator: Int): FlashPower {
            require(denominator > 0 && denominator and (denominator - 1) == 0) { "use a power of two: 1, 2, 4 ... 256" }
            return FlashPower(Integer.numberOfTrailingZeros(denominator).toDouble())
        }
    }
}

/**
 * Turns the flash on or off and sets its power. One implementation per route:
 *  - camera menu control over CCAPI or USB (if the body exposes it, see README spike 1)
 *  - a radio/BLE bridge that talks to the flash system directly (spike 2)
 *  - [ManualFlashController], which asks you to do it, so flows work on day one
 */
interface FlashController {
    val name: String
    suspend fun setFiring(enabled: Boolean)
    suspend fun setPower(power: FlashPower)
}

/** The UI's way to stop a flow and ask for a tap: shows [message], resumes when dismissed. */
fun interface Prompter {
    suspend fun confirm(message: String)
}

class ManualFlashController(private val prompter: Prompter) : FlashController {
    override val name = "Manual (app prompts you)"
    private var firing: Boolean? = null
    private var power: FlashPower? = null

    override suspend fun setFiring(enabled: Boolean) {
        if (firing == enabled) return
        prompter.confirm(if (enabled) "Turn the flash ON" else "Turn the flash OFF")
        firing = enabled
    }

    override suspend fun setPower(power: FlashPower) {
        if (this.power == power) return
        prompter.confirm("Set flash power to ${power.label()}")
        this.power = power
    }
}
