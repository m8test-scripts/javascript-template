const scope = $coroutines.newScope(null);
const timer = $script.getThreads().getMain().getTimer();
scope.launch(null, null, function(s) { $logger.info("coroutine:javascript:launch"); });
scope._async(null, null, function(s) { $logger.info("coroutine:javascript:async"); return 7; })
  .onSuccess(function(value) { $logger.info("coroutine:javascript:async-success"); });
scope.withContext(function(context) {}, function(s) { $logger.info("coroutine:javascript:with-context"); return 9; });
$coroutines.getFlows().of(1, 2).map(function(s, value) {
  $logger.info("coroutine:javascript:flow:" + value);
  return s.resolve(value * 2);
}).toList(scope).onSuccess(function(values) { $logger.info("coroutine:javascript:flow-complete"); });
scope.delay(5000).onComplete(function() { $logger.info("coroutine:javascript:cancelled-work-complete"); });
$coroutines.getFlows().create(function(s, collector) { throw new Error("flow-boom"); })
._catch(function(s, collector, error) {
  return s.launch(null, null, function(ignored) {
    if (String(error.getMessage()).indexOf("flow-boom") < 0) throw new Error("flow catch error mismatch");
    $logger.info("coroutine:javascript:flow-catch");
    collector.emit(s, 9);
  });
}).onCompletion(function(s, cause) {
  return s.launch(null, null, function(ignored) {
    $logger.info("coroutine:javascript:flow-completion:" + (cause === null));
  });
}).toList(scope).onSuccess(function(values) {
  if (values.length !== 1 || Number(values[0]) !== 9) throw new Error("flow recovered values mismatch");
  $logger.info("coroutine:javascript:flow-recovered");
});
$coroutines.getFlows().of(1, 2).buffer(0).toList(scope).onSuccess(function(values) {
  if (values.length !== 2 || Number(values[0]) !== 1 || Number(values[1]) !== 2)
    throw new Error("buffer values mismatch");
  $logger.info("coroutine:javascript:buffer-ok");
});
$coroutines.getFlows().of(1, 2).debounce(0).toList(scope).onSuccess(function(values) {
  if (values.length !== 2 || Number(values[0]) !== 1 || Number(values[1]) !== 2)
    throw new Error("debounce values mismatch");
  $logger.info("coroutine:javascript:debounce-ok");
});
$coroutines.getFlows().of(1, 2, 3).sample(100000).toList(scope).onSuccess(function(values) {
  if (values.length !== 0) throw new Error("sample values mismatch");
  $logger.info("coroutine:javascript:sample-ok");
});
$coroutines.getFlows().interval(0, 1000).timeout(1).toList(scope).onError(function(error) {
  if (!error.getMessage()) throw new Error("timeout error missing");
  $logger.info("coroutine:javascript:timeout-observed");
});
var callbackFlowCleanupCount = 0;
var callbackFlowProducer = null;
var callbackFlowAwaitCloseRegistered = false;
var callbackFlowCloseAttempts = 0;
$coroutines.getFlows().fromCallback(function(s, producer) {
  callbackFlowProducer = producer;
  return s.launch(null, null, function(ignored) {
    if (!producer.trySend(1).isSuccess() || !producer.trySend(2).isSuccess())
      throw new Error("trySend failed");
    producer.awaitClose(function() {
      callbackFlowCleanupCount++;
      $logger.info("coroutine:javascript:channel-cleanup");
    });
    callbackFlowAwaitCloseRegistered = true;
  });
}).onCompletion(function(s, cause) {
  if (callbackFlowCleanupCount !== 1)
    throw new Error("callback flow cleanup count mismatch: " + callbackFlowCleanupCount);
  $logger.info("coroutine:javascript:callback-flow-cleanup-once");
  return s.launch(null, null, function(ignored) {});
}).toList(scope).onSuccess(function(values) {
  if (values.length !== 2 || Number(values[0]) !== 1 || Number(values[1]) !== 2)
    throw new Error("callback flow values mismatch");
  $logger.info("coroutine:javascript:callback-flow-ok");
});
function closeCallbackFlowWhenReady(params) {
  if (!callbackFlowAwaitCloseRegistered) {
    if (++callbackFlowCloseAttempts > 1000)
      throw new Error("callback flow awaitClose registration timed out");
    timer.setImmediate(closeCallbackFlowWhenReady);
    return;
  }
  if (callbackFlowProducer === null || !callbackFlowProducer.close(null))
    throw new Error("callback flow producer close failed");
}
timer.setImmediate(closeCallbackFlowWhenReady);
timer.setTimeout(function(params) { $logger.info("coroutine:javascript:gate"); scope.cancel("done"); }, 1500);
