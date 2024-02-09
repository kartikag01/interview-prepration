function curry(callback) {
    const curriedCallback = (...args) => {
      if(args.length === 0) {
        return callback();
      }
      return (...otherArgs) => {
        if(otherArgs.length === 0) {
          return callback(...args);
        }
        return curriedCallback(...args, ...otherArgs);
      };
    };
    return curriedCallback;
  }
  
  // Do not edit the line below.
  exports.curry = curry;


const cSum = a => b => b ? cSum(a + b) : a;
console.log(cSum(5)(6)(1)(21)());


const sum = (...items) => items.reduce((a,b) => a + b, 0);

const curriedSum = curry(sum);
console.log(sum(5,6,10,11,2,3434));
console.log(curriedSum(5)(6)(10)(123)());


function curr(a) {
  return function(b) {
    return function(c) {
      return function(d) {
        return a+b+c+d;
      }
    }
  }
}

const newSum = (a,b,c,d) => a+b+c+d;
const newCSum = curr()