function deepEquals(valueOne, valueTwo, print= true) {
    if(print) console.log(valueOne, valueTwo);
    
    if(typeof valueOne !== typeof valueTwo) {
      return false;
    }
    
    else if(Array.isArray(valueOne) && Array.isArray(valueTwo)) {
      return deepEqualsArray(valueOne, valueTwo);
    }
  
    else if(isObject(valueOne) && isObject(valueTwo)) {
      return deepEqualsObject(valueOne, valueTwo);
    }
  
    else if (Number.isNaN(valueOne) && Number.isNaN(valueTwo)){ 
        return true;
    }
  
    return valueOne === valueTwo;
  }
  
  function isObject(value) {
    return typeof value === 'object' && value != null && !Array.isArray(value)
  }
  
  function deepEqualsArray(one, two) {
    if(one.length !== two.length) return false;
    
    for(let i =0 ; i< one.length; i++) {
      if(!deepEquals(one[i], two[i], false)) {
        return false
      }
    }
    return true;
  }
  
  
  function deepEqualsObject(one, two) {
    if(Object.keys(one).length !== Object.keys(two).length) {
       return false;
    }
    for(let key in one) {
      // key should exist in object two also.
      if(!two.hasOwnProperty(key)){
        return false;
      }
      if(!deepEquals(one[key], two[key], false)) {
        return false;
      }  
    }
    return true;
  }
  
  
  // Do not edit the line below.
  exports.deepEquals = deepEquals;
  