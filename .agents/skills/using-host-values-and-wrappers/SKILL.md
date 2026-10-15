---
name: using-host-values-and-wrappers
description: 当 JavaScript 脚本需要构造宿主集合或 JVM 数组，或需要通过宿主 wrapper 操作数组、集合和其他受支持对象时使用。
---

# 使用宿主值与 wrapper

本技能说明 JavaScript 源码中宿主集合工厂和对象 wrapper 的职责。示例保持为脚本作者编写的源码形式。

## 选择合适的边界

- 创建或转换数组、List、Set、Map、Pair、Sequence 时，使用 `$arrays`、`$iterables`、`$maps`、`$sequences`。这些工厂负责构造目标 Kotlin/JVM 类型；需要 JVM 数组时使用带元素类型或明确 primitive 类型的工厂。
- 已有 JVM/Kotlin 对象需要脚本可用的集合操作、数组操作或其他专用 wrapper API 时，使用 `$objectWrappers` 的类型化 `wrapX` 方法。例如 `wrapIntArray`、`wrapArray`、`wrapList`、`wrapMutableMap`。
- 目标 API 直接接受普通 JVM 值时，直接传入合适的值；不需要为了包装而包装。
- `$objectWrappers.wrap(value)` 只提供通用 `ObjectWrapper` 合约。它不会为任意对象生成脚本可调用的代理，也不会自动暴露原对象的所有方法。需要专用操作时，选用相应的类型化 wrapper；宿主尚未提供时，使用脚本语言已验证的 JVM 互操作，或为稳定的脚本场景补充明确的宿主 API。
- `$variableWrappers` 用于包装脚本变量及其元信息，不用于包装任意 JVM 数据对象。

## wrapper 的原始对象边界

类型化 wrapper 暴露其接口定义的操作，并可通过 `getOrigin()` 取得原始对象。优先在 wrapper 上完成脚本操作。只有下游 JVM API 明确要求原始类型，且已确认返回类型匹配时，才调用 `getOrigin()`：

```javascript
let rawValues = $arrays.intArrayOf(3, 1, 2);
let values = $objectWrappers.wrapIntArray(rawValues);

values.sort(0, values.getOrigin().length);
values.set(0, 7);
if (!values.contains(7)) {
    throw new Error("IntArrayWrapper operation failed");
}
```

`getOrigin()` 会把脚本带回原生 JVM 类型边界。对第三方库对象使用它，意味着调用方需要处理该库类型及其依赖；若宿主 wrapper 已提供所需操作，应优先使用 wrapper API。

wrapper 与原始对象共享底层对象时，修改会反映到该对象上。转换成新的数组或集合时则应按具体方法的返回类型处理，不能假定所有 wrapper 操作都原地修改。

## JVM 基本类型与转换

脚本语言基本值到 JVM 类型的具体映射受语言运行时和目标 JVM 签名影响。JavaScript 的 `$arrays` 提供明确指定元素类型的数组工厂，转换细节和 Rhino 行为见 `accessing-jvm-from-javascript` 技能。需要 wrapper 操作时，可以在类型化工厂之后再包装：

```javascript
let bytes = $arrays.byteArrayOf(1, 2);
let longs = $arrays.longArrayOf(10, 20);
let chars = $arrays.charArrayOf("a", "b");
let nullableStrings = $arrays.arrayOfNulls(Packages.java.lang.String, 2);

let wrappedBytes = $objectWrappers.wrapByteArray(bytes);
wrappedBytes.set(0, 9);
```

目前没有一个通用的 `toJavaValue` 全局转换器。不要为统一表面形式而假设不同脚本语言的数值、字符、nullable 或重载规则相同。增加宿主转换 API 前，先确认多个脚本语言都遇到同一类实际问题；新方法应明确目标类型和失败行为，并在受影响的语言运行时中验证。

## 设备端验证

1. 修改本技能中的脚本示例时，将对应断言加入 `javascript/src/test-control/002-jvm-interop/main.js`。
2. 运行 `./gradlew -q verifyJavascriptTestControlSelected -Pm8test.testSelectors=javascript-template-jvm-interop`；设备使用 ADB serial 时追加 `-Pm8test.device.serial=SERIAL`。
3. 检查 `javascript/build/test-control/selected-summary.json` 中场景结果为 `passed`。只通过 Gradle 构建不足以证明 Rhino 中 wrapper 调用、类型转换和回调可用。
