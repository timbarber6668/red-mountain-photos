# ShotFlow: remote control for Canon R bodies

An Android app, plus a small tripod-mounted router, that runs the whole camera from the
phone. It is built around **flows**: saved shot recipes you fire with one tap, such as
"5 ambient brackets at 1 EV, flash on at 1/16, a window pull, flash off". On top of that
it adds composition and monitoring tools: overlays, mono, high-contrast and notan views,
histogram, focus peaking and zebras.

Status: **exploration**. The core engine (flows, exposure math, CCAPI client, overlays,
monitoring) is written and tested. The phone UI and the hardware come next, after the
spikes below.

---

## 1. What it has to do (the gaps in Canon Camera Connect and others)

| Need | How ShotFlow does it |
|---|---|
| Adjust brackets remotely | App-driven brackets: any count, any step, any order. The app sets each shutter speed and fires, so there's no 3/5/7 cap from the camera's AEB menu. The camera's own AEB setting stays available too. |
| Flash on/off and power remotely | `FlashController` with three possible routes (section 4). Until one is proven, flows pause and ask you ("Turn the flash ON") so the same recipe still works. |
| Flambient in one tap | Built-in `Flows.flambient`: ambient bracket with the flash off, flash frame(s) at the base shutter, optional window pull, flash back off. The camera's shutter speed is always restored afterwards. |
| Composition | Overlay library: thirds, phi grid, golden spiral (4 orientations), golden triangles, diagonals, custom N x M grid, horizon line, crop guides (4:5, 1:1, 16:9) with layers inside the crop. Presets are saved as JSON so you can name your own. |
| See shape, not colour | Mono, high-contrast S-curve, and **notan** (frame reduced to 2 to 4 flat tones). Notan is the quickest way to judge the balance of light and dark masses in a room. |
| Monitoring | Luma and RGB histogram with clipping %, per-channel clip warning, focus peaking (Sobel, adaptive threshold), zebras. |
| Everything else | Any setting the camera exposes is reachable by name: `CcapiClient.getRaw/putRaw` covers what the UI hasn't wrapped yet. |

## 2. Hardware

### How the pieces connect

```
 [Canon R body] --Wi-Fi (camera joins as a client)--> [travel router on the tripod] <--Wi-Fi-- [Android phone]
       |                                                      |
       '-- optional USB-C to router, phase 2 ------------------'   powered by USB-C PD bank or V-mount
```

The router makes a private network that both the camera and the phone join. The camera
stays close to the router, so its weak internal antenna has a short, strong link. The phone
gets the router's much better radio for range. Nothing on this network needs internet.

### Wi-Fi speed: the camera is the bottleneck

Higher-end R bodies top out at **5 GHz 802.11ac** for their built-in Wi-Fi. Several entry
bodies are 2.4 GHz only. Check your exact body's spec sheet. A Wi-Fi 6 or 7 router doesn't
make the camera link faster; it only helps the phone side. So buy a solid dual-band router
for range and reliability, not the newest standard. If live view frame rate turns out to be
the limit, the faster path is **USB**, not better Wi-Fi (phase 2).

### Router candidates (GL.iNet, they run OpenWrt, which phase 2 needs)

| Model | Why | Power |
|---|---|---|
| **GL-MT3000 "Beryl AX"** (first pick) | Dual-band Wi-Fi 6, USB 3.0 host port for phase 2, fast enough CPU, pocket size | USB-C 5V/3A |
| GL-E750 "Mudi" | Built-in battery, so no cable on the tripod | Internal, USB-C charging |
| GL-SFT1200 "Opal" | Smaller and cheaper, dual-band 802.11ac | USB-C |

Verify current models and specs before buying; GL.iNet revises the line often.

**Power:** any USB-C PD power bank (10,000 mAh runs a router like this for many hours),
or a V-mount battery with a USB-C PD output. **Mount:** a cold-shoe or 1/4"-20 clamp on a
tripod leg, router held with a strap or small cage.

## 3. Software architecture

```
shotflow/
  core/    pure Kotlin, no Android imports, runs on the phone and a laptop
    camera/        CameraBackend interface, SettingKey, shutter-speed parsing and snapping
    camera/ccapi/  CcapiClient: Canon Camera Control API over HTTP
    flash/         FlashPower (1/1 to 1/256, "1/16 +0.3" labels), FlashController, manual fallback
    flow/          ShotFlow recipes, Flows.bracket / Flows.flambient, FlowRunner (plan, run, restore)
    monitor/       Frame, Histogram, FocusPeaking, Filters (mono, high contrast, notan, zebra)
    overlay/       Overlay geometry as normalised polylines, default library, JSON presets
  probe/   desktop tool: point it at a camera, it reports what that body supports
  app/     (next) Android: Jetpack Compose UI, OkHttp transport, live view + overlays
```

