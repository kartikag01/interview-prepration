interface Subject {
    add(o: Observer): void;
    remove(o: Observer): void;
    notify(): void;
}

class Stocks implements Subject {

    observers: Observer[] = [];
    name = "";
    price = 0;

    constructor(name, price = 10) {
        this.name = name;
        this.observers = [];
        this.price = price;
    }

    add(o: Observer) {
        this.observers.push(o);
    }

    remove(o: Observer) {
        let index = this.observers.indexOf(o);
        if (index === -1) {
            return console.log('Subject: Nonexistent observer.');
        }
        this.observers.splice(index, 1);
    }

    notify(oldPrice) {
        for (let observer of this.observers) {
            observer.update(this, oldPrice);
        }
    }

    updatePrice(newPrice) {
        let oldPrice = this.price;
        this.price = newPrice;
        this.notify(oldPrice);
    }
}

interface Observer {
    update(subject: Subject, newPrice: any): void;
}

class User implements Observer {

    name: string = "";

    constructor(name: string) {
        this.name = name;
    }

    update(subject: Subject, oldPrice: any): void {
        // let stock = subject as Stocks;
        console.log(`${this.name}: ${subject.name} Updated from ${oldPrice} to ${subject.price}`);
    }
}

function StockMarket() {
    let appleStock = new Stocks("Apple.co", 100);
    let googleStock = new Stocks("ABC.co", 510);

    let userObserver1 = new User("John");
    let userObserver2 = new User("Shaan");

    appleStock.add(userObserver1);
    appleStock.add(userObserver2);
    googleStock.add(userObserver2);

    appleStock.updatePrice(112);
    googleStock.updatePrice(530);
    appleStock.updatePrice(115);
}

StockMarket();