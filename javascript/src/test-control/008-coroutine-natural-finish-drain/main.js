const scope = $coroutines.newScope(null);
const mainReturned = new java.util.concurrent.atomic.AtomicBoolean(false);
const workStarted = new java.util.concurrent.CountDownLatch(1);
const drainComplete = new java.util.concurrent.atomic.AtomicBoolean(false);

scope.launch(function(context) {
  context.setDispatcher(function(dispatchers) { return dispatchers.getIO(); });
}, null, function(current) {
  $logger.info("coroutine:javascript:natural-finish-work-started");
  workStarted.countDown();
  java.lang.Thread.sleep(5500);
  if (!mainReturned.get()) throw new Error("main script did not return before cleanup");
  $logger.info("coroutine:javascript:natural-finish-cleanup");
}).invokeOnCompletion(function(error) {
  if (error === null) {
    $logger.info("coroutine:javascript:natural-finish-not-cancelled");
  } else {
    drainComplete.set(true);
    $logger.info("coroutine:javascript:natural-finish-cancelled");
  }
});

if (!workStarted.await(3, java.util.concurrent.TimeUnit.SECONDS)) {
  throw new Error("coroutine work did not start before main script returned");
}
$logger.info("coroutine:javascript:natural-finish-main-returning");
mainReturned.set(true);
