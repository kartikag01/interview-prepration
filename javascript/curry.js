function curry(callback) {
  const curriedCallback = (...args) => {
    if (args.length === 0) {
      return callback();
    }
    return (...otherArgs) => {
      if (otherArgs.length === 0) {
        return callback(...args); // NOTE
      }
      // NOTE: args
      return curriedCallback(...args, ...otherArgs);
    };
  };
  return curriedCallback;
}

//NOTE: Shorter Version
const cSum = a => b => b ? cSum(a + b) : a;
console.log(cSum(5)(6)(1)(21)());


const sum = (...items) => items.reduce((a, b) => a + b, 0);

const curriedSum = curry(sum);
console.log(sum(5, 6, 10, 11, 2, 3434));
console.log(curriedSum(5)(6)(10)(123)());


function curr(a) {
  return function (b) {
    return function (c) {
      return function (d) {
        return a + b + c + d;
      }
    }
  }
}

const newSum = (a, b, c, d) => a + b + c + d;
const newCSum = curr()


///// 
const sumV2 = (...args) => args.reduce((acc, curr) => acc + curr, 0);
console.log("sumV2", sumV2(1, 2, 3, 4, 5))


//////////////

let multiply = (...args) => {
  return (...newArgs) => {
    if (newArgs.length === 0) {
      return args[0];
    } else {
      return multiply(newArgs[0] * args[0]);
    }
  };
};

let a = multiply(1)(5)(); // -> 120
console.log(a);


//////////////

let multiplyV2 = (...args) => {
  let mult2 = args.reduce((acc, curr) => acc * curr, 1);
  return (...newArgs) => {
    if (newArgs.length === 0) {
      return args[0];
    } else {
      let mult = newArgs.reduce((acc, curr) => acc * curr, 1);
      return multiply(mult * mult2);
    }
  };
};

let res = multiplyV2(1)(5, 4, 6)(2, 3, 1)(); // -> 120


// //////////////
// from chat GPT
// //////////////

function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // Output: 6
console.log(curriedAdd(1, 2)(3)); // Output: 6
console.log(curriedAdd(1)(2, 3)); // Output: 6
console.log(curriedAdd(1, 2, 3)); // Output: 6