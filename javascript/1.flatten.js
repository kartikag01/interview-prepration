function flatten(value) {
  if (!value || typeof value !== 'object') {
    return value;
  }
  if (Array.isArray(value)) {
    return flattenArray(value);
  }
  if (typeof value === "object") {
    return flattenObject(value);
  }
}

function flattenArray(array) {
  //NOTE: concat, since push returns a number and concat returns a array.
  return array.reduce((acc, curr) => acc.concat(flatten(curr)), []);
}

function flattenObject(object) {
  let newObject = {};

  // for (const [key, value] of Object.entries(obj)) { }
  // for (const key in object) { }

  for (let key of Object.keys(object)) {
    let value = object[key];
    let flattenValue = flatten(value);
    //NOTE:
    if (!flattenValue || typeof flattenValue !== 'object') {
      newObject[key] = flattenValue;
    } else if (Array.isArray(flattenValue)) {
      newObject[key] = flattenValue;
    } else if (typeof object === "object") {
      //NOTE: merge 2 obj
      newObject = { ...newObject, ...flattenValue };
    }
  }

  return newObject;
}

// Do not edit the line below.
exports.flatten = flatten;


const a = flatten({a: 1, b: {c: 2, d: 3, e: {f: 4, d: [1,2,3, [4, 5, [6,7]]]}}});
console.log(a);