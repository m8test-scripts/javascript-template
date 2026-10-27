---
name: writing-commit-messages
description: 为 M8Test 仓库拟定、检查或整理提交信息时使用；中文 Conventional Commit 约定适用于所有仓库。
---

# 编写提交信息

先概括变更的主要目的，再从当前仓库和改动领域选择合适的 `type` 与可选 `scope`。标题用中文简洁描述可观察结果，不写实现过程。

```text
<type>(<scope>): <中文简短描述>
```

- 主要属于一个模块或领域时填写 scope；跨领域或无法可靠确定时省略，不套用其他仓库的 scope 清单。
- 多个独立目的应拆成多个提交。不要用 `chore` 掩盖功能、修复或测试变更。
- 提交前核对完整 staged diff，只纳入当前提交授权范围内的文件；保留用户已有的 staged 与 unstaged 改动。
- 当前任务已授权提交且交付流程要求提交时，直接按约定提交，不把拟定标题当成额外审批步骤。授权不覆盖推送或其他外部操作。

类型定义、提交边界和示例见 [Conventional Commit 约定](references/commit-conventions.md)。
