function throttle(callback, delay) {
  let isThrottling = false;  // Tracks if we're currently throttling
  let lastArgs;              // Stores the arguments from the last call
  let lastContext;           // Stores the context (this) from the last call
  let timeoutId;             // Stores the timeout ID for canceling later

  const throttledFunction = function (...args) {
    lastArgs = args;          // Save the latest arguments
    lastContext = this;       // Save the latest context (this)

    if (!isThrottling) {
      // If not throttling, execute the callback immediately
      callback.apply(lastContext, lastArgs);
      isThrottling = true;

      // Schedule the next allowed execution after the delay
      timeoutId = setTimeout(() => {
        isThrottling = false;
        // Check if there was a new call during the delay
        if (lastArgs) {
          callback.apply(lastContext, lastArgs); // Execute with latest args and context
          lastArgs = null;  // Reset after executing
        }
      }, delay);
    }
  };

  // Add the cancel method to clear the timeout
  throttledFunction.cancel = function () {
    clearTimeout(timeoutId);  // Cancel the scheduled execution
    isThrottling = false;     // Reset throttling flag
    lastArgs = null;          // Clear saved arguments
    lastContext = null;       // Clear saved context
  };

  return throttledFunction;
}

// Sample usage example:
// const throttled = throttle(console.log, 3000);
// document.addEventListener('keypress', () => throttled(new Date().getTime()));
