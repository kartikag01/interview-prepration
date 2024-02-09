function debounce(callback, delay, immediate = false) {
    let timer;
    // arrow function will not work, since callbacks should have the `this` context of the debounced function caller
    return function (...args) {
      
      if(immediate && !timer) {
        callback.call(this, ...args);
      }
      
      clearTimeout(timer); // NOTE
      
      timer = setTimeout(() => {
        if(!immediate) {
          callback.call(this, ...args);
        }
        timer = null;
      }, delay);
    }
  }
  
  // Do not edit the line below.
  exports.debounce = debounce;

  const debounced = debounce(console.log, 3000);
  document.addEventListener('keypress', () => debounce(new Date()));