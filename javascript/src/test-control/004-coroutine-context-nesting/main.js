const scope = $coroutines.newScope(null);
const timer = $script.getThreads().getMain().getTimer();
const captured = "javascript-nested";
var otherTaskProgress = false;
timer.setTimeout(function(params) { otherTaskProgress = true; $logger.info("nest:javascript:other-task-progressed"); }, 50);
scope.launch(function(context) { context.setDispatcher(function(dispatchers) { return dispatchers.getIO(); }); }, null, function(outer) {
  if (String(captured) !== "javascript-nested") throw new Error("outer capture unavailable");
  $logger.info("nest:javascript:outer-started");
  scope.launch(function(context) { context.setDispatcher(function(dispatchers) { return dispatchers.getScriptMain(); }); }, null, function(inner) {
    if (String(captured) !== "javascript-nested") throw new Error("nested capture unavailable");
    $logger.info("nest:javascript:inner-callback");
  });
  if (String(captured) !== "javascript-nested") throw new Error("outer capture not restored");
  $logger.info("nest:javascript:outer-resumed");
});
scope.delay(200).onSuccess(function(value) {
  if (!otherTaskProgress || String(captured) !== "javascript-nested") throw new Error("delay state mismatch");
  $logger.info("nest:javascript:delay-resumed");
});
timer.setTimeout(function(params) { $logger.info("nest:javascript:gate"); scope.cancel("done"); }, 1500);
