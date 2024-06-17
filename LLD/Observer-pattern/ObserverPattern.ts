interface Subject {
    add(o: Observer): void;
    remove(o: Observer): void;
    notify(): void;
}

interface Observer {
    update(subject: Subject): void;
}


class ConcretClassSubject implements Subject {
    observers: Observer[] = [];

    add(o: Observer): void {
        if (this.observers.indexOf(o) !== -1) {
            this.observers.push(o);
        }
    }
    remove(o: Observer): void {
        if (this.observers.indexOf(o) !== -1) {
            this.observers.splice(this.observers.indexOf(o), 1); // NOTE: splice.
        }
    }

    notify(): void {
        for (let observer of this.observers) {
            observer.update(this);
        }
    }
}