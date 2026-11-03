plugins {
    kotlin("jvm")
    application
}

// Target Java 17 bytecode, the level Android builds use.
java { sourceCompatibility = JavaVersion.VERSION_17; targetCompatibility = JavaVersion.VERSION_17 }
kotlin { compilerOptions { jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17) } }

dependencies {
    implementation(project(":core"))
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.9.0")
}

application { mainClass.set("com.redmountain.shotflow.probe.ProbeKt") }

// Flows wait for Enter ("turn the flash ON, then press Enter"), so pass the keyboard through.
tasks.named<JavaExec>("run") { standardInput = System.`in` }
