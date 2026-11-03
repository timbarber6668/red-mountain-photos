# Testing ShotFlow with your camera at home

Until the Android app exists, a laptop stands in for the phone. Your camera and laptop join
your home Wi-Fi; the travel router does the same job on location.

## 1. One-time camera setup

1. Register (free) on Canon's developer site for your region and request **CCAPI**
   (Camera Control API). Depending on body and firmware, Canon has you run a one-time
   activation over the network; follow their instructions for your model.
2. Set the camera's dial to **M**, drive to **single shot**, lens in **MF** (or AF; the tool
   never asks it to focus). Set auto power off to **Disable** while testing, since the camera
   drops Wi-Fi when it sleeps.
3. In the camera's network menu, set up a **Camera Control API (CCAPI)** connection that joins
   your home Wi-Fi (infrastructure mode, not the camera's own access point). Once connected,
   the camera shows its **IP address**, e.g. `192.168.1.40`. Write it down.

## 2. Check the connection (nothing to install)

On any laptop or phone on the same Wi-Fi, open a browser to:

```
http://192.168.1.40:8080/ccapi
```

A page of text listing API paths means the camera is reachable. Try
`http://192.168.1.40:8080/ccapi/ver100/shooting/settings/tv` to see the current shutter speed.

## 3. Install the test tool (once)

- Install a Java JDK 17 or newer (Eclipse Temurin from adoptium.net is free).
- Download this branch (`claude/canon-camera-control-app-xch1yn`) from GitHub: green
  **Code** button, **Download ZIP**, unzip it.
- In a terminal, `cd` into the `shotflow` folder and build:
  - Mac: `./gradlew :probe:installDist`
  - Windows: `gradlew.bat :probe:installDist`

The tool is then at `probe/build/install/probe/bin/probe` (`probe.bat` on Windows).

## 4. Tests, in order

Replace the IP with your camera's.

| Test | Command | What should happen |
|---|---|---|
| What the camera supports | `probe info 192.168.1.40` | Lists flash and bracketing controls, measures live view fps, saves `ccapi-192.168.1.40.json`. **Send that file over:** it decides how flash control gets built. |
| Fire the shutter | `probe shoot 192.168.1.40` | One picture. |
| Bracket | `probe bracket 192.168.1.40 5 1` | Prints the shutter speeds it will use, waits for Enter, shoots dark to bright, puts your shutter speed back. Try `7 1`, `3 2`, `9 0.67`. |
| Flambient | `probe flambient 192.168.1.40 5 1 16` | Ambient bracket, flash frame at 1/16, window pull 2 stops under. It pauses and asks you to turn the flash off/on and set power; press Enter when done. Add `none` at the end to skip the window pull. |
| Overlays and filters on live view | `probe snapshot 192.168.1.40` | Saves a `snapshots` folder: your live view with each overlay (thirds, phi, golden spiral, triangles, crop guides) and each filter (mono, high contrast, notan, focus peaking, zebras). This is what the phone will show. |

Worth noting while testing: how long each bracket takes, any missed frames, the live view
fps from `info`, and how the overlays and notan read on real rooms.

If a command can't reach the camera: check the camera still shows as connected, check the IP,
and make sure the laptop isn't on a guest network (those often block devices from seeing
each other).
