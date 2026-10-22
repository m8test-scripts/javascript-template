# 01: 迁移JavaScript模板交付配置

**What to build:** JavaScript 模板使用者能够按本模板文档配置、构建并运行统一宿主承载的脚本应用。

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] 模板使用本语言现有项目应用信息，不重复声明身份。
- [x] 示例展示统一宿主、启动策略及开发或发布签名的配置方式。
- [x] 旧交付运行时配置已删除，示例通过真实设备 APK 构建。
- [x] 说明只覆盖本语言模板；不提交密钥或密码。

## Comments

- 2026-10-22：设备构建成功，APK 包名为 `com.example.script.javascript`、版本为 `1.0.1`；产物包含自动启动 descriptor 和 SPA payload。
