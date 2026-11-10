# JavaScript 模板脚本项目 i18n

Status: resolved

## Problem Statement

JavaScript 模板入口 UI 使用固定中文文案，项目显示名称也只有一个默认值。Development Kit 切换语言后，示例 UI 仍是中文；页面还没有标明脚本来自哪个语言模板。

## Solution

为 JavaScript 模板提供英文和中文 BCP 47 字符串目录。入口 UI 通过生成的 `$stringResources` 全局变量读取计数标签、按钮文案和完整的 JavaScript 语言标识。中文目录翻译项目名称和描述；英文项目名称仍取 `appName` 配置。README 说明目录、locale 行为和 JavaScript API。

## Requirements

1. `javascript/res/strings/en.json` 与 `zh.json` 提供计数标签、按钮、语言标识和项目描述。
2. 仅 `zh.json` 提供 `m8test.project.name`，保留 `projectConfig.name` 默认值和 `-PappName` 覆盖。
3. 主 UI 的示例文案都通过 `$stringResources.getString(key)` 获取，并在按钮下方显示本地化的 `Script language: JavaScript` / `脚本语言：JavaScript`。
4. README 解释 BCP 47 catalog、资源复制到 `build/project/res/strings`、跟随宿主 locale，以及 metadata 键。
5. 保持计数器、side scripts、事件载荷和脚本运行行为不变。

## Testing Decisions

- `generateJavascriptGlobalVariables` 在 `.207` 成功，确认模板生成的全局名称为 `$stringResources`。
- 使用实际 `rerunJavascript` 任务在 `192.168.31.207:5555` 上分别验证英文和 `zh-Hans-CN`，检查 UI 文案、语言标识位置和计数按钮。
- JavaScript 模板没有独立 `extensions/javascript` 仓库；若需要语言运行时安装，使用本模板的 `:javascript:installJavascriptExtension`，设备序列固定为 `.207`。
- 检查 `build/project/res/strings` 中的生成 catalogs 与 `javascript/res/strings` 源资源一致，保存中英文截图并恢复宿主跟随系统 locale。

## Out of Scope

不修改宿主、Gradle 插件、其他模板、side scripts 或 README 的文档语言。
