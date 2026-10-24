const scope = $coroutines.newScope(null);
const timer = $script.getThreads().getMain().getTimer();

scope.launch(function(context) {
  context.setDispatcher(function(dispatchers) { return dispatchers.getIO(); });
}, null, function(current) {
  $logger.info("coroutine:javascript:error-drain-work-started");
  java.lang.Thread.sleep(5500);
  $logger.info("coroutine:javascript:error-drain-cleanup");
}).invokeOnCompletion(function(error) {
  $logger.info("coroutine:javascript:error-drain-completion");
});

timer.setTimeout(function(params) { throw new Error("script-error-drain"); }, 100);
