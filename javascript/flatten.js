function flatten(value) {
    if(!value || typeof value !== 'object') {
      return value;
    }
    if(Array.isArray(value)) {
      return flattenArray(value);
    }
    if(typeof value === "object") {
      return flattenObject(value);
    }
  }
  
  function flattenArray(array) {
    return array.reduce((acc, curr) => acc.concat(flatten(curr)) , []);
  }
  
  function flattenObject(object) {
    let newObject = {};
  
    for(let key of Object.keys(object)) {
      let value = object[key];
      let flattenValue = flatten(value);
      if(!value || typeof value !== 'object') {
        newObject[key] = flattenValue;
      } else if (Array.isArray(value)) {
        newObject[key] = flattenValue;
      } else if (typeof object === "object") {
        newObject = {...newObject, ...flattenValue};
      }
    }
    
    return newObject;
  }
  
  // Do not edit the line below.
  exports.flatten = flatten;
  