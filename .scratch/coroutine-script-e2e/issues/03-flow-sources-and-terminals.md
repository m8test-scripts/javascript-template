# 03: 验收 Flow 来源、转换与终端

Type: task
Status: claimed

**What to build:** JavaScript 真实脚本验证流的精确序列、同步谓词、错误及终端语义。

**Blocked by:** 01：验收任务结果、同步配置与异步组合


## 前置公开能力

- Flow 执行边界与公开操作行为

能力未具备时不能启动交付；本项目不定义或重建这些通用契约。

## Acceptance criteria

- [ ] 逐项覆盖本轮公开的来源、map/filter/transform、collect/first/single 及其他实际方法。
- [ ] 验证空流、多值失败、错误恢复、重试和结束顺序；嵌套与恢复后语言对象仍可用。
- [ ] 记录方法到用例及外部断言的映射，不能只验证入口存在。

## Comments

暂无。

设备证据：本项目的 `003-coroutine-thread-context` 通过 Test Control，断言有限来源、map、toList、catch 恢复、onCompletion、buffer、debounce、sample、timeout、callback Flow 值及 `awaitClose` 清理恰好一次。完整来源、转换和终端方法矩阵尚未完成。
