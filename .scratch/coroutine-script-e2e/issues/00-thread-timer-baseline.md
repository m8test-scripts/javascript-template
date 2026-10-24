# 00: 验收原有 Thread/Timer 的真实脚本基线

Type: task
Label: ready-for-agent
Status: claimed

**What to build:** 为本项目新增可独立选择的 JavaScript Thread/Timer 真实脚本基线，先证明既有调用在语言线程上下文变化后仍正常，再验收协程。

**Blocked by:** None；先具备可用的目标语言任务执行能力，且用户明确授权 implement。

## Acceptance criteria

- [ ] 按本项目已有 fixture manifest 与文件式脚本组织，使用 Test Control 运行；不新建远程执行器，不把用例放进其他源码树。
- [ ] 覆盖线程 runnable、setTimeout、setImmediate、setInterval 至少两轮后清除；使用原调用形状，断言回调参数、语言对象捕获/读写与精确结果。
- [ ] 覆盖连续/嵌套任务、异常报告、主入口返回后仍登记任务的执行、关闭后不再执行及最终资源清理。
- [ ] 基线不依赖 Coroutines；采用事件驱动和有限超时，不阻塞 Timer 的事件线程，不用固定 sleep 或偶然线程名作为通过条件。
- [ ] 脚本真实断言、运行终态和清理都成功才通过，标记/expectedLogs 只是附加证据。
- [ ] 不把原有支持场景的拒绝执行、只有启动成功或基础设施失败记为通过；公开脚本无法直接观察的绑定机制另记边界证据需求。
- [ ] 建立本项目基线报告并在 01 开始前复核；任何失败都不跳过到协程用例。

## Comments

本文件只规划本项目验收资产；当前未开始 implement，也没有新的测试通过声明。

设备证据：本项目的 `002-thread-timer-context` 与 `003-thread-timer-error` 已通过 Test Control。成功用例覆盖线程回调、onStart/onExit、timeout/immediate、interval 两轮后清除、参数、闭包状态、嵌套 `runWithThreadContext` 和取消任务；错误用例确认 Timer callback 异常路径。
