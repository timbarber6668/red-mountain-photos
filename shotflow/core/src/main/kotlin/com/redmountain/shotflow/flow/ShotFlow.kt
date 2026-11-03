package com.redmountain.shotflow.flow

import com.redmountain.shotflow.camera.CameraBackend
import com.redmountain.shotflow.camera.SettingKey
import com.redmountain.shotflow.camera.ShutterSpeed
import com.redmountain.shotflow.camera.TvOption
import com.redmountain.shotflow.camera.nearestTv
import com.redmountain.shotflow.camera.timedOptions
import com.redmountain.shotflow.flash.FlashController
import com.redmountain.shotflow.flash.FlashPower
import com.redmountain.shotflow.flash.Prompter
import kotlinx.coroutines.NonCancellable
import kotlinx.coroutines.delay
import kotlinx.coroutines.withContext
import kotlin.math.roundToInt

/** One thing a flow does. Shutter changes are relative to the shutter speed set when the flow starts. */
sealed interface Step {
    data class Shutter(val offsetStops: Double) : Step
    data class Set(val key: SettingKey, val value: String) : Step
    data class Flash(val firing: Boolean, val power: FlashPower? = null) : Step
    data class Shoot(val label: String) : Step
    data class Wait(val ms: Long) : Step
    data class Prompt(val message: String) : Step
}

/** A saved shot recipe, e.g. "Interior flambient". This is what the ShotFlow app is built around. */
data class ShotFlow(val name: String, val steps: List<Step>) {
    val shotCount: Int get() = steps.count { it is Step.Shoot }
}

enum class BracketOrder { DARK_TO_BRIGHT, CENTER_FIRST }

object Flows {
    /** Exposure offsets for [count] frames [stepStops] apart, centred on 0. Even counts lean bright. */
    fun bracketOffsets(count: Int, stepStops: Double, order: BracketOrder = BracketOrder.DARK_TO_BRIGHT): List<Double> {
        require(count >= 1) { "need at least one frame" }
        require(stepStops > 0) { "step must be positive" }
        val first = -((count - 1) / 2)
        val offsets = (0 until count).map { (first + it) * stepStops }
        return when (order) {
            BracketOrder.DARK_TO_BRIGHT -> offsets
            BracketOrder.CENTER_FIRST -> offsets.sortedWith(compareBy({ kotlin.math.abs(it) }, { it }))
        }
    }

    fun bracket(
        count: Int,
        stepStops: Double,
        order: BracketOrder = BracketOrder.DARK_TO_BRIGHT,
        flashOff: Boolean = true,
    ): ShotFlow {
        val steps = buildList {
            if (flashOff) add(Step.Flash(firing = false))
            bracketOffsets(count, stepStops, order).forEach { o ->
                add(Step.Shutter(o))
                add(Step.Shoot("Ambient ${fmt(o)}"))
            }
        }
        return ShotFlow("Bracket $count x ${fmt(stepStops, signed = false)} EV", steps)
    }

    /**
     * Real estate "flambient": an ambient bracket with the flash off, then flash frames at the base
     * shutter speed, then the flash goes back off. Optional window-pull frame at a darker shutter
     * to hold the view outside.
     */
    fun flambient(
        ambientCount: Int = 5,
        ambientStep: Double = 1.0,
        flashPower: FlashPower = FlashPower.fraction(16),
        flashFrames: Int = 1,
        windowPullStops: Double? = -2.0,
    ): ShotFlow {
        val steps = buildList {
            addAll(bracket(ambientCount, ambientStep).steps)
            add(Step.Shutter(0.0))
            add(Step.Flash(firing = true, power = flashPower))
            repeat(flashFrames) { add(Step.Shoot("Flash ${flashPower.label()}" + if (flashFrames > 1) " #${it + 1}" else "")) }
            if (windowPullStops != null) {
                add(Step.Shutter(windowPullStops))
                add(Step.Shoot("Window pull ${fmt(windowPullStops)}"))
            }
            add(Step.Flash(firing = false))
        }
        return ShotFlow("Flambient ${ambientCount}x${fmt(ambientStep, signed = false)} + flash ${flashPower.label()}", steps)
    }

