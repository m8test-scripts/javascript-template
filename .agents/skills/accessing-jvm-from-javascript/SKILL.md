---
name: accessing-jvm-from-javascript
description: 当 JavaScript 脚本需要访问 Java/JVM 类、创建 Java 对象、调用静态或实例成员，或把 JavaScript 函数传给 JVM 回调接口时使用。
---

# 从 JavaScript 访问 JVM

本技能描述开发者编写的 JavaScript 源码如何通过宿主内置的 Rhino 访问 JVM。示例写在模板源码层；回答 API 用法时先给出脚本作者实际编写的代码，再说明构建或运行时的转换。

## 运行时边界

- JavaScript 由宿主内置的 Rhino 执行。标准作用域提供 Rhino 的 `Packages` 类路径入口。
- Java 类在脚本中通过 `Packages.<package>.<Class>` 访问。例如 `Packages.java.lang.StringBuilder`。
- Rhino 也允许从标准包根 `java` 进入类路径，例如 `java.lang.StringBuilder`。优先使用 `Packages` 全路径，使 Java 来源清晰；包根简写只在已验证且更易读时使用。
- JavaScript 的 JVM 类路径前缀是 `Packages`。`m8test_java` 是部分其他语言的类包装或生成代码前缀，不是 JavaScript 的运行时类访问前缀。
- Gradle 插件生成的 JavaScript BuildScript 与项目脚本是两层代码。`JavascriptPlugin` 生成的 BuildScript 使用 `$project`、`$files` 等宿主全局变量；不要把那层变量规则误当成 Rhino Java 类访问语法。
- 默认关闭 webpack 时，模板源码被复制到项目中；启用 webpack 后，Node/Webpack 处理项目源码，再由 Rhino 执行生成的 JavaScript。TypeScript 也先编译成 JavaScript。上述转换不会把 Java 类引用改写成 `m8test_java`。

## JVM 类与成员

使用 Rhino `Packages` 访问类，构造对象并调用 Java 成员：

```javascript
let StringBuilder = Packages.java.lang.StringBuilder;
let builder = new StringBuilder("M8Test");
builder.append(" JavaScript");
let value = builder.toString();

let currentTimeMillis = Packages.java.lang.System.currentTimeMillis();
let values = $iterables.mutableListOf("first");
values.add("second");
let first = values.get(0);
let maxInteger = Packages.java.lang.Integer.MAX_VALUE;
```

成员类可以通过包命名空间继续访问。Android 例子是 `Packages.android.widget.FrameLayout.LayoutParams`。在源码注释或 Java 文档里可能写成 `FrameLayout$LayoutParams`；脚本使用 Rhino 命名空间时按模板的 `Packages.android.widget.FrameLayout.LayoutParams` 示例编写。

宿主通过 `Context.initStandardObjects(null, true)` 创建 sealed Rhino 标准作用域；Rhino shell 的 `importClass`、`importPackage` 等便利函数没有注入。脚本应使用 `Packages` 全路径，或将类显式保存到局部变量中。

## JavaScript 值与 JVM 类型

JavaScript 的运行时值会按目标 JVM 方法签名转换；同一个 JS 数字传给 `Int`、`Long`、`Float` 或 `Double` 参数时，转换由目标类型决定。重载方法可能因此产生歧义。以下是模板设备端实际验证过的映射方式：

