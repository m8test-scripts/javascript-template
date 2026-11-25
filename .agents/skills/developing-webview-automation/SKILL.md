---
name: developing-webview-automation
description: 开发、调试或排查通过 M8Test WebView Extension 驱动网页的脚本自动化时使用；尤其适用于页面状态、定位器、等待、登录流程和 CDP 诊断。
---

# 开发 M8Test WebView 自动化

先把网页行为在一个可观察的 live WebView target 上查清，再把已验证的步骤写成 M8Test WebView 脚本，最后用 Test Control 验证脚本运行。CDP 诊断和 Test Control 是不同阶段，前者不能代替后者。

## 诊断 live 页面

1. 查看脚本项目、目标语言、Development Kit 版本及 WebView Extension 的实际版本；阅读该版本公开的 WebView `@Keep` API 和项目文档，不假设它完整兼容 Playwright。
2. 使用 WebView Extension 自己的 Browser UI 打开目标页面，并让该 UI session 保持存活。通过目标版本公开的 Navigation 或 UI 入口进入 Browser；不要把 Test Control 创建的短生命周期页面当成远程调试现场。
3. 从项目配置解析唯一设备 serial，确认 WebView Extension Browser UI 中的目标页面仍存活。使用当前 Gradle Plugin 提供的 `listWebViewTargets` 任务完成 debugger bootstrap、认证请求、设备转发与 discovery 文件导出；用 `-Pm8test.device.serial=<ADB serial>` 指定唯一设备，并可用 `-Pm8test.webview.targets.outputFile=<path>` 指定输出文件。例如：

   ```shell
   ./gradlew -q -Pm8test.device.serial=<ADB serial> \
     -Pm8test.webview.targets.outputFile=build/diagnostics/webview-targets.json \
     listWebViewTargets
   ```

   任务读取 `/json/version` 和 `/json/list`，输出包含 browser 信息及 page targets 的 JSON 快照，不写入 debugger 用户名、密码或认证头；它不安装/重启 Development Kit，也不关闭 Browser UI。确认目标插件版本确实注册了该任务。旧版本缺少任务时，才在核对目标 debugger 能力后使用认证 discovery 请求作为临时回退。
4. 从输出文件中按进程槽位、target 类型、标题和 URL 选择目标。WebSocket URL 依赖当前 ADB forward；页面或其所属进程结束后路由会失效，需重新运行任务获取快照。仅启用了 WebView debugging 的存活页面会出现；空 target 列表是有效结果，不等于 discovery 请求失败。
5. 若有多个候选，按进程槽位、target 类型、标题和 URL 检查页面身份；由操作者或 AI 选择一个 target ID。target ID 和路由只在当前进程实例存活期间有效。
6. 使用 `sendWebViewCdpRequest` 对选定 target 发送一条 CDP 请求。它和 `listWebViewTargets` 是两个独立任务：先 discovery 并选择 ID，再另起一次 Gradle 调用发送请求；发送任务会刷新 debugger 路由并拒绝已失效的 ID。把标准 CDP 命令对象放进请求文件，要求包含整数 `id` 和非空 `method`，可选 `params`；任务按 ID 将匹配响应写入响应文件，CDP 协议错误也保存在响应 JSON 中。它只等待该命令的响应，不等待导航、页面事件或业务状态。例如：

   ```json
   {"id":1,"method":"Runtime.evaluate","params":{"expression":"document.title","returnByValue":true}}
   ```

   ```shell
   ./gradlew -q -Pm8test.device.serial=<ADB serial> \
     -Pm8test.webview.cdp.targetId=<selected target ID> \
     -Pm8test.webview.cdp.requestFile=cdp/request.json \
     -Pm8test.webview.cdp.responseFile=build/diagnostics/cdp-response.json \
     sendWebViewCdpRequest
   ```

   `responseFile` is optional; the default is `build/diagnostics/webview-cdp-response.json`. The response timeout defaults to 30 seconds and can be set with `-Pm8test.webview.cdp.timeoutMillis=<milliseconds>`. Each invocation sends exactly one request. Re-run discovery after the Browser UI process/target ends or the route becomes stale.
7. 先读取 URL、title、frame、DOM 或 accessibility 状态，确认页面实际处于哪个业务状态。然后每次发送一条请求，再依据响应或下一次读取判断下一步；Gradle 诊断任务不负责多步编排、事件订阅或等待页面加载。截图用于确认布局和遮挡；DOM/accessibility 与协议状态用于判断语义和操作结果。

诊断成功的标准是：能够指出页面当前状态、每个操作命中的目标、操作后的状态变化，以及失败时停留的阶段。仅看到页面或收到 CDP 命令响应不算业务流程成功。

## 编写 M8Test 脚本

把 CDP 已验证的流程迁移到 WebView Extension 的脚本 API，并先核对实际版本中的完整签名。优先使用公开的 Browser/Page、`Page.navigate`、`Page.expectNavigation`、`Page.waitForUrl`、`Page.waitForFunction`、`Page.locator`、`ElementSelectors.getByRole/getByText` 和 Locator 查询/等待/交互方法，例如 `count`、`isVisible`、`isEnabled`、`getText`、`getAttribute`、`getProperty`、`waitFor`、`click`、`fill` 与 `press`。按页面语义选择最稳定的定位方式，并在操作前确认候选唯一、可见且可交互。

普通的网页交互必须通过对应的 `@Keep` Locator/Page 方法完成。电脑端 CDP 诊断用于观察现场和探索 DOM，不是生产脚本的替代控制面；不要把 CDP 请求任务或 `Page.evaluate` / `Frame.evaluate` 用来重写已经由公开 API 覆盖的点击、输入、等待、导航或断言。仅当公开 API 确实缺少所需能力时，才把 evaluate 用作范围明确的回退；优先用于只读观察，并在代码/证据中说明缺少哪个封装、为何无法用现有方法表达。反复需要的能力记录为 WebView Extension API 缺口，交由其所有者评估；脚本项目不要私自修改其他仓库的接口。

用可观察的业务状态驱动等待和状态机，例如登录表单、认证后的账户控件、导航目标或表单值。为等待配置合理的超时和轮询间隔；超时要输出阶段、当前 URL、页面标记、候选元素数和关键观察结果。网络延迟时继续观察当前状态并在总时限内采取对应动作，不用固定 sleep 代替状态判断，也不把访问某个通用 URL 当成业务成功证据。

## 验证与现场保留

使用适合目标的 M8Test 测试方式验证实际脚本：需要独立脚本上下文时使用 Test Control；需要项目模块上下文时使用 project test。按目标仓库定义的入口任务和设备配置运行，并检查业务断言，不把编译、READY 或导航命令成功当成脚本测试通过。

调试运行失败后若需要电脑端继续检查，应保持 Browser UI 的目标页面和 debugger 存活，先读取 CDP target 和页面现场，再结束该 session。记录 CDP 诊断证据与 M8Test 测试结果的对应关系；CDP 手动流程成功只证明页面路径可行，不证明 Rhino/其他运行时中的 M8Test 脚本成功。保留最小必要证据，不记录密码、认证头或可复用的敏感 session 数据。
