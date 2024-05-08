// NOTE: no arrow function, in arrow func this is not will be having current array.
Array.prototype.myMap = function (callback) {
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

Array.prototype.myFlat = function () {
  return this.reduce((acc, curr) => {
    return acc.concat(
      Array.isArray(curr) ? curr.myFlat() : curr
    );
  }, []);
}

// const inputArray = [0, 1, 2, [3, 4, [5, 6]], 7];
// console.log(inputArray.myFlat());


// concat return new array
// push modify current array and returns length
