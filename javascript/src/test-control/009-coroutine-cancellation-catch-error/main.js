const scope = $coroutines.newScope(null);
const timer = $script.getThreads().getMain().getTimer();
const source = scope.delay(10000);
let recoveryCount = 0;
const recovered = source.catchError(function(s, error) {
  recoveryCount++;
  return s.delay(0);
});
recovered.onComplete(function() {
  if (!recovered.isCancelled() || recoveryCount !== 0)
    throw new Error("catchError recovered cancellation");
  $logger.info("coroutine:javascript:catch-error-cancellation-propagated");
});
timer.setTimeout(function(params) { source.cancel("cancel source"); }, 100);
