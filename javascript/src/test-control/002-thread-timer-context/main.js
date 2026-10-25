const timer = $script.getThreads().getMain().getTimer();
let count = 0; let interval = 0;
let timeoutArgs = false; let immediateDone = false; let worker = false; let nested = false;
let workerThread = null;
let workerTimerDone = false;
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
$script.getThreads().onStart(function(thread) {
  if (!thread.isCurrent()) throw new Error("thread start isCurrent=false");
  if (thread.isMain()) throw new Error("thread start isMain=true");
  if (!thread.isAlive() || thread.isInterrupted()) throw new Error("thread start state mismatch");
  if (String(thread.getName()) !== "thread-context-worker") throw new Error("thread start name=" + thread.getName());
  $logger.info("thread-context:javascript:thread-start");
});
$script.getThreads().onExit(function(thread) {
  if (!thread.isCurrent()) throw new Error("thread exit isCurrent=false");
  if (thread.isMain()) throw new Error("thread exit isMain=true");
  if (!thread.isAlive() || thread.isInterrupted()) throw new Error("thread exit state mismatch");
  if (String(thread.getName()) !== "thread-context-worker") throw new Error("thread exit name=" + thread.getName());
  $logger.info("thread-context:javascript:thread-exit");
});
workerThread = $script.getThreads().start("thread-context-worker", function(thread) {
  thread.setBackground(true);
  if (!thread.isBackground()) throw new Error("background state was not set");
  thread.getTimer().setImmediate(function(params) { workerTimerDone = true; $logger.info("thread-context:javascript:worker-timer"); });
  worker = true;
  $logger.info("thread-context:javascript:thread");
});

timer.setTimeout(function(params) {
  if (!timeoutArgs || !nested || !worker || !workerTimerDone || !immediateDone || count !== 2)
    throw new Error("timer callback state mismatch");
  if (workerThread === null || !workerThread.isAlive()) throw new Error("worker should remain alive in background");
  workerThread.interrupt();
  if (!workerThread.isInterrupted()) throw new Error("interrupt state was not observable");
  workerThread.setBackground(false);
  if (workerThread.isBackground()) throw new Error("background state was not cleared");
  $logger.info("thread-context:javascript:thread-interrupt");
  $logger.info("thread-context:javascript:verified");
}, 500);
