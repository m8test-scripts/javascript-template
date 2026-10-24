# 02: 验收取消、完成通知与续体竞争

Type: task
Status: claimed

**What to build:** JavaScript 真实脚本证明取消、完成前后注册、注销及续体竞争的可观察契约。

**Blocked by:** 01：验收任务结果、同步配置与异步组合


## 前置公开能力

- 受管理通知与取消续体行为

能力未具备时不能启动交付；本项目不定义或重建这些通用契约。

## Acceptance criteria

- [ ] 每个通知使用显式事件有限等待，不假定 join 等待通知或完成后注册同步执行。
- [ ] 覆盖通知恰好一次、注销、通知异常、取消不被 catch 转成功及 resume/cancel 竞争。
- [ ] 以结果、状态、次数与清理断言判定，区分业务失败、超时和基础设施失败。

## Comments

暂无。

设备证据：本项目的 `009-coroutine-cancellation-catch-error` 通过 Test Control，验证取消继续传播、catchError 恢复函数不运行、完成通知观察到取消并且 Script 最终关闭。关闭/中断场景另由 `004`–`008` 用例覆盖；resume/cancel 的低层竞争仍以 Runtime 单测为证。
