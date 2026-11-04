# 01：迁移 javascript-template 脚本模板的 Debugger 配置

**目标：**此脚本模板使用新的 Gradle Plugin Debugger 配置，并能按设备绝对路径构建和调试项目。

**依赖：**
- core/gradle-plugin 03：配置并认证 Gradle Plugin Debugger 客户端
- core/android 01：认证 Debugger 请求并使用设备绝对路径

**状态：**ready-for-agent

- [ ] 将旧的 Debugger DSL 和配置改为新的 debugger.* 配置。
- [ ] 保持模板项目文件与运行请求适配设备绝对路径语义。
- [ ] 删除旧 Debugger 配置键的引用。
- [ ] 使用更新后的 Plugin 契约验证代表性的构建和调试流程。

**当前进度：**已移除模板中已废弃的 workspace 配置，并将端口 DSL 改为 port。脚本模板的代表性构建/调试工作流尚未单独验证。
