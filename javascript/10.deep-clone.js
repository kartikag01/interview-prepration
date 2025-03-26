/**
 * @template T
 * @param {T} value
 * @return {T}
 */
function deepClone(value) {
  if (!value) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(_ => deepClone(_)); // no concat.
  }
  if (typeof value === "object") {
    let mainObj = {};
    for (let [key, val] of Object.entries(value)) {
      mainObj[key] = deepClone(val);
    }
    return mainObj;
  }
  return value;
}


function deepClone2(ob) {
  let newObj = {};

  if (Array.isArray(ob)) {
    return ob.reduce((acc, curr) => acc.concat(deepClone2(curr)), []);
  } else if (typeof obj === "object") {
    let innerObj = {}
    for (let key in obj) {
      innerObj[key] = deepClone2(obj[key]);
    }
    return innerObj;
  }

  return newObj;
}

let obj = { a: 10, b: 30 };
for (let key in obj) {
  console.log(key);
}

// Array - off
// Object - in