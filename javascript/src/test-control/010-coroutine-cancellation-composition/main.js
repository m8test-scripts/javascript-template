const scope = $coroutines.newScope(null);
const timeoutScope = $coroutines.newScope(null);
const nullableTimeoutScope = $coroutines.newScope(null);
const timedLoopScope = $coroutines.newScope(null);
const normalLoopScope = $coroutines.newScope(null);
const composedWaitScope = $coroutines.newScope(null);
const timer = $script.getThreads().getMain().getTimer();
let recoveryCalled = false;

timeoutScope.withTimeout(75, function(s) {
  return s.delay(1000).then(function(inner) { return inner.resolve("late"); });
}).catchError(function(s, error) {
  recoveryCalled = true;
  return s.resolve("fallback");
}).onSuccess(function() {
  throw new Error("timeout unexpectedly recovered");
}).onError(function(error) {
  if (recoveryCalled) throw new Error("timeout cancellation was recovered");
  $logger.info("coroutine:javascript:timeout-cancellation-preserved");
});

const timeoutOrNull = nullableTimeoutScope.withTimeoutOrNull(75, function(s) { return s.delay(1000); });
timeoutOrNull
  .onSuccess(function(value) {
    if (value !== null) throw new Error("withTimeoutOrNull did not return null");
    $logger.info("coroutine:javascript:timeout-or-null-ok");
  }).onError(function(error) {
    $logger.info("coroutine:javascript:timeout-or-null-error:" + error.getMessage());
  }).onComplete(function() {
    $logger.info("coroutine:javascript:timeout-or-null-complete:" + timeoutOrNull.isCancelled());
  });

let timedLoopCalls = 0;
timedLoopScope.loopWithTimeout(75, function(s) {
  timedLoopCalls++;
  return s.delay(1000).then(function(inner) { return inner.resolve(true); });
}).onError(function(error) {
  if (timedLoopCalls !== 1) throw new Error("timed loop iteration count mismatch");
  $logger.info("coroutine:javascript:loop-timeout-cancelled-wait");
});

let loopCalls = 0;
normalLoopScope.loop(function(s) {
  loopCalls++;
  $logger.info("coroutine:javascript:loop-iteration:" + loopCalls);
  return s.resolve(loopCalls < 3);
}).onComplete(function() {
  $logger.info("coroutine:javascript:loop-completed-count:" + loopCalls);
  if (loopCalls !== 3) throw new Error("loop did not finish after three iterations: " + loopCalls);
});

const composedWait = composedWaitScope.withTimeoutOrNull(500, function(s) {
  return s.delay(25).then(function(inner) { return inner.resolve(23); });
});
composedWait.onSuccess(function(value) {
  if (value === null || Number(value) !== 23)
    throw new Error("composed wait returned the wrong value");
  $logger.info("coroutine:javascript:composed-wait-ok");
}).onError(function(error) {
  $logger.info("coroutine:javascript:composed-wait-error:" + error.getMessage());
}).onComplete(function() {
  $logger.info("coroutine:javascript:composed-wait-complete:" + composedWait.isCancelled());
});

timer.setTimeout(function() {
  $logger.info("coroutine:javascript:cancellation-gate");
  scope.cancel("done");
}, 3000);
