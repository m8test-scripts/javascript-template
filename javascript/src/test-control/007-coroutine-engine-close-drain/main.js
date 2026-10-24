const scope = $coroutines.newScope(null);
const timer = $script.getThreads().getMain().getTimer();

scope.launch(function(context) {
  context.setDispatcher(function(dispatchers) { return dispatchers.getIO(); });
}, null, function(current) {
  $logger.info("coroutine:javascript:engine-close-work-started");
  java.lang.Thread.sleep(5500);
  $logger.info("coroutine:javascript:engine-close-cleanup");
}).invokeOnCompletion(function(error) {
  $logger.info("coroutine:javascript:engine-close-completion");
});

timer.setTimeout(function(params) {
  $script.getEngine().close();
  $logger.info("coroutine:javascript:engine-close-returned");
}, 100);
