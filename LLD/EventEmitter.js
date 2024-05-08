class EventEmitter {

    constructor() {
        this.subscriptions = {};
    }

    /**
     * @param {string} eventName
     * @param {Function} callback
     * @return {Object}
     */
    subscribe(eventName, callback) {
        this.subscriptions[eventName] = (this.subscriptions[eventName] || []).concat(callback);
        return {
            unsubscribe: () => {
                let subEvents = this.subscriptions[eventName];
                subEvents.splice(subEvents.indexOf(callback), 1);
            }
        };
    }

    /**
     * @param {string} eventName
     * @param {Array} args
     * @return {Array}
     */
    emit(eventName, args = []) {
        let callbacks = (this.subscriptions[eventName] || []);
        return callbacks.map(callback => callback(...args)) || [];
    }
}


const emitter = new EventEmitter();
// Subscribe to the onClick event with onClickCallback
function onClickCallback() { console.log("onClickCallback"); return 99 }
const sub = emitter.subscribe('onClick', onClickCallback);
// const sub2 = emitter.subscribe('onClick', onClickCallback);
emitter.emit('onClick'); // [99]
sub.unsubscribe(); // undefined
emitter.emit('onClick'); // []