| JavaScript 值 | JVM 目标 | 写法/注意事项 |
| --- | --- | --- |
| 字符串 | `String` | 可传给 Java/Kotlin 字符串参数。JVM 返回的 Java `String` 与 JS 原生字符串比较内容前先用 `String(value)` 转换。 |
| 数字 | `Byte`、`Short`、`Int`、`Long`、`Float`、`Double` | 通过对应 `$arrays.*ArrayOf(...)` 工厂按目标类型构造 primitive array。Java boxed 数值读回后比较前使用 `Number(value)` 转成 JS 数字；不要从一个成功的重载调用推断所有重载都能正确区分。 |
| 布尔值 | `Boolean` | 通过 `$arrays.booleanArrayOf(...)` 构造 primitive boolean array。 |
| 单字符字符串 | `Char` | 通过 `$arrays.charArrayOf("x")` 构造 primitive char array；传入恰好一个字符。Java `Char` 读回 JS 时是 UTF-16 字符编码数字，需要用 `String.fromCharCode(value)` 转回单字符字符串。 |
| `null` | 可空引用 | 使用 `$arrays.arrayOfNulls(clazz, size)` 创建可空元素数组。 |
| 普通对象值 | 引用数组元素 | 用 `$arrays.arrayOf(clazz, ...values)` 声明 JVM 元素类，再构造引用数组。 |
| JavaScript 原生数组 | JVM 数组/集合 | 不要假设自动转换成特定 JVM 类型；使用 `$arrays` 的类型化工厂，或 `$arrays.toList` 等显式转换。 |

这些工厂的签名定义在宿主 `Arrays`、`Iterables`、`Maps` 和 `Sequences` 全局 API 中。实际变量名前缀由语言决定；JavaScript 中分别是 `$arrays`、`$iterables`、`$maps`、`$sequences`。关于这些工厂与 `$objectWrappers` 的具体职责和 wrapper 使用，读取 `using-host-values-and-wrappers` 技能。脚本构造或转换数组、List、Set、Map、Pair 和 Sequence 时使用这些宿主全局变量：

```javascript
let nullableStrings = $arrays.arrayOfNulls(Packages.java.lang.String, 2);
let numbers = $arrays.intArrayOf(1, 2, 3);
let strings = $arrays.arrayOf(Packages.java.lang.String, "first", "second");

let list = $iterables.mutableListOf("first", "second");
let set = $iterables.setOf("a", "a");
let map = $maps.mutableMapOf($maps.pairOf("count", 2));
let sequence = $sequences.sequenceOf(1, 2, 3);
let sequenceList = $sequences.toList(sequence);
```

只有目标 Java API 明确要求特定 Java 集合实现且宿主全局 API 无法满足时，才直接创建 `Packages.java.util...` 集合；先验证该 API 的参数签名和实际调用。需要 Java array 时指定元素 `Class`，或用带元素类型的 primitive array 工厂，不要假设 JS 原生数组会自动变成所需 JVM array。

### 已验证的 JVM 参数边界

下列行为已经在设备端 Rhino Test Control 中验证：

- 传给接受 `Object` 的 Java 方法时，`null` 是 JVM `null`；JavaScript `undefined` 仍是一个非 null 的 Rhino 值。两者不能互换。
- Java varargs 可以从 JavaScript 调用，但其中的 JavaScript 数字会作为 `Double` 到达 Java。`String.format("%d", 3)` 会因类型不匹配抛出 `IllegalFormatConversionException`；需要整数格式时可显式传入 `Integer.valueOf("3")` 这样的目标 boxed 类型。
- Kotlin varargs 已在 `$arrays.intArrayOf`、`$iterables.listOf` 和 `$maps.mutableMapOf` 中验证了零个、一个及多个参数/元素。Kotlin `Int` vararg 按声明的元素类型构造；这个结果不能外推到 Java `Object...`，也不能据此假设所有 vararg overload 都无歧义。
- Java 方法抛出的异常可以被 JavaScript `try/catch` 捕获，但当前 Rhino 抛给脚本的是包装后的脚本异常对象；不要假定其具有 Java `Throwable.getMessage()`。可先用 `String(error)` 观察异常信息。
- `java.util.concurrent.TimeUnit.SECONDS` 可从 Rhino 取得并调用其 Java 方法。这只验证了一个可访问 JVM enum 的例子，不表示宿主应把 enum 用作 `@Keep` API；宿主公开契约遵循宿主的脚本 API 规范。

这些用例只固定已观察到的特定调用，不代表 Rhino 对所有 varargs、异常或重载都有相同转换规则。方法重载选择、`null` 参与重载、Kotlin `object`/companion、属性 getter、顶层扩展函数、非 SAM 多方法接口以及多维数组仍需按真实目标 API 单独验证。Kotlin 源码形状不等于 Rhino 可调用的 JVM 表面；优先调用宿主公开 facade，并以目标类的 JVM 签名和设备测试为准。

