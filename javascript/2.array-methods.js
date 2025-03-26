// NOTE: no arrow function, in arrow func this is not will be having current array.
Array.prototype.myMap = function (callback) {
  if (typeof callback !== "function") {
    throw new Error("callback should be function");
  }
  let arr = [];
  for (let i = 0; i < this.length; i++) {
    arr[i] = callback.call(this, this[i], i, this)
  }
  return arr;
};

Array.prototype.myFilter = function (callback) {
  let arr = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this) === true) { // NOTE
      arr.push(this[i]);
    }
  }
  return arr;
};

Array.prototype.myReduce = function (callback, initialValue) {
  let acc = initialValue;
  for (let i = 0; i < this.length; i++) {
    if (acc != undefined) {
      acc = callback.call(this, acc, this[i], i, this);
    } else {
      acc = this[i];
    }
  }
  // NOTE: return acc.
  return acc;
};

Array.prototype.myFlat = function (depth = 1) {
  return this.reduce((acc, curr) => {
    if (depth === 0) {
      return acc.concat(curr);
    }
    // concat works better then spread operator.
    return acc.concat(
      Array.isArray(curr) ? curr.myFlat(depth - 1) : curr
    );
  }, []);
}

Array.prototype.myFlat2 = function (depth = 1) {
  let answer = [];

  arr.map((curr) => {
    if (n > 0 && Array.isArray(curr)) {
      answer.push(...curr.myFlat2(n - 1));
    } else {
      answer.push(curr);
    }
  });
  
  return answer;
}

// const inputArray = [0, 1, 2, [3, 4, [5, 6]], 7];
// console.log(inputArray.myFlat());

[1, 2, 3].concat([4, 5]) // [1,2,3,4,5]
[1, 2, 3].concat(4, 5) // [1,2,3,4,5]

// Javascript Array.push is 945x faster than Array.concat