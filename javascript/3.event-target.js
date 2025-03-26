class EventTarget {
    constructor() {
        this.eventMapping = {};
    }

    addEventListener(eventName, callback) {
        if (!this.eventMapping[eventName]) {
            this.eventMapping[eventName] = new Set();
        }
        this.eventMapping[eventName].push(callback);
    }

    removeEventListener(eventName, callback) {
        if (this.eventMapping[eventName] && this.eventMapping[eventName].has(callback)) {
            this.eventMapping[eventName].delete(callback);
        }
    }

    dispatchEvent(eventName, data) {
        if (this.eventMapping[eventName]) {
            this.eventMapping[eventName].forEach(callback => callback(data));
        }
    }
}