## Java 函数式接口与回调

JavaScript 函数可传给 Java 单抽象方法接口（SAM）。模板的 `init/access-jvm.js` 使用 `Runnable` 验证了这种形式：

```javascript
let Runnable = Packages.java.lang.Runnable;
let called = false;
let runnable = new Runnable(function () {
    called = true;
});
runnable.run();
```

JavaScript 函数也可以传给宿主的 Kotlin 函数类型。目标 API 的签名决定参数与返回值；例如 `$logger.withContext` 接收一个带 `LogContext` 参数的 Kotlin 函数：

```javascript
let callbackCalled = false;
$logger.withContext(context => {
    callbackCalled = context !== null;
});
if (!callbackCalled) {
    throw new Error("Kotlin Function1 callback was not invoked");
}
```

模板中的 `$composeView.create((slot) => { ... })`、`setOnClick(() => { ... })`、事件订阅和计时器回调也是宿主 API 从 JavaScript 调用的真实例子。不要只依据 Java/Kotlin 的声明推断 Rhino 一定能转换任意 callback：调用后要验证回调确实执行、参数可读、返回值符合目标 API，并在异步 API 中等待可观察结果。

## 调用边界与排错

- Java 方法按 JVM 类型签名解析重载。发生歧义时，使用目标 API 已有的显式工厂/辅助方法，或先在 Test Control 中缩小到单个重载验证；不要假设 JavaScript 的数字会自动匹配期望的 primitive 或 boxed 类型。
- Java 集合、数组和 JavaScript 原生数组是不同类型。脚本数据结构优先使用 `$arrays`、`$iterables`、`$maps`、`$sequences`；调用要求 Java 特定类型的 API 时，先确认工厂返回值与参数签名匹配，并通过运行时断言检查长度与元素。
- Rhino 返回的 Java `String` 与 JavaScript 原生字符串即使文本相同，也可能不是同一种值；比较内容时先显式转成 JavaScript 字符串（例如 `String(javaValue)`）。Java boxed 数值比较前用 `Number(javaValue)`；不要直接对 Java 包装值做严格相等比较。
- JS `Number` 无法精确表示任意大的整数。需要精确传递超出安全整数范围的 `Long` 时，不要先把十进制数写成 JS 数字；选择保留精度的字符串/Java API 转换路径，并验证最终值。
- 成员类、静态字段、varargs、异常对象及 nullable 返回值的 Rhino 行为以当前宿主实测为准。不要把 Node.js 的 Java interop、Nashorn 的 `Java.type`/`Java.to` 或其他语言的类导入语法套用到 Rhino。
- 若 `Packages` 找不到某个 `com.m8test` 类，先确认对应 Extension/语言依赖是否已解析并加载到当前脚本的类加载器；代码补全声明存在不代表运行时依赖已经加载。
- 报错时区分源码层、构建转换层和 Rhino 运行层：检查 authored `.js`，查看 `build/project` 中实际送入宿主的 `.js`，再用最小 Test Control 场景复现。

## 验证要求

1. 每次新增或修改本技能中的语法示例，都更新 `javascript/src/test-control/002-jvm-interop/main.js` 的断言，使示例在设备端被实际执行。
2. 运行 `./gradlew -q verifyJavascriptTestControlSelected -Pm8test.testSelectors=javascript-template-jvm-interop`，并检查 `javascript/build/test-control/selected-summary.json` 中该场景通过。设备通过 ADB serial 连接时追加 `-Pm8test.device.serial=SERIAL`。
3. 若验证 JVM 回调或 Extension API，再通过对应 API 的 Test Control/UI fixture 验证回调执行或 UI 行为；只验证 `buildJavascript` 成功不算运行时验证。
4. 技能示例必须与当前模板源码、Rhino 执行器及 Gradle 插件实际生成的项目源码一致。若其中一层不一致，先修正文档对边界的描述，再记录语言行为。
