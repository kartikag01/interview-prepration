function memoize(callback, resolver) {
    let cache = {};
  
    function getCacheKey(args) {
      if(resolver) {
        return resolver(...args);
      }
      return JSON.stringify(args);
    }
    
    function memo(...args) {
      let key = getCacheKey(args);
      
      // remember this, cache[key] can be undefined
      if (cache.hasOwnProperty(key)) {
        return cache[key];
      }
      cache[key] = callback.call(this, ...args);
      return cache[key];
    }
  
    memo.clear = function (){
      cache = {};
    };
  
    memo.delete = function(...args){
      delete cache[getCacheKey(args)];
    };
  
    memo.has = function(...args){
      return Boolean(cache[getCacheKey(args)]);
    }
  
    return memo;
  }
  
  // Do not edit the line below.
  exports.memoize = memoize;
  