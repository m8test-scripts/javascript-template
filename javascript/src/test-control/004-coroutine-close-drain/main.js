const scope = $coroutines.newScope(null);
const timer = $script.getThreads().getMain().getTimer();
const closeReturned = new java.util.concurrent.atomic.AtomicBoolean(false);

scope.launch(function(context) {
  context.setDispatcher(function(dispatchers) { return dispatchers.getIO(); });
}, null, function(current) {
  $logger.info("coroutine:javascript:shutdown-work-started");
  java.lang.Thread.sleep(5500);
  if (!closeReturned.get()) throw new Error("manager close did not return before cleanup");
  $logger.info("coroutine:javascript:shutdown-cleanup-after-close");
}).invokeOnCompletion(function(error) {
  $logger.info("coroutine:javascript:shutdown-completion-after-close");
});

timer.setTimeout(function(params) {
  $coroutines.close();
  closeReturned.set(true);
  $logger.info("coroutine:javascript:shutdown-close-returned");
}, 100);
