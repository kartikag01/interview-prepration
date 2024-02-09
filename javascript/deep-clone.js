/**
 * @template T
 * @param {T} value
 * @return {T}
 */
export default function deepClone(value) {
    if(!value) {
      return value;
    }
    if(Array.isArray(value)) {
      return value.map(_ => deepClone(_));
    }
    if(typeof value === "object") {
      let mainObj = {};
      for(let [key, val] of Object.entries(value)) {
        mainObj[key] = deepClone(val);
      }
      return mainObj;
    }
    return value;
  }