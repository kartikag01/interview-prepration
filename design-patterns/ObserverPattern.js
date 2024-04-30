class Subject {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(o => o !== observer);
    }

    notify(data) {
        this.observers.forEach(o => o.update(data));
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }

    update(data) {
        console.log(`${this.name} received ${data}`);
    }
}

const subject = new Subject();
const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');

subject.subscribe(observer1);
subject.subscribe(observer2);

subject.notify('Hello World');
// Observer 1 received Hello World 
// Observer 2 received Hello World

subject.unsubscribe(observer2);

subject.notify('Hello Again');
// Observer 1 received Hello Again