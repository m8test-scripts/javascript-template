# Public API script evidence matrix

Scope: methods consumed by JavaScript scripts in this project’s Test Control suite. Each direct declaration is listed separately. An inherited declaration is counted once globally; if a parent or another child has a passing behavioral test, this project does not need a duplicate case for every child. This matrix contains only this project’s script-facing evidence.

Inventory: 23 public interfaces; 155 direct `@Keep` method declarations.

| Declaring interface | Method | Local fixture(s) | Evidence status |
|---|---|---|---|
| `CancellableContinuation` | `isActive` | — | no fixture call found |
| `CancellableContinuation` | `isCompleted` | — | no fixture call found |
| `CancellableContinuation` | `isCancelled` | `009-coroutine-cancellation-catch-error`, `010-coroutine-cancellation-composition` | verified: 010 assertion + passing run |
| `CancellableContinuation` | `resume` | — | no fixture call found |
| `CancellableContinuation` | `resumeWithException` | — | no fixture call found |
| `CancellableContinuation` | `cancel` | `003-coroutine-thread-context`, `009-coroutine-cancellation-catch-error`, `010-coroutine-cancellation-composition` | verified: 010 assertion + passing run |
| `CancellableContinuation` | `invokeOnCancellation` | — | no fixture call found |
| `CoroutineContext` | `setDispatcher` | `004-coroutine-close-drain`, `005-coroutine-error-drain`, `006-coroutine-interrupt-drain`, `007-coroutine-engine-close-drain`, `008-coroutine-natural-finish-drain` | candidate: call found; assertion not method-audited |
| `CoroutineContext` | `setName` | — | no fixture call found |
| `CoroutineContext` | `getName` | — | no fixture call found |
| `CoroutineContext` | `setExceptionHandler` | — | no fixture call found |
| `CoroutineContext` | `setJob` | — | no fixture call found |
| `CoroutineContext` | `newJob` | — | no fixture call found |
| `CoroutineContext` | `newSupervisorJob` | — | no fixture call found |
| `CoroutineDispatchers` | `getDefault` | — | no fixture call found |
| `CoroutineDispatchers` | `getAndroidMain` | — | no fixture call found |
| `CoroutineDispatchers` | `getScriptMain` | — | no fixture call found |
| `CoroutineDispatchers` | `getUnconfined` | — | no fixture call found |
| `CoroutineDispatchers` | `getIO` | `004-coroutine-close-drain`, `005-coroutine-error-drain`, `006-coroutine-interrupt-drain`, `007-coroutine-engine-close-drain`, `008-coroutine-natural-finish-drain` | candidate: call found; assertion not method-audited |
| `CoroutineScope` | `getCoroutineScope` | — | no fixture call found |
| `CoroutineScope` | `setCoroutineScope` | — | no fixture call found |
| `CoroutineScope` | `cancel` | `003-coroutine-thread-context`, `009-coroutine-cancellation-catch-error`, `010-coroutine-cancellation-composition` | verified: 010 assertion + passing run |
| `CoroutineScope` | `delay` | `003-coroutine-thread-context`, `009-coroutine-cancellation-catch-error`, `010-coroutine-cancellation-composition` | verified: 010 assertion + passing run |
| `CoroutineScope` | `launch` | `003-coroutine-thread-context`, `004-coroutine-close-drain`, `005-coroutine-error-drain`, `006-coroutine-interrupt-drain`, `007-coroutine-engine-close-drain`, `008-coroutine-natural-finish-drain` | candidate: call found; assertion not method-audited |
| `CoroutineScope` | `async` | — | no fixture call found |
| `CoroutineScope` | `_async` | `003-coroutine-thread-context` | candidate: call found; assertion not method-audited |
| `CoroutineScope` | `withContext` | `002-jvm-interop`, `003-coroutine-thread-context` | candidate: call found; assertion not method-audited |
| `CoroutineScope` | `withTimeout` | `010-coroutine-cancellation-composition` | verified: 010 assertion + passing run |
| `CoroutineScope` | `withTimeoutOrNull` | `010-coroutine-cancellation-composition` | verified: 010 assertion + passing run |
| `CoroutineScope` | `isActive` | — | no fixture call found |
| `CoroutineScope` | `cancellableDeferred` | — | no fixture call found |
| `CoroutineScope` | `awaitAll` | — | no fixture call found |
| `CoroutineScope` | `loop` | `010-coroutine-cancellation-composition` | verified: 010 assertion + passing run |
| `CoroutineScope` | `loopWithTimeout` | `010-coroutine-cancellation-composition` | verified: 010 assertion + passing run |
| `CoroutineScope` | `loopEach` | — | no fixture call found |
| `CoroutineScope` | `loopEachWithTimeout` | — | no fixture call found |
| `CoroutineScope` | `joinAll` | — | no fixture call found |
| `CoroutineScope` | `resolve` | `003-coroutine-thread-context`, `010-coroutine-cancellation-composition` | verified: 010 assertion + passing run |
| `CoroutineScope` | `reject` | — | no fixture call found |
| `CoroutineStarts` | `getDefault` | — | no fixture call found |
| `CoroutineStarts` | `getLazy` | — | no fixture call found |
| `CoroutineStarts` | `getAtomic` | — | no fixture call found |
| `CoroutineStarts` | `getUndispatched` | — | no fixture call found |
| `Coroutines` | `getDispatchers` | — | no fixture call found |
| `Coroutines` | `callSuspend` | — | no fixture call found |
| `Coroutines` | `newScope` | `003-coroutine-thread-context`, `004-coroutine-close-drain`, `005-coroutine-error-drain`, `006-coroutine-interrupt-drain`, `007-coroutine-engine-close-drain`, `008-coroutine-natural-finish-drain`, `009-coroutine-cancellation-catch-error`, `010-coroutine-cancellation-composition` | candidate: call found; assertion not method-audited |
| `Coroutines` | `wrapScope` | — | no fixture call found |
| `Coroutines` | `wrapDeferred` | — | no fixture call found |
| `Coroutines` | `wrapJob` | — | no fixture call found |
| `Coroutines` | `getFlows` | `003-coroutine-thread-context`, `006-coroutine-interrupt-drain` | candidate: call found; assertion not method-audited |
| `Deferred` | `then` | `010-coroutine-cancellation-composition` | verified: 010 assertion + passing run |
| `Deferred` | `_then` | — | no fixture call found |
| `Deferred` | `catchError` | `009-coroutine-cancellation-catch-error`, `010-coroutine-cancellation-composition` | verified: 010 assertion + passing run |
| `Deferred` | `onError` | `003-coroutine-thread-context`, `010-coroutine-cancellation-composition` | verified: 010 assertion + passing run |
| `Deferred` | `onSuccess` | `003-coroutine-thread-context`, `010-coroutine-cancellation-composition` | verified: 010 assertion + passing run |
| `Deferred` | `onComplete` | `003-coroutine-thread-context`, `009-coroutine-cancellation-catch-error`, `010-coroutine-cancellation-composition` | verified: 010 assertion + passing run |
| `Deferred` | `getOrigin` | `002-jvm-interop` | candidate: call found; assertion not method-audited |
| `DisposableHandle` | `dispose` | — | no fixture call found |
| `Job` | `start` | `002-thread-timer-context` | candidate: call found; assertion not method-audited |
| `Job` | `isCancelled` | `009-coroutine-cancellation-catch-error`, `010-coroutine-cancellation-composition` | verified: 010 assertion + passing run |
| `Job` | `isActive` | — | no fixture call found |
| `Job` | `isCompleted` | — | no fixture call found |
| `Job` | `cancel` | `003-coroutine-thread-context`, `009-coroutine-cancellation-catch-error`, `010-coroutine-cancellation-composition` | verified: 010 assertion + passing run |
| `Job` | `toDeferred` | — | no fixture call found |
| `Job` | `invokeOnCompletion` | `004-coroutine-close-drain`, `005-coroutine-error-drain`, `006-coroutine-interrupt-drain`, `007-coroutine-engine-close-drain`, `008-coroutine-natural-finish-drain` | candidate: call found; assertion not method-audited |
| `ChannelResult` | `isSuccess` | `003-coroutine-thread-context` | candidate: call found; assertion not method-audited |
| `ChannelResult` | `isFailure` | — | no fixture call found |
| `ChannelResult` | `isClosed` | — | no fixture call found |
| `SendChannel` | `send` | — | no fixture call found |
| `SendChannel` | `trySend` | `003-coroutine-thread-context` | candidate: call found; assertion not method-audited |
| `SendChannel` | `isClosedForSend` | — | no fixture call found |
| `Flow` | `collect` | — | no fixture call found |
| `Flow` | `launchIn` | `006-coroutine-interrupt-drain` | candidate: call found; assertion not method-audited |
| `Flow` | `first` | — | no fixture call found |
| `Flow` | `firstOrNull` | — | no fixture call found |
| `Flow` | `last` | — | no fixture call found |
| `Flow` | `lastOrNull` | — | no fixture call found |
| `Flow` | `single` | — | no fixture call found |
| `Flow` | `singleOrNull` | — | no fixture call found |
| `Flow` | `fold` | — | no fixture call found |
| `Flow` | `reduce` | — | no fixture call found |
| `Flow` | `toList` | `002-jvm-interop`, `003-coroutine-thread-context` | candidate: call found; assertion not method-audited |
| `Flow` | `count` | — | no fixture call found |
| `Flow` | `none` | — | no fixture call found |
| `Flow` | `any` | — | no fixture call found |
| `Flow` | `all` | — | no fixture call found |
| `Flow` | `timeout` | `003-coroutine-thread-context` | candidate: call found; assertion not method-audited |
| `Flow` | `debounce` | `003-coroutine-thread-context` | candidate: call found; assertion not method-audited |
| `Flow` | `sample` | `003-coroutine-thread-context` | candidate: call found; assertion not method-audited |
| `Flow` | `buffer` | `003-coroutine-thread-context` | candidate: call found; assertion not method-audited |
| `Flow` | `filter` | — | no fixture call found |
| `Flow` | `filterNot` | — | no fixture call found |
| `Flow` | `filterIsInstance` | — | no fixture call found |
| `Flow` | `filterNotNull` | — | no fixture call found |
| `Flow` | `map` | `003-coroutine-thread-context` | candidate: call found; assertion not method-audited |
| `Flow` | `mapNotNull` | — | no fixture call found |
| `Flow` | `withIndex` | — | no fixture call found |
| `Flow` | `onEach` | — | no fixture call found |
| `Flow` | `runningFold` | — | no fixture call found |
| `Flow` | `runningReduce` | — | no fixture call found |
| `Flow` | `take` | — | no fixture call found |
| `Flow` | `takeWhile` | — | no fixture call found |
| `Flow` | `chunked` | — | no fixture call found |
| `Flow` | `catch` | — | no fixture call found |
| `Flow` | `_catch` | `003-coroutine-thread-context` | candidate: call found; assertion not method-audited |
| `Flow` | `onCompletion` | `003-coroutine-thread-context` | candidate: call found; assertion not method-audited |
| `Flow` | `flowOn` | — | no fixture call found |
| `Flow` | `distinctUntilChanged` | — | no fixture call found |
| `Flow` | `distinctUntilChangedBy` | — | no fixture call found |
| `FlowCollector` | `emit` | `003-coroutine-thread-context` | candidate: call found; assertion not method-audited |
| `Flows` | `of` | `003-coroutine-thread-context` | candidate: call found; assertion not method-audited |
| `Flows` | `from` | — | no fixture call found |
| `Flows` | `_from` | — | no fixture call found |
| `Flows` | `empty` | `006-coroutine-interrupt-drain` | candidate: call found; assertion not method-audited |
| `Flows` | `interval` | `003-coroutine-thread-context` | candidate: call found; assertion not method-audited |
| `Flows` | `fromCallback` | `003-coroutine-thread-context` | candidate: call found; assertion not method-audited |
| `Flows` | `create` | `003-coroutine-thread-context` | candidate: call found; assertion not method-audited |
| `Flows` | `wrap` | `002-jvm-interop` | candidate: call found; assertion not method-audited |
| `ProducerScope` | `awaitClose` | `003-coroutine-thread-context` | candidate: call found; assertion not method-audited |
| `ProducerScope` | `close` | `003-coroutine-thread-context`, `004-coroutine-close-drain`, `007-coroutine-engine-close-drain` | candidate: call found; assertion not method-audited |
| `Daemon` | `start` | `002-thread-timer-context` | candidate: call found; assertion not method-audited |
| `Daemon` | `stop` | — | no fixture call found |
| `Daemon` | `addLifecycleListener` | — | no fixture call found |
| `Daemon` | `removeLifecycleListener` | — | no fixture call found |
| `DaemonConfig` | `onStart` | `002-thread-timer-context` | candidate: call found; assertion not method-audited |
| `DaemonConfig` | `onStop` | — | no fixture call found |
| `DaemonLifecycleListener` | `onStart` | `002-thread-timer-context` | candidate: call found; assertion not method-audited |
| `DaemonLifecycleListener` | `onStop` | — | no fixture call found |
| `NewThread` | `getTimer` | `002-thread-timer-context`, `003-coroutine-thread-context`, `004-coroutine-close-drain`, `004-thread-timer-error`, `005-coroutine-error-drain`, `006-coroutine-interrupt-drain`, `007-coroutine-engine-close-drain`, `009-coroutine-cancellation-catch-error`, `010-coroutine-cancellation-composition` | candidate: call found; assertion not method-audited |
| `NewThread` | `createDaemon` | — | no fixture call found |
| `NewThread` | `setBackground` | — | no fixture call found |
| `NewThread` | `isBackground` | — | no fixture call found |
| `Thread` | `isAlive` | — | no fixture call found |
| `Thread` | `isInterrupted` | — | no fixture call found |
| `Thread` | `interrupt` | `006-coroutine-interrupt-drain` | candidate: call found; assertion not method-audited |
| `Thread` | `join` | — | no fixture call found |
| `Thread` | `getName` | — | no fixture call found |
| `Thread` | `isMain` | — | no fixture call found |
| `Thread` | `isCurrent` | — | no fixture call found |
| `Threads` | `start` | `002-thread-timer-context` | candidate: call found; assertion not method-audited |
| `Threads` | `onStart` | `002-thread-timer-context` | candidate: call found; assertion not method-audited |
| `Threads` | `onExit` | `002-thread-timer-context` | candidate: call found; assertion not method-audited |
| `Threads` | `sleep` | `004-coroutine-close-drain`, `005-coroutine-error-drain`, `006-coroutine-interrupt-drain`, `007-coroutine-engine-close-drain`, `008-coroutine-natural-finish-drain` | candidate: call found; assertion not method-audited |
| `Threads` | `getMain` | `002-thread-timer-context`, `003-coroutine-thread-context`, `004-coroutine-close-drain`, `004-thread-timer-error`, `005-coroutine-error-drain`, `006-coroutine-interrupt-drain`, `007-coroutine-engine-close-drain`, `009-coroutine-cancellation-catch-error`, `010-coroutine-cancellation-composition` | candidate: call found; assertion not method-audited |
| `Threads` | `getUI` | — | no fixture call found |
| `Threads` | `getCurrent` | — | no fixture call found |
| `Threads` | `filter` | — | no fixture call found |
| `Timer` | `runWithThreadContext` | `002-thread-timer-context` | candidate: call found; assertion not method-audited |
| `Timer` | `setTimeout` | `002-thread-timer-context`, `003-coroutine-thread-context`, `004-coroutine-close-drain`, `005-coroutine-error-drain`, `006-coroutine-interrupt-drain`, `007-coroutine-engine-close-drain`, `009-coroutine-cancellation-catch-error`, `010-coroutine-cancellation-composition` | verified: 010 assertion + passing run |
| `Timer` | `clearTimeout` | `002-thread-timer-context` | candidate: call found; assertion not method-audited |
| `Timer` | `setInterval` | `002-thread-timer-context` | candidate: call found; assertion not method-audited |
| `Timer` | `clearInterval` | `002-thread-timer-context` | candidate: call found; assertion not method-audited |
| `Timer` | `setImmediate` | `002-thread-timer-context`, `003-coroutine-thread-context`, `004-thread-timer-error` | candidate: call found; assertion not method-audited |
| `Timer` | `clearImmediate` | `002-thread-timer-context` | candidate: call found; assertion not method-audited |
| `UIThread` | `getTimer` | `002-thread-timer-context`, `003-coroutine-thread-context`, `004-coroutine-close-drain`, `004-thread-timer-error`, `005-coroutine-error-drain`, `006-coroutine-interrupt-drain`, `007-coroutine-engine-close-drain`, `009-coroutine-cancellation-catch-error`, `010-coroutine-cancellation-composition` | candidate: call found; assertion not method-audited |

