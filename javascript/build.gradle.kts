plugins {
    // 使用 m8test javascript gradle 插件, 表示这是一个 m8test javascript 项目
    alias(m8test.plugins.m8test.gradle.script.javascript)
}
// 在gradle.properties中定义的变量, 用于指定m8test版本
val m8testVersion: String by project
val webViewExtensionVersion: String by project
val virtualDisplayExtensionVersion: String by project
val composeExtensionVersion: String by project
// 在gradle.properties中定义的变量, 用于指定无障碍插件版本
val accessibilityVersion: String by project
// 在gradle.properties中定义的变量, 用于指定图色插件版本
val opencvVersion: String by project
// 在gradle.properties中定义的变量, 用于指定文字识别插件版本
val ocrVersion: String by project
// m8testJavascript 闭包用于配置 m8test javascript 项目
m8testJavascript {
    // 启用可选 APK Tools Extension；未启用时 BuildProjectSource 不包含 APK 构建能力。
    apkBuild {
        isEnabled = true
    }
//    properties["ADB_HOME"] = "/usr/bin/" // ADB安装目录
//    properties["ADB_EXECUTABLE"] = "adb" // ADB可执行文件路径, 相对于 ADB_HOME
//    properties["SCRCPY_HOME"] = "" // scrcpy安装目录, 如果不需要投屏的话可以不安装
//    properties["SCRCPY_EXECUTABLE"] = "" // scrcpy可执行文件路径, 相对于 SCRCPY_HOME
//    properties["NODEJS_HOME"] = "/usr/bin/" // node安装路径
//    properties["NODEJS_EXECUTABLE"] = "node" // node可执行文件路径, 相对于 NODEJS_HOME
//    properties["NPM_HOME"] = "/usr/bin/" // npm安装路径
//    properties["NPM_EXECUTABLE"] = "npm" // npm可执行文件路径, 相对于 NPM_HOME
    filterClass = { packageName, className ->
        // 这里用于过滤一些需要使用的类，避免生成代码提示文件时间过长以及防止过多的代码提示文件导致ide卡顿
        packageName.startsWith("com.m8test") && !packageName.startsWith("com.m8test.internal")
                || packageName.startsWith("java.")
                || packageName.startsWith("kotlin.")
                // 用到的类才生成代码提示文件，如果所有的java类都生成的话会导致idea非常卡, 如果你没有使用 android api可以把 android 相关的注释掉
                || packageName.startsWith("android.view")
                || packageName.startsWith("android.widget")
//                || packageName.startsWith("com.blankj.utilcode")
//                || packageName.startsWith("com.hjq.toast")
    }
    webpack {
        isEnabled = false // 启用webpack,可以打包以及混淆项目, 开始时推荐关闭，这样可以快速测试
        mode = "development" // 'development'(开发模式, 混淆关闭), 开发脚本时推荐使用此模式
//        mode = "production" // 'production'(生产模式，混淆开启), 打包apk时推荐使用此模式
    }
    // debugger 闭包用于配置调试器(安卓设备)的信息
    debugger {
        adbDeviceSerial = providers.gradleProperty("adbDeviceSerial").orNull
        // 本地设备验证时通过 -Pm8test.device.serial=<serial> 指定设备，避免回退到 deviceIp:adbPort。
        providers.gradleProperty("m8test.device.serial").orNull?.let {
            adbDeviceSerial = it
        }
        // adb 设备序列, 如果您通过数据线连接则需要填写adb设备序列, 例如 emulator-5554, 如果设置了此属性的话并且不为null的话 adbPort 和 deviceIp 会被忽略
        // adbDeviceSerial = "emulator-5554"
        // 安卓设备的ip地址, 这里是局域网的ip地址, 如果是云手机的话可能需要内网穿透, 这里的ip就需要填写有公网ip的服务器的ip地址
        deviceIp = "192.168.31.13"
        // M8Test脚本项目根路径, 电脑端构建好的项目会推送到该路径对应的目录
        workspace = "/sdcard/M8Test/project"
        // 安卓设备的adb调试端口, 如果是云手机的话就需要填写内网穿透时映射的adb端口
        adbPort = 5555
        // 安卓设备调试器服务启动的端口
        debuggerPort = 5354
        // 打包apk时的运行时模板apk配置, 打包apk时会将脚本项目打包到该模板apk中
        runtimeConfig {
            // 模板apk的版本
            version = m8testVersion
        }
        // M8Test 开发工具配置闭包
        developmentKitConfig {
            // 开发工具的包名, 使用默认就好
            packageName = "com.m8test.app.developmentkit"
            // 开发工具版本
            version = m8testVersion
            localApk = providers.gradleProperty("developmentKitApk").orNull?.let(::file)
            // api文档根目录
            docsRoot = "https://sdk-docs.m8test.com/sdk"
        }
    }
    settingsConfig {
        language {
            groupId = "com.m8test.extension.language"
            artifactId = "javascript"
            entryId = "javascript"
            version = m8testVersion
        }
    }
    // 脚本项目配置闭包
    projectConfig {
        // 是否将插件(语言/组件)打包进脚项目中, 如果不将插件打包进脚本项目中，那么运行时会从网络下载需要的语言以及组件，但是需要确保能正常访问外网，这种方式打包速度快，推荐开发时使用这种方式;如果是打包成apk，推荐将插件打包进脚项目中, 这样交付给用户之后就可以直接使用，而无需从网络下载插件, 但是这样安装包会更大
        isPluginsBundled = false
        // WebView 能力由独立 Runtime Extension 提供；变量名仍由语言绑定决定。
        requireComponent("com.m8test.extension", "webview", webViewExtensionVersion)
        requireComponent("com.m8test.extension", "virtual-display", virtualDisplayExtensionVersion)
        requireComponent("com.m8test.extension", "compose", composeExtensionVersion)
        // 相对于res目录的资源文件,会打包到apk的assets目录下
        // 这个文件表示apk启动时自动执行的脚本, 只能是true或者false
        addAsset("auto_start_spa.txt")
        // 这个文件表示脚本项目官网,可以是一个网址
        addAsset("official_website.txt")
        // 这个文件表示脚本项目版权信息
        addAsset("copyright.txt")
        // 脚本项目入口文件, 这里是相对于src目录的路径
        entry = "com/example/script/primary.js"
        // 辅助脚本，会在入口文件中自动启动这些脚本, 需要是相对于src目录的路径
        sides = mutableListOf("com/example/script/side1.js", "com/example/script/side2.js")
        // 脚本项目包名, 和java包名规则一样
        packageName = "com.example.script.javascript"
        // 脚本项目logo配置, 这里是相对于 res 目录的路径
        logo = "logo.png"
        // 组件依赖示例暂时保留为注释；这些组件尚未完成新 Extension 元数据适配。
//        // 在脚本项目中引用 M8Test 组件
//        requireComponent {
//            // 无障碍组件
//            name = "YumiMiyamotoAccessibility"
//            // 组件版本
//            version = accessibilityVersion
//            // 组件下载地址
//            url =
//                "https://github.com/YumiMiyamoto/accessibility-release/releases/download/Accessibility-$version/com.m8test.accessibility-release_$version.apk"
//            // api文档根目录
//            docsRoot = "https://yumimiyamoto.github.io/accessibility-release/app"
//        }
//        // 在脚本项目中引用 M8Test 组件
//        requireComponent {
//            // ocr组件
//            name = "YumiMiyamotoOcr"
//            // 组件版本
//            version = ocrVersion
//            // 组件下载地址
//            url =
//                "https://github.com/YumiMiyamoto/ocr-release/releases/download/ocr-$version/com.m8test.ocr-release_$version.apk"
//            // api文档根目录
//            docsRoot = "https://yumimiyamoto.github.io/ocr-release/ocr"
//        }
//        // 在脚本项目中引用 M8Test 组件
//        requireComponent {
//            // opencv 图色组件
//            name = "YumiMiyamotoOpencv"
//            // 组件版本
//            version = opencvVersion
//            // 组件下载地址
//            url =
//                "https://github.com/YumiMiyamoto/opencv-release/releases/download/opencv-$version/com.m8test.image-release_$version.apk"
//            // api文档根目录
//            docsRoot = "https://yumimiyamoto.github.io/opencv-release/image"
//        }
    }
    // 工具相关配置
    tools {
        // 测试文件的配置
        test {
            // key 为需要测试的文件路径，相对于模块根目录, value 为测试文件在设备中的路径
            paths["build/test/test.js"] = "/sdcard/M8Test/test.js"
            paths["build/test/test1.js"] = "/sdcard/M8Test/test1.js"
        }
        // 端口转发，可以将安卓设备端的端口映射到电脑端
        portForwarding {
            // 将安卓设备的5001端口映射到本地的5000端口, 可以通过 localhost:5000 访问到安卓设备端的5001端口
            add(5000, 5001)
        }
    }
    // 构建脚本配置, 一般不会用到
    buildScriptConfig {
//        // 在构架脚本中引入插件
//        requirePlugin {
//            name = "Debugger"
//            version = "0.1.2"
//            url = "https://github.com/m8test/debugger/releases/download/$version/debugger-release-unsigned.apk"
//        }
    }
}
