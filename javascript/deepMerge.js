// https://leetcode.ca/2023-10-09-2755-Deep-Merge-of-Two-Objects/
function deepMerge(obj1: any, obj2: any): any {
    const isObj = (obj: any) => obj && typeof obj === 'object';
    const isArr = (obj: any) => Array.isArray(obj);
    if (!isObj(obj1) || !isObj(obj2)) {
        return obj2;
    }
    if (isArr(obj1) !== isArr(obj2)) {
        return obj2;
    }
    for (const key in obj2) {
        obj1[key] = deepMerge(obj1[key], obj2[key]);
    }
    return obj1;
}
