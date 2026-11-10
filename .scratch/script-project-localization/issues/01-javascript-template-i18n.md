# 01: JavaScript 模板展示双语脚本项目

**What to build:** JavaScript 模板项目跟随 Development Kit 语言显示本地化 metadata 和入口 UI，并能在页面中识别 JavaScript 语言。

**Blocked by:** None.

**Status:** resolved

- [x] 在 `javascript/res/strings/` 添加英文和中文 BCP 47 catalogs，覆盖项目描述、计数标签、按钮和语言标识；仅中文覆盖项目名称。
- [x] 主 UI 使用 `$stringResources.getString(key)`，在按钮下方显示本地化语言标识。
- [x] README 说明 catalogs、宿主 locale、API 与 metadata 键。
- [x] `generateJavascriptGlobalVariables` 与 `rerunJavascript` 在 `.207` 上成功；英文、中文 UI 和按钮交互正常，生成目录 catalogs 与源资源一致。

## Answer

JavaScript 模板现在从 `javascript/res/strings/` 提供英文和中文 catalogs，入口 UI 通过 `$stringResources` 本地化计数标签、按钮和按钮下方的语言标识。中文 catalog 覆盖项目名称并翻译项目描述。全局变量生成结果确认 `$stringResources` 可用。`rerunJavascript` 在英文和 `zh-Hans-CN` 下均退出码为 0；两种语言的截图确认文案正确，中文按钮点击后计数从 0 变为 1。截图：`/tmp/m8test-javascript-en.png`、`/tmp/m8test-javascript-zh.png`、`/tmp/m8test-javascript-zh-counted.png`。验证后 Development Kit locale 已恢复为空覆盖，继续跟随设备 `zh-Hans-CN`。
