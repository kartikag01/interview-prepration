function deepEquals(valueOne, valueTwo) {
  if (typeof valueOne !== typeof valueTwo) {
    return false;
  }

  else if (Array.isArray(valueOne) && Array.isArray(valueTwo)) {
    return deepEqualsArray(valueOne, valueTwo);
  }

  // NOTE:
  else if (isObject(valueOne) && isObject(valueTwo)) {
    return deepEqualsObject(valueOne, valueTwo);
  }

  //NOTE:
  else if (Number.isNaN(valueOne) && Number.isNaN(valueTwo)) {
    return true;
  }

  return valueOne === valueTwo;
}

// NOTE:
function isObject(value) {
  // will not work with undefined.?
  return typeof value === 'object' && value != null && !Array.isArray(value)
}

function deepEqualsArray(one, two) {
  if (one.length !== two.length) return false;

  for (let i = 0; i < one.length; i++) {
    if (!deepEquals(one[i], two[i])) {
      return false
    }
  }
  return true;
}


function deepEqualsObject(one, two) {
  if (Object.keys(one).length !== Object.keys(two).length) {
    return false;
  }
  for (let key in one) {
    //NOTE: key should exist in object two also.
    if (!two.hasOwnProperty(key)) {
      return false;
    }
    // NOTE: check for deepEquals again.
    if (!deepEquals(one[key], two[key])) {
      return false;
    }
  }
  return true;
}


// Do not edit the line below.
exports.deepEquals = deepEquals;
