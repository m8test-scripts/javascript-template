---
name: developing-script-template
description: 当需要开发、测试或验证本脚本项目模板及其语言专属构建配置时使用。
---

# 开发脚本模板项目

本技能用于开发本项目提供的脚本模板。先从 `README.md`、`settings.gradle.kts` 和 Gradle 配置识别语言与任务前缀。

## 日常流程

1. 阅读本仓库现有脚本、资源、`src/test-control` fixture 和项目配置，再修改模板内容。
2. 查看本项目实际任务：Gradle 命令带 `-q`，例如 `./gradlew -q tasks --all`。
3. 运行 Gradle 前检查是否有其他 Gradle 进程；若有，先停止它们。
4. 按当前语言前缀使用本项目注册的 `build<Language>`、`run<Language>` 或 `rerun<Language>`。普通运行用于首次启动，重复验证运行 `rerun<Language>`，避免把之前仍在运行的实例当作本次结果。
5. 构建成功只证明项目构建阶段完成。若改动脚本行为，应通过当前模板的 Test Control 或语言项目任务验证设备端实际执行结果。
6. 若模板有 UI fixture，确认页面显示和交互断言与该语言模板实际 UI 一致；复用既有 fixture 协议，不用屏幕坐标代替可用的自动化断言。

## 任务选择

- `build<Language>`：构建当前脚本项目的 BuildProjectSource。
- `run<Language>` / `rerun<Language>`：在 Development Kit 中运行或重新运行当前脚本项目。
- `verify<Language>TestControl` 及其变体：仅在本项目注册了这些任务时用于脚本测试。
- 代码补全、APK 打包和单文件测试任务只在改动涉及对应能力时运行。