**Camera link: Canon CCAPI.** Canon's official Camera Control API is an HTTP/JSON server in
the camera, over Wi-Fi (or Ethernet on bodies that have it). It's documented, so we're not
reverse engineering it, and it covers shooting settings, the shutter, live view and events.
Access needs a free Canon developer registration, and depending on body and firmware a
one-time activation. Every setting returns its current value and an `ability` list of
accepted values, and ShotFlow always picks from that list, so the same code works across
bodies and lenses.

**Why a flow engine.** Each flow is planned before the first frame. The planner checks every
shutter value the camera offers, refuses brackets that run off the camera's range (for
example +2 EV from 15" would need 60"), and warns if the dial isn't on M. When a flow runs,
it waits out "camera busy" replies between frames. If you hit Stop or a shot fails, it still
puts the shutter speed back and turns the flash off.

**Phone UI plan (Compose):** full-screen live view with a gesture-driven setting strip
(Tv / Av / ISO / WB / EC), a flow launcher, an overlay picker, and a monitor toggle row.

**Overlays and filters work on the camera's live view feed, in the app.** Each live view
frame from the camera is decoded on the phone. The view filters (mono, high contrast,
notan, zebras, peaking) process that frame, then the chosen overlay layers are drawn on
top in a Canvas, locked to the picture's rectangle (`ImageRect.fit`), so a thirds line stays
on the same part of the scene in any phone orientation. The camera's own screen and EVF
show their normal view: the camera API can't draw onto them. Histogram and peaking run on a downscaled
copy of each frame on a background thread. If CPU cost shows up, peaking moves to an AGSL
shader (Android 13+).

## 4. The open question: flash control

This is the feature other apps miss. Which route works depends on your body and your flash
system, so this is the first thing to prove.

1. **Camera menu control over CCAPI.** If the body exposes the external Speedlite settings
   through CCAPI, this is the simplest route. Unknown until probed: run `probe` (below) and it
   lists any flash-related API names.
2. **USB (PTP) via the router.** Canon's own EOS Utility sets Speedlite functions over USB,
   so the camera protocol can do it. The router runs a small bridge (OpenWrt has libgphoto2)
   that turns phone requests into PTP commands. This route also speeds up live view.
3. **Talk to the flash system directly.** A small ESP32 dongle on the trigger or flash that
   speaks its radio or Bluetooth protocol. This works whatever the camera exposes, but each
   flash brand needs its own work, and protocols like Godox's are not published.

Until one of these is proven, `ManualFlashController` pauses the flow and asks you to do it.

## 5. Spikes, in order

Step-by-step home testing (camera and laptop on the same Wi-Fi): see [TESTING.md](TESTING.md).

1. **Probe the camera** (1 evening). Join a laptop to the same Wi-Fi as the camera, enable
   CCAPI on the camera, then:
   ```
   cd shotflow && ./gradlew :probe:run --args="<camera-ip>"
   ```
   This saves the full API and settings list to `ccapi-<ip>.json`, prints any flash or
   bracketing controls, and measures live view fps. That answers routes 1 and 2 above.
2. **Android shell** (about a week): connect, live view, setting strip, run `Flows.flambient`
   with the manual flash fallback. This is usable on a real shoot even before flash automation.
3. **Flash route** chosen from spike 1's results.
4. **Router + USB bridge** if live view fps or flash control needs it.

## 6. Build and test

```
cd shotflow
./gradlew build          # compiles core and probe, runs the 17 core tests
```

Requires a JDK (17+). The Android app module will also need the Android SDK.

## 7. Questions for Tim

- Which R body (or bodies) do you shoot on?
- Which flash and trigger: Canon Speedlites with the ST-E10 / built-in radio, or Godox
  (which trigger: X2T, XPro II, X3)? On camera, off camera, or both?
- Is "ShotFlow" an existing idea with notes somewhere? If so, send them and this design will
  follow them.

Note: this lives inside the website repo for now, on its own branch. It should move to its
own repository before the Android app grows.
