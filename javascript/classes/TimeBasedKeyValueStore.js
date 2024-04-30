
/**
 * https://leetcode.com/problems/time-based-key-value-store/
 */

var TimeMap = function () {
    this.data = {};
};

/** 
 * @param {string} key 
 * @param {string} value 
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function (key, value, timestamp) {
    if (!this.data[key])
        this.data[key] = [];
    this.data[key].push([timestamp, value]);
};

/** 
 * @param {string} key 
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function (key, timestamp) {
    if (this.data[key]) {
        if (this.data[key][timestamp])
            return this.data[key][timestamp];

        let items = this.data[key]; // [timestamp, value]

        let L = 0;
        let R = items.length - 1;
        let index = -1;
        while (L <= R) {
            let mid = Math.floor((L + R) / 2);
            if (items[mid][0] === timestamp) {
                index = mid;
                break;
            }
            else if (items[mid][0] < timestamp) {
                L = mid + 1;
                index = mid;
            }
            else {
                R = mid - 1;
            }
        }
        if (index === -1) {
            return "";
        }
        return this.data[key][index][1]; // value
    }
    return "";
};

/** 
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */