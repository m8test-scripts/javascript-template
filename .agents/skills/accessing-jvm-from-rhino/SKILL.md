---
name: accessing-jvm-from-rhino
description: 在 M8Test JavaScript 或 TypeScript 脚本由 Rhino 执行时访问 JVM 类、成员、类型转换或 callback 时使用；不适用于 Node.js 或浏览器 JavaScript。
---

# 从 Rhino 访问 JVM

JavaScript 与编译成 JavaScript 的 TypeScript 在 M8Test Rhino 中共用 JVM 互操作运行时。先确认目标类在当前脚本 classloader 可见，再按目标 JVM 签名验证调用。

## 类与对象

使用 Rhino 的 `Packages` 命名空间访问 JVM 类：

```javascript
const StringBuilder = Packages.java.lang.StringBuilder;
const builder = new StringBuilder("M8Test");
builder.append(" Rhino");
const result = String(builder.toString());
```

Rhino 不等同于 Node.js/Nashorn，不使用 `Java.type`。构建或类型声明中的包名前缀不一定是运行时访问语法。

## 类型和 callback

- JVM 重载按目标签名解析。JavaScript `Number`、Java boxed number、primitive、nullable、char 和 varargs 不可互换；需要精确类型时使用公开的类型化工厂或经过验证的显式转换。
- Rhino `Packages` 返回的 Java `String`、boxed 数字与 JavaScript 原生值可能身份不同；按目标语义显式转换后比较。
- `null` 与 `undefined` 不等价；不能把一次成功调用推断为所有重载或空值场景均有效。
- 函数传给 SAM 或 Kotlin function type 时，以目标方法签名为准；验证实际调用、参数、返回和异步完成，不只看声明能编译。
- JavaScript 与 TypeScript 共用运行时结论；TypeScript 的类型声明、`Packages` 声明、编译器和构建转换另由 TypeScript 本地技能处理。

Rhino 调用 Java varargs 时，JavaScript 数字可能以 `Double` 到达目标方法；例如 `%d` 格式可能因类型不匹配失败。目标要求整数时显式构造匹配的 boxed 类型，并在实际签名验证。比较 Java `String` 与 JavaScript 字符串时先用 `String(value)`；boxed 数字比较前按需要用 `Number(value)`。超出 JavaScript 安全整数范围的 `Long` 不应先写成 JS 数字再传递。

```javascript
const Integer = Packages.java.lang.Integer;
const formatted = Packages.java.lang.String.format("%s:%d", "item", Integer.valueOf("3"));
const isNull = Packages.java.util.Objects.isNull(null);       // true
const isUndefined = Packages.java.util.Objects.isNull(undefined); // false
```

## 排查与验证

区分作者源码、构建转换/生成的 JavaScript 和 Rhino 执行结果。类缺失时检查运行时依赖与 classloader，而不是只看声明或自动补全。重载、集合/数组、callback、异常和生命周期按实际目标验证；未执行的行为标为待验证。
