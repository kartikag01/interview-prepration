
Function.prototype.myBind = function (thisContext, ...args) {
  // NOTE: arrow function will work, else do that = this;
  return (...newArgs) => {
    let random = Symbol(); // like Math.random(); but provide unique value.
    thisContext[random] = this;
    // thisContext.this(...args, ...newArgs);
    let res = thisContext[random](...args, ...newArgs);
    delete thisContext[random];
    return res;
  };
};

Function.prototype.myCall = function (thisContext, ...args) {
  return this.myBind(thisContext)(...args);
};

Function.prototype.myApply = function (thisContext, args = []) {
  return this.myBind(thisContext)(...args);
};

// Difference btw call, apply, bind ?
// -> args and bind returns function while call and apply calls functions.