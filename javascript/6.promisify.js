function promisify(callback) {
    return function(...args) {
        return new Promise((resolve, reject) => {
        callback.call(this, ...args, 
                      (err, val) => err ? reject(err): resolve(val)
                     );
      });
    }
  }
  
  // Do not edit the line below.
  exports.promisify = promisify;

  function adder(x, y, handleError){
    const v = x + y;
    if(typeof v !== 'number') {
        handleError(new Error("number is not define"));
    }
    return handleError(null, v);
  }
  
  const promisifyAdder = promisify(adder);
  promisifyAdder(1,2)
  .then(res => {

  });