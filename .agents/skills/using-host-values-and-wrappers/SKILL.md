---
name: using-host-values-and-wrappers
description: 设计或使用 M8Test 脚本侧 JVM 集合工厂与宿主对象 wrapper 契约时使用。
---

# 使用宿主值与 wrapper

先按目标版本的公开 API 确认工厂和 wrapper 的职责。创建脚本需要交给 JVM API 的容器时，使用匹配的类型化数组/集合工厂；已有对象需要脚本侧专用操作时，使用相应类型化 wrapper。

- 脚本语言原生 array/list/table 与 JVM array/List/Set/Map 不等价；选择明确的目标类型和可变性。
- wrapper 只承诺其接口明确提供的操作。通用 wrapper 不会代理任意对象的全部方法；变量 wrapper 与数据对象 wrapper 用途不同。
- wrapper 若与原对象共享底层状态，修改会反映到原对象；转换工厂也可能创建新对象。查返回类型，不假设所有操作原地修改。
- `getOrigin()` 会把调用方带回原生 JVM 类型及其依赖边界。仅在下游 API 确实要求该类型且类型已确认时解包。
- origin 是互操作能力通道，不是访问控制机制；不能用 wrapper 声称隔离或裁剪原对象权限。
- 数值、字符、nullable、数组、callback 和重载转换由语言运行时及目标签名决定。共享规则不得从一种语言外推到另一种；引用对应语言的本地互操作技能。

验证要覆盖真实脚本运行时的目标类型、可变性和身份语义；代码补全或静态编译不构成运行时证据。
