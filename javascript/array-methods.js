Array.prototype.myMap = function (callback) {
  // Write your code here.
  let arr = [];
  for(let i = 0 ; i < this.length ; i++) {
    arr[i] = callback.call(this, this[i], i, this)
  }
  return arr;
};

Array.prototype.myFilter = function (callback) {
  // Write your code here.
  let arr = [];
  for(let i = 0 ; i < this.length ; i++) {
    if(callback(this[i], i, this) === true) {
      arr.push(this[i]);
    }
  }
  return arr;
};

Array.prototype.myReduce = function (callback, initialValue) {
  // Write your code here.
  let acc = initialValue;
  for(let i = 0 ; i < this.length ; i++) { 
    if(acc != undefined ) {
      acc = callback.call(this, acc, this[i], i, this);
    } else {
      acc = this[i];
    }
  }
  return acc;
};


