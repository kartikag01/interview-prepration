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