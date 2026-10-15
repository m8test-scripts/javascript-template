function assertEquals(name, expected, actual) {
    let equal;
    if (typeof expected === "number") {
        equal = expected === Number(actual);
    } else if (typeof expected === "boolean") {
        equal = expected === Boolean(actual);
    } else {
        equal = String(expected) === String(actual);
    }
    if (!equal) {
        throw new Error(name + ": expected " + expected + ", got " + actual);
    }
}

let StringBuilder = Packages.java.lang.StringBuilder;
let builder = new StringBuilder("M8Test");
builder.append(" JavaScript");
assertEquals("constructor and instance method", "M8Test JavaScript", builder.toString());

let rootBuilder = new java.lang.StringBuilder("java package root");
assertEquals("Java package root", "java package root", rootBuilder.toString());

assertEquals("Java varargs call", "item:3.0", Packages.java.lang.String.format("%s:%s", "item", 3));
assertEquals("Java varargs with no values", "literal", Packages.java.lang.String.format("literal"));
let boxedInteger = Packages.java.lang.Integer.valueOf("3");
assertEquals("typed integer in Java varargs", "item:3", Packages.java.lang.String.format("%s:%d", "item", boxedInteger));
let varargsNumberTypeMismatch = false;
try {
    Packages.java.lang.String.format("%d", 3);
} catch (error) {
    varargsNumberTypeMismatch = String(error).indexOf("IllegalFormatConversionException") >= 0;
}
if (!varargsNumberTypeMismatch) {
    throw new Error("JavaScript Number should not be assumed to satisfy an integer varargs format");
}
assertEquals("Java enum constant", "SECONDS", Packages.java.util.concurrent.TimeUnit.SECONDS.name());
assertEquals("Java enum method", 2000, Packages.java.util.concurrent.TimeUnit.SECONDS.toMillis(2));

let nullObjectHash = Packages.java.lang.System.identityHashCode(null);
assertEquals("explicit null reference", 0, nullObjectHash);
assertEquals("explicit null test", true, Packages.java.util.Objects.isNull(null));
assertEquals("undefined is not a null JVM reference", false, Packages.java.util.Objects.isNull(undefined));

let caughtJavaException = false;
try {
    Packages.java.lang.Integer.parseInt("not-an-integer");
} catch (error) {
    caughtJavaException = String(error).indexOf("NumberFormatException") >= 0
        || String(error).indexOf("not-an-integer") >= 0;
}
if (!caughtJavaException) {
    throw new Error("Java exception was not catchable with its message");
}

let LayoutParams = Packages.android.widget.FrameLayout.LayoutParams;
if (LayoutParams === null || LayoutParams === undefined) {
    throw new Error("nested Android class lookup failed");
}

let systemTime = Packages.java.lang.System.currentTimeMillis();
if (systemTime <= 0) {
    throw new Error("static method did not return a positive timestamp");
}
if (Packages.java.lang.Integer.MAX_VALUE <= 0) {
    throw new Error("static field lookup failed");
}

let nullableStrings = $arrays.arrayOfNulls(Packages.java.lang.String, 2);
assertEquals("nullable JVM array size", 2, nullableStrings.length);
if (nullableStrings[0] !== null) {
    throw new Error("nullable JVM array did not contain null");
}

let strings = $arrays.arrayOf(Packages.java.lang.String, "first", "second");
assertEquals("reference JVM array", "second", strings[1]);

let byteValues = $arrays.byteArrayOf(1, 2);
let shortValues = $arrays.shortArrayOf(1, 2);
let intValues = $arrays.intArrayOf(1, 2);
let emptyIntValues = $arrays.intArrayOf();
let longValues = $arrays.longArrayOf(1, 2);
let charValues = $arrays.charArrayOf("x", "y");
let booleanValues = $arrays.booleanArrayOf(true, false);
let floatValues = $arrays.floatArrayOf(1.0, 2.0);
let doubleValues = $arrays.doubleArrayOf(1.0, 2.0);
assertEquals("byte array", 2, byteValues.length);
assertEquals("short array", 2, shortValues.length);
assertEquals("int array", 2, intValues.length);
assertEquals("empty Kotlin Int vararg", 0, emptyIntValues.length);
assertEquals("long array", 2, longValues.length);
assertEquals("char array", "y", String.fromCharCode(charValues[1]));
assertEquals("boolean array", false, booleanValues[1]);
assertEquals("float array", 2, floatValues.length);
assertEquals("double array", 2, doubleValues.length);

let list = $iterables.mutableListOf("first");
list.add("second");
assertEquals("host mutable List", "second", list.get(1));
assertEquals("Kotlin List vararg with multiple values", 3, $iterables.listOf("a", "b", "c").size());

let set = $iterables.setOf("a", "a");
assertEquals("host Set de-duplicates", 1, set.size());

let map = $maps.mutableMapOf($maps.pairOf("count", 2));
let multipleEntries = $maps.mutableMapOf($maps.pairOf("a", 1), $maps.pairOf("b", 2));
let emptyMap = $maps.mutableMapOf();
map.put("label", "ready");
assertEquals("host Map numeric value", 2, Number(map.get("count")));
assertEquals("host Map string value", "ready", map.get("label"));
assertEquals("Kotlin Map vararg with multiple pairs", 2, multipleEntries.size());
assertEquals("empty Kotlin Map vararg", 0, emptyMap.size());

let sequence = $sequences.sequenceOf(1, 2, 3);
let sequenceList = $sequences.toList(sequence);
assertEquals("host Sequence conversion", 3, sequenceList.size());

let rawIntArray = $arrays.intArrayOf(3, 1, 2);
let wrappedIntArray = $objectWrappers.wrapIntArray(rawIntArray);
assertEquals("wrapped primitive array size", 3, wrappedIntArray.getOrigin().length);
wrappedIntArray.sort(0, wrappedIntArray.getOrigin().length);
assertEquals("typed wrapper sorts origin", "[1, 2, 3]", wrappedIntArray.contentToString());
wrappedIntArray.set(0, 7);
if (!wrappedIntArray.contains(7) || rawIntArray[0] !== 7) {
    throw new Error("typed wrapper did not operate on its origin array");
}

let rawList = $iterables.mutableListOf("first", "second");
let wrappedList = $objectWrappers.wrapMutableList(rawList);
assertEquals("wrapped collection size", 2, wrappedList.getSize());
wrappedList.reverse();
assertEquals("mutable wrapper updates origin", "second", rawList.get(0));

let genericWrapper = $objectWrappers.wrap(new Packages.java.lang.StringBuilder("generic"));
if (typeof genericWrapper.getOrigin !== "function") {
    throw new Error("generic wrapper does not expose its generic origin contract");
}

let callbackCalled = false;
let runnable = new Packages.java.lang.Runnable(function () {
    callbackCalled = true;
});
runnable.run();
if (!callbackCalled) {
    throw new Error("Java Runnable did not invoke JavaScript callback");
}

let kotlinFunctionCalled = false;
$logger.withContext(context => {
    kotlinFunctionCalled = context !== null;
});
if (!kotlinFunctionCalled) {
    throw new Error("Kotlin Function1 callback did not receive its argument");
}

$logger.info("javascript-template-jvm-interop:passed");
