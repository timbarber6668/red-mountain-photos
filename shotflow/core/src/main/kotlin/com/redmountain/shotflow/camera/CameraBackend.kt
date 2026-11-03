package com.redmountain.shotflow.camera

/**
 * One camera setting as the camera reports it: the current value plus the values the
 * camera says it will accept right now. The accepted list changes with mode, lens and
 * body, so we always pick from it instead of hard-coding value strings.
 */
data class SettingState(val value: String, val ability: List<String>)

/**
 * Setting names. [path] is the CCAPI name under /shooting/settings/. Other backends
 * (USB/PTP later) map the same keys to their own property codes.
 */
enum class SettingKey(val path: String) {
    SHUTTER("tv"),
    APERTURE("av"),
    ISO("iso"),
    EXPOSURE_COMP("exposure"),
    AEB("aeb"),
    WHITE_BALANCE("wb"),
    COLOR_TEMP("colortemperature"),
    DRIVE("drive"),
    METERING("metering"),
    AF_OPERATION("afoperation"),
    MODE_DIAL("shootingmodedial"),
}

/** Everything the app needs from a camera, whatever the link (Wi-Fi CCAPI or USB PTP). */
interface CameraBackend {
    suspend fun get(key: SettingKey): SettingState
    suspend fun set(key: SettingKey, value: String)

    /** Full press and release. [af] = focus first; usually false on a tripod in manual focus. */
    suspend fun shoot(af: Boolean = false)

    /** Start live view. The camera's own screen can stay on or go dark to save battery. */
    suspend fun startLiveView(cameraDisplayOn: Boolean = true)
    suspend fun stopLiveView()

    /** One live view frame as JPEG bytes. */
    suspend fun liveViewFrame(): ByteArray
}

class CameraException(message: String, val httpCode: Int? = null) : Exception(message)