    internal fun fmt(stops: Double, signed: Boolean = true): String {
        val r = (stops * 100).roundToInt() / 100.0
        val s = if (r == r.toInt().toDouble()) r.toInt().toString() else r.toString()
        return if (signed && r > 0) "+$s" else s
    }
}

/** What a flow will do on this camera, worked out before the first frame. */
data class FlowPlan(
    val baseTv: String,
    val resolved: List<Pair<Step, String?>>, // shutter steps carry the camera value they resolved to
    val problems: List<String>,
    val warnings: List<String>,
) {
    val canRun: Boolean get() = problems.isEmpty()
}

sealed interface FlowEvent {
    data class StepStarted(val index: Int, val step: Step) : FlowEvent
    data class ShotTaken(val number: Int, val total: Int, val label: String, val tv: String) : FlowEvent
    data class Finished(val restoredTv: String) : FlowEvent
}

class FlowRunner(
    private val camera: CameraBackend,
    private val flash: FlashController,
    private val prompter: Prompter,
) {
    suspend fun plan(flow: ShotFlow): FlowPlan {
        val tv = camera.get(SettingKey.SHUTTER)
        val problems = mutableListOf<String>()
        val warnings = mutableListOf<String>()

        val mode = runCatching { camera.get(SettingKey.MODE_DIAL).value }.getOrNull()
        if (mode != null && !mode.equals("m", ignoreCase = true)) {
            warnings += "Camera is in '$mode', not M. Shutter changes may be refused or shift other settings."
        }

        val options = timedOptions(tv.ability)
        val baseSeconds = ShutterSpeed.parseSeconds(tv.value)
        if (baseSeconds == null) problems += "Current shutter '${tv.value}' is not a timed value (bulb?). Set a shutter speed first."

        val resolved = flow.steps.map { step ->
            if (step !is Step.Shutter || baseSeconds == null) return@map step to null
            val target = ShutterSpeed.stops(baseSeconds) + step.offsetStops
            val hit: TvOption? = nearestTv(options, target)
            if (hit == null) {
                problems += "Shutter ${Flows.fmt(step.offsetStops)} EV from ${tv.value} is outside what the camera offers " +
                    "(${options.firstOrNull()?.raw} to ${options.lastOrNull()?.raw})."
            }
            step to hit?.raw
        }
        return FlowPlan(tv.value, resolved, problems, warnings)
    }

    /**
     * Runs the flow. Shutter speed and flash state are put back afterwards, even if the flow
     * fails or is cancelled, so the camera is never left on a -3 EV frame with the flash on.
     */
    suspend fun run(flow: ShotFlow, onEvent: (FlowEvent) -> Unit = {}) {
        val plan = plan(flow)
        check(plan.canRun) { plan.problems.joinToString("\n") }

        val total = flow.shotCount
        var shot = 0
        var currentTv = plan.baseTv
        var flashTouched = false
        try {
            plan.resolved.forEachIndexed { i, (step, tvValue) ->
                onEvent(FlowEvent.StepStarted(i, step))
                when (step) {
                    is Step.Shutter -> if (tvValue != currentTv) {
                        camera.set(SettingKey.SHUTTER, tvValue!!)
                        currentTv = tvValue
                    }
                    is Step.Set -> camera.set(step.key, step.value)
                    is Step.Flash -> {
                        flashTouched = true
                        step.power?.let { flash.setPower(it) }
                        flash.setFiring(step.firing)
                    }
                    is Step.Shoot -> {
                        camera.shoot(af = false)
                        shot++
                        onEvent(FlowEvent.ShotTaken(shot, total, step.label, currentTv))
                    }
                    is Step.Wait -> delay(step.ms)
                    is Step.Prompt -> prompter.confirm(step.message)
                }
            }
        } finally {
            // NonCancellable: if the user hits Stop mid-flow, the clean-up still runs.
            withContext(NonCancellable) {
                if (currentTv != plan.baseTv) camera.set(SettingKey.SHUTTER, plan.baseTv)
                if (flashTouched) runCatching { flash.setFiring(false) }
            }
        }
        onEvent(FlowEvent.Finished(plan.baseTv))
    }
}
