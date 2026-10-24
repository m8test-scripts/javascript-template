# 01: 验收任务结果、同步配置与异步组合

Type: task
Status: claimed

**What to build:** JavaScript 真实脚本通过 Test Control 证明任务创建、精确结果、错误恢复和组合等待。

**Blocked by:** 00：验收原有 Thread/Timer 的真实脚本基线


## 前置公开能力

- 目标语言可用的统一基础执行与协程 API

能力未具备时不能启动交付；本项目不定义或重建这些通用契约。

## Acceptance criteria

- [ ] 用稳定 manifest 与独立脚本运行，包含同步 builder、启动选择器、launch/async、结果链、nullable 与集合。
- [ ] 覆盖 delay、超时、循环及实际公开组合方法；建立可复用的有限事件等待与失败报告方式。
- [ ] 脚本实际断言之后才输出标记，最终响应与清理均成功才通过；测试源码保持产品发布隔离。

## Comments

暂无。

设备证据：本项目的 `003-coroutine-thread-context` 通过 Test Control，断言 launch、async 结果回调、withContext、Flow map/toList 以及 Flow 错误恢复和完成通知。超时/循环/集合方法和所有同步 builder 仍需逐项补证。
