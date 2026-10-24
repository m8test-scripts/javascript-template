const timer = $script.getThreads().getMain().getTimer();
timer.setImmediate(function(params) {
  $logger.info("thread-context:javascript:timer-error");
  throw new Error("expected timer callback failure");
});
