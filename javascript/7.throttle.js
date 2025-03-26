/**
 * when first time throttleled function is called then 
 * underlying callback should run immediately.
 * if its called again before delay, then next call should be scheduled for delay ms after the last call.
 * it called multiple times, args form last call should be used.
 */
function throttle(callback, delay) {
  let timer;
  let lastCalledTime = 0;

  const throttledFunction = function (...args) {
    let delayRemaining = lastCalledTime + delay - Date.now();
    if (delayRemaining <= 0) {
      lastCalledTime = Date.now();
      callback.call(this, ...args);
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        lastCalledTime = Date.now();
        callback.call(this, ...args);
      }, delayRemaining); // <- NOTE delayRemaining
    }
  }

  throttledFunction.cancel = function () {
    clearTimeout(timer);
  }

  return throttledFunction;
}

// Do not edit the line below.
exports.throttle = throttle;