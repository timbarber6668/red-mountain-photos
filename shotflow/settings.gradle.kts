pluginManagement {
    repositories { gradlePluginPortal(); mavenCentral() }
}
dependencyResolutionManagement {
    repositories {
        mavenCentral()
        // Google's copy of Maven Central, used when Central rate-limits.
        maven("https://maven-central.storage-download.googleapis.com/maven2/")
    }
}
rootProject.name = "shotflow"
// `core` is plain Kotlin so it runs on Android and on a laptop.
// `probe` is a desktop tool for testing a real camera over CCAPI.
// The Android `app` module gets added once the Android SDK is set up.
include("core", "probe")