## Inherited declarations

Inherited methods are tracked by their declaring interface, not repeated for every child. A child fixture can supply the one required behavioral test.

| Declaring interface | Inheriting interface(s) | Method | Local fixture(s) | Evidence status |
|---|---|---|---|---|
| `ObjectWrapper` | `CoroutineContext`, `CoroutineScope`, `Job`, `Deferred`, `DisposableHandle`, `ChannelResult`, `Flow`, `FlowCollector` | `setOrigin` | — | no fixture call found |
| `ObjectWrapper` | `CoroutineContext`, `CoroutineScope`, `Job`, `Deferred`, `DisposableHandle`, `ChannelResult`, `Flow`, `FlowCollector` | `also` | — | no fixture call found |
| `ObjectWrapper` | `CoroutineContext`, `CoroutineScope`, `Job`, `Deferred`, `DisposableHandle`, `ChannelResult`, `Flow`, `FlowCollector` | `apply` | — | no fixture call found |
| `ObjectWrapper` | `CoroutineContext`, `CoroutineScope`, `Job`, `Deferred`, `DisposableHandle`, `ChannelResult`, `Flow`, `FlowCollector` | `let` | — | no fixture call found |
| `ObjectWrapper` | `CoroutineContext`, `CoroutineScope`, `Job`, `Deferred`, `DisposableHandle`, `ChannelResult`, `Flow`, `FlowCollector` | `run` | `002-jvm-interop` | candidate: call found; assertion not method-audited |
| `ObjectWrapper` | `CoroutineContext`, `CoroutineScope`, `Job`, `Deferred`, `DisposableHandle`, `ChannelResult`, `Flow`, `FlowCollector` | `takeIf` | — | no fixture call found |
| `ObjectWrapper` | `CoroutineContext`, `CoroutineScope`, `Job`, `Deferred`, `DisposableHandle`, `ChannelResult`, `Flow`, `FlowCollector` | `takeUnless` | — | no fixture call found |
| `OriginProvider` | `CoroutineContext`, `CoroutineScope`, `Job`, `Deferred`, `DisposableHandle`, `ChannelResult`, `Flow`, `FlowCollector` | `getOrigin` | `002-jvm-interop` | candidate: call found; assertion not method-audited |
| `Contextual` | `CoroutineContext`, `Coroutines`, `Job`, `Deferred`, `CoroutineScope`, `ProducerScope`, `Thread`, `ExistingThread`, `NewThread`, `UIThread`, `Timer`, `Threads`, `Daemon` | `getContext` | — | no fixture call found |
| `Variable` | `Coroutines`, `Threads` | `getPublicType` | — | no fixture call found |
| `Variable` | `Coroutines`, `Threads` | `getGlobalName` | — | no fixture call found |
| `Variable` | `Coroutines`, `Threads` | `isPrefixRequired` | — | no fixture call found |
| `Variable` | `Coroutines`, `Threads` | `isSuffixRequired` | — | no fixture call found |
| `Closeable` | `Coroutines`, `Thread`, `ExistingThread`, `NewThread`, `UIThread`, `Timer`, `Threads`, `Daemon` | `close` | `003-coroutine-thread-context`, `004-coroutine-close-drain`, `007-coroutine-engine-close-drain` | candidate: call found; assertion not method-audited |
| `Closeable` | `Coroutines`, `Thread`, `ExistingThread`, `NewThread`, `UIThread`, `Timer`, `Threads`, `Daemon` | `isClosed` | — | no fixture call found |
| `Closeable` | `Coroutines`, `Thread`, `ExistingThread`, `NewThread`, `UIThread`, `Timer`, `Threads`, `Daemon` | `createChild` | — | no fixture call found |
| `Closeable` | `Coroutines`, `Thread`, `ExistingThread`, `NewThread`, `UIThread`, `Timer`, `Threads`, `Daemon` | `onClose` | — | no fixture call found |
| `Job` | `Deferred` | `start` | `002-thread-timer-context` | candidate: call found; assertion not method-audited |
| `Job` | `Deferred` | `isCancelled` | `009-coroutine-cancellation-catch-error`, `010-coroutine-cancellation-composition` | candidate: call found; assertion not method-audited |
| `Job` | `Deferred` | `isActive` | — | no fixture call found |
| `Job` | `Deferred` | `isCompleted` | — | no fixture call found |
| `Job` | `Deferred` | `cancel` | `003-coroutine-thread-context`, `009-coroutine-cancellation-catch-error`, `010-coroutine-cancellation-composition` | candidate: call found; assertion not method-audited |
| `Job` | `Deferred` | `toDeferred` | — | no fixture call found |
| `Job` | `Deferred` | `invokeOnCompletion` | `004-coroutine-close-drain`, `005-coroutine-error-drain`, `006-coroutine-interrupt-drain`, `007-coroutine-engine-close-drain`, `008-coroutine-natural-finish-drain` | candidate: call found; assertion not method-audited |
| `CoroutineScope` | `ProducerScope` | `getCoroutineScope` | — | no fixture call found |
| `CoroutineScope` | `ProducerScope` | `setCoroutineScope` | — | no fixture call found |
| `CoroutineScope` | `ProducerScope` | `cancel` | `003-coroutine-thread-context`, `009-coroutine-cancellation-catch-error`, `010-coroutine-cancellation-composition` | candidate: call found; assertion not method-audited |
| `CoroutineScope` | `ProducerScope` | `delay` | `003-coroutine-thread-context`, `009-coroutine-cancellation-catch-error`, `010-coroutine-cancellation-composition` | candidate: call found; assertion not method-audited |
| `CoroutineScope` | `ProducerScope` | `launch` | `003-coroutine-thread-context`, `004-coroutine-close-drain`, `005-coroutine-error-drain`, `006-coroutine-interrupt-drain`, `007-coroutine-engine-close-drain`, `008-coroutine-natural-finish-drain` | candidate: call found; assertion not method-audited |
| `CoroutineScope` | `ProducerScope` | `async` | — | no fixture call found |
| `CoroutineScope` | `ProducerScope` | `_async` | `003-coroutine-thread-context` | candidate: call found; assertion not method-audited |
| `CoroutineScope` | `ProducerScope` | `withContext` | `002-jvm-interop`, `003-coroutine-thread-context` | candidate: call found; assertion not method-audited |
| `CoroutineScope` | `ProducerScope` | `withTimeout` | `010-coroutine-cancellation-composition` | candidate: call found; assertion not method-audited |
| `CoroutineScope` | `ProducerScope` | `withTimeoutOrNull` | `010-coroutine-cancellation-composition` | candidate: call found; assertion not method-audited |
| `CoroutineScope` | `ProducerScope` | `isActive` | — | no fixture call found |
| `CoroutineScope` | `ProducerScope` | `cancellableDeferred` | — | no fixture call found |
| `CoroutineScope` | `ProducerScope` | `awaitAll` | — | no fixture call found |
| `CoroutineScope` | `ProducerScope` | `loop` | `010-coroutine-cancellation-composition` | candidate: call found; assertion not method-audited |
| `CoroutineScope` | `ProducerScope` | `loopWithTimeout` | `010-coroutine-cancellation-composition` | candidate: call found; assertion not method-audited |
| `CoroutineScope` | `ProducerScope` | `loopEach` | — | no fixture call found |
| `CoroutineScope` | `ProducerScope` | `loopEachWithTimeout` | — | no fixture call found |
| `CoroutineScope` | `ProducerScope` | `joinAll` | — | no fixture call found |
| `CoroutineScope` | `ProducerScope` | `resolve` | `003-coroutine-thread-context`, `010-coroutine-cancellation-composition` | candidate: call found; assertion not method-audited |
| `CoroutineScope` | `ProducerScope` | `reject` | — | no fixture call found |
| `SendChannel` | `ProducerScope` | `send` | — | no fixture call found |
| `SendChannel` | `ProducerScope` | `trySend` | `003-coroutine-thread-context` | candidate: call found; assertion not method-audited |
| `SendChannel` | `ProducerScope` | `isClosedForSend` | — | no fixture call found |
| `Thread` | `ExistingThread`, `NewThread`, `UIThread` | `isAlive` | — | no fixture call found |
| `Thread` | `ExistingThread`, `NewThread`, `UIThread` | `isInterrupted` | — | no fixture call found |
| `Thread` | `ExistingThread`, `NewThread`, `UIThread` | `interrupt` | `006-coroutine-interrupt-drain` | candidate: call found; assertion not method-audited |
| `Thread` | `ExistingThread`, `NewThread`, `UIThread` | `join` | — | no fixture call found |
| `Thread` | `ExistingThread`, `NewThread`, `UIThread` | `getName` | — | no fixture call found |
| `Thread` | `ExistingThread`, `NewThread`, `UIThread` | `isMain` | — | no fixture call found |
| `Thread` | `ExistingThread`, `NewThread`, `UIThread` | `isCurrent` | — | no fixture call found |

## Limits and gaps

- Candidate detection matches method names in script source and does not prove receiver type or assertion; review the cited scenario before counting it as coverage.
- Only the 010 timeout/cancellation/loop/composed-wait slice has a method-level expected-log assertion and a recorded passing run in this matrix. Other fixture invocations remain candidates until their assertions and execution results are audited per method.
- Methods without a local fixture call remain individual gaps. Record an observation gap only after a suitable test boundary has been attempted and cannot observe the behavior reliably.
- The 010 case intentionally does not assert `CancellableContinuation.invokeOnCancellation` cleanup because cancellation during script shutdown raced with teardown.
