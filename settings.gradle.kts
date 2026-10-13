pluginManagement {
    repositories {
        mavenLocal()
        maven("https://maven.aliyun.com/repository/central")
        maven("https://maven.aliyun.com/repository/public")
        maven("https://maven.aliyun.com/repository/gradle-plugin")
        maven("https://maven.aliyun.com/repository/apache-snapshots")
        google {
            content {
                includeGroupByRegex("com\\.android.*")
                includeGroupByRegex("com\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        mavenLocal()
        maven("https://maven.aliyun.com/repository/central")
        maven("https://maven.aliyun.com/repository/public")
        maven("https://maven.aliyun.com/repository/gradle-plugin")
        maven("https://maven.aliyun.com/repository/apache-snapshots")
        mavenCentral()
        google()
        maven("https://jitpack.io")
    }
    versionCatalogs {
        val m8testVersion = providers.gradleProperty("m8testVersion").get()
        create("m8test") { from("com.m8test:version-catalog:$m8testVersion") }
    }
}

rootProject.name = "m8test-javascript-template"
include(":javascript")
