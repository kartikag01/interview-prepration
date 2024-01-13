
Function.prototype.myBind = function (thisContext, ...args) {
    //   return (...newArgs) => {
    //     let random = Math.random();
    //     if(!thisContext[random]) {
    //       random = Math.random();
    //     } 
    //     thisContext[random] = this;
    //     let res = thisContext[random](...args, ...newArgs);
    //     delete thisContext[random];
    //     return res;
    //   };
    
    // problem with above approach is we are adding iterative property in keys of thisContext.
      return (...newArgs) => {
        let random = Symbol();
        thisContext[random] = this;
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
    