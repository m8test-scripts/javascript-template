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

设备证据：本项目的 `003-coroutine-thread-context` 通过 Test Control，断言 `getScriptMain()` 回调线程、IO 调度、delay 恢复后的闭包变量访问和等待期间 Timer 任务推进；`004-coroutine-context-nesting` 断言嵌套 launch 后外层继续、内层读取捕获值及兄弟任务推进。另覆盖 async 结果回调、withContext、Flow map/toList、Flow 错误恢复和完成通知。超时/循环/集合方法和所有同步 builder 仍需逐项补证。

`003-coroutine-thread-context` 现还断言 `_async` 成功值为 `7`，以及 Flow `map` 与 `toList` 的结果为 `[2, 4]`；Test Control 重新执行通过。

`004-thread-timer-error` 已通过 Test Control：Timer callback 抛出的预期异常使脚本以 `scriptError` 结束，且错误消息匹配。

`002-thread-timer-context` 的线程生命周期断言现也通过：worker 的 `onStart` 与 `onExit` callback 检查 `isCurrent()`、`isMain()` 和 `getName()`，并继续验证 runnable、Timer 参数、interval 两轮后取消及嵌套 context。比较 Java `String` 时需在脚本中显式转为 JavaScript 字符串。

该用例进一步断言生命周期回调期间线程仍 `isAlive()` 且 `isInterrupted()` 为假，设备 Test Control 通过。
