const timer = $script.getThreads().getMain().getTimer();
let count = 0; let interval = 0;
let timeoutArgs = false; let immediateDone = false; let worker = false; let nested = false;
const nestedResult = timer.runWithThreadContext(function() {
  return timer.runWithThreadContext(function() { return "nested"; });
});
if (String(nestedResult) !== "nested") throw new Error("nested context result mismatch: " + String(nestedResult));
nested = true;
timer.setImmediate(function(params) { immediateDone = true; $logger.info("thread-context:javascript:immediate"); });
timer.setTimeout(function(params) {
  if (params.length !== 2 || String(params[0]) !== "payload" || params[1] !== null)
    throw new Error("timeout arguments mismatch");
  timeoutArgs = true;
  $logger.info("thread-context:javascript:timeout");
}, 100, "payload", null);
const cancelledTimeout = timer.setTimeout(function(params) { throw new Error("cleared timeout ran"); }, 1000);
timer.clearTimeout(cancelledTimeout);
const cancelledImmediate = timer.setImmediate(function(params) { throw new Error("cleared immediate ran"); });
timer.clearImmediate(cancelledImmediate);
interval = timer.setInterval(function(params) {
  if (params.length !== 1 || String(params[0]) !== "tick") throw new Error("interval arguments mismatch");
  count++;
  if (count === 2) {
    timer.clearInterval(interval);
    $logger.info("thread-context:javascript:interval");
  }
}, 75, "tick");
$script.getThreads().onStart(function(thread) { $logger.info("thread-context:javascript:thread-start"); });
$script.getThreads().onExit(function(thread) { $logger.info("thread-context:javascript:thread-exit"); });
$script.getThreads().start("thread-context-worker", function(thread) { worker = true; $logger.info("thread-context:javascript:thread"); });

timer.setTimeout(function(params) {
  if (!timeoutArgs || !nested || !worker || !immediateDone || count !== 2)
    throw new Error("timer callback state mismatch");
  $logger.info("thread-context:javascript:verified");
}, 500);
