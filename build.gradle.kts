// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    alias(m8test.plugins.m8test.gradle.skills)
}

buildscript {
    repositories {
        mavenLocal()
        mavenCentral()
        maven("https://jitpack.io")
        // jcenter()
        google()
        val m8testVersion: String by project
        maven {
            url = uri("https://raw.githubusercontent.com/m8test/Maven/refs/heads/${m8testVersion}/")
        }
        val properties = java.util.Properties().apply {
            java.io.FileInputStream(File(rootDir, "gradle.properties")).use { load(it) }
        }
    }
    dependencies {
        classpath(m8test.m8test.gradle)
    }
}
//apply(plugin = libs.plugins.m8test.groovy.get().pluginId)
//apply(plugin = libs.plugins.m8test.java.get().pluginId)
//apply(plugin = libs.plugins.m8test.javascript.get().pluginId)
//apply(plugin = libs.plugins.m8test.kotlin.get().pluginId)
//apply(plugin = libs.plugins.m8test.lua.get().pluginId)
//apply(plugin = libs.plugins.m8test.php.get().pluginId)
//apply(plugin = libs.plugins.m8test.python.get().pluginId)
//apply(plugin = libs.plugins.m8test.ruby.get().pluginId)
