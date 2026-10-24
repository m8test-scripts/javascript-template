const scope = $coroutines.newScope(null);
const timer = $script.getThreads().getMain().getTimer();

scope.launch(function(context) {
  context.setDispatcher(function(dispatchers) { return dispatchers.getIO(); });
}, null, function(current) {
  $logger.info("coroutine:javascript:interrupt-work-started");
  java.lang.Thread.sleep(5500);
  $logger.info("coroutine:javascript:interrupt-cleanup");
}).invokeOnCompletion(function(error) {
  $logger.info("coroutine:javascript:interrupt-completion");
});

timer.setTimeout(function(params) {
  $script.interrupt();
  try {
    $coroutines.newScope(null);
    $logger.info("coroutine:javascript:interrupt-new-scope-accepted");
  } catch (error) {
    $logger.info("coroutine:javascript:interrupt-new-scope-rejected");
  }
  try {
    scope.launch(null, null, function(current) {
      $logger.info("coroutine:javascript:unexpected-post-stop-work");
    });
    $logger.info("coroutine:javascript:interrupt-new-job-accepted");
  } catch (error) {
    $logger.info("coroutine:javascript:interrupt-new-job-rejected");
  }
  try {
    $coroutines.getFlows().empty().launchIn(scope);
    $logger.info("coroutine:javascript:interrupt-new-flow-accepted");
  } catch (error) {
    $logger.info("coroutine:javascript:interrupt-new-flow-rejected");
  }
  $logger.info("coroutine:javascript:interrupt-returned");
}, 100);
