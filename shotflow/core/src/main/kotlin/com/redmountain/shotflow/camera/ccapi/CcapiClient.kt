package com.redmountain.shotflow.camera.ccapi

import com.redmountain.shotflow.camera.CameraBackend
import com.redmountain.shotflow.camera.CameraException
import com.redmountain.shotflow.camera.SettingKey
import com.redmountain.shotflow.camera.SettingState
import kotlinx.coroutines.delay
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import kotlinx.serialization.json.put

data class HttpResponse(val code: Int, val body: ByteArray) {
    val text: String get() = body.decodeToString()
}

/**
 * The HTTP layer, kept separate so `core` has no Android or JDK-only imports.
 * Android uses OkHttp, the desktop probe uses java.net.http, tests use a fake.
 */
interface HttpTransport {
    suspend fun send(method: String, url: String, jsonBody: String? = null): HttpResponse
}

/**
 * Canon Camera Control API (CCAPI) over Wi-Fi or Ethernet. The camera runs a small HTTP
 * server, by default on port 8080. Paths follow Canon's CCAPI reference (ver100). Check
 * them against the reference for your body, since newer firmware adds versions (ver110...).
 */
class CcapiClient(
    private val http: HttpTransport,
    host: String,
    port: Int = 8080,
    private val busyRetries: Int = 40,
    private val busyDelayMs: Long = 150,
) : CameraBackend {

    private val base = "http://$host:$port/ccapi"
    private val v100 = "$base/ver100"

    /** GET /ccapi: every API the camera supports, grouped by version. Read this before relying on a path. */
    suspend fun listApis(): JsonObject = json(call("GET", base)).jsonObject

    /** All shooting settings with current value and ability list, for one-call discovery. */
    suspend fun allShootingSettings(): JsonObject = json(call("GET", "$v100/shooting/settings")).jsonObject

    /** Raw access for settings without a [SettingKey] yet (flash settings, if the body has them). */
    suspend fun getRaw(path: String): JsonElement = json(call("GET", "$base/$path"))
    suspend fun putRaw(path: String, body: JsonObject): JsonElement = json(call("PUT", "$base/$path", body.toString()))

    override suspend fun get(key: SettingKey): SettingState {
        val o = json(call("GET", "$v100/shooting/settings/${key.path}")).jsonObject
        val value = o["value"]?.jsonPrimitive?.contentOrNull ?: ""
        val ability = (o["ability"] as? JsonArray)?.mapNotNull { (it as? JsonPrimitive)?.contentOrNull } ?: emptyList()
        return SettingState(value, ability)
    }

    override suspend fun set(key: SettingKey, value: String) {
        call("PUT", "$v100/shooting/settings/${key.path}", buildJsonObject { put("value", value) }.toString())
    }

    override suspend fun shoot(af: Boolean) {
        call("POST", "$v100/shooting/control/shutterbutton", buildJsonObject { put("af", af) }.toString())
    }

    override suspend fun startLiveView(cameraDisplayOn: Boolean) {
        val body = buildJsonObject {
            put("liveviewsize", "medium")
            put("cameradisplay", if (cameraDisplayOn) "on" else "off")
        }
        call("POST", "$v100/shooting/liveview", body.toString())
    }

    override suspend fun stopLiveView() {
        val body = buildJsonObject { put("liveviewsize", "off"); put("cameradisplay", "on") }
        call("POST", "$v100/shooting/liveview", body.toString())
    }

    override suspend fun liveViewFrame(): ByteArray = call("GET", "$v100/shooting/liveview/flip").body

    /**
     * The camera answers 503 while it is busy (writing a file, mid-exposure). During a
     * bracket that is normal, so wait and retry instead of failing the flow.
     */
    private suspend fun call(method: String, url: String, body: String? = null): HttpResponse {
        var attempt = 0
        while (true) {
            val r = http.send(method, url, body)
            if (r.code in 200..299) return r
            if (r.code == 503 && attempt < busyRetries) {
                attempt++
                delay(busyDelayMs)
                continue
            }
            val msg = runCatching { Json.parseToJsonElement(r.text).jsonObject["message"]?.jsonPrimitive?.contentOrNull }
                .getOrNull() ?: r.text.take(200)
            throw CameraException("$method $url -> ${r.code}: $msg", r.code)
        }
    }

    private fun json(r: HttpResponse): JsonElement =
        if (r.body.isEmpty()) JsonObject(emptyMap()) else Json.parseToJsonElement(r.text)
}
