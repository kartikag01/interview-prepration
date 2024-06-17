interface Employee {
    name: string;
    id: number;
    isManager: boolean;
    getUniqueId: () => string;
}


class EmployeeImpl implements Employee {
    constructor(public name: string, public id: number, public isManager: boolean = false) {
        this.id = id;
        this.name = name;
        this.isManager = isManager;
    }

    getUniqueId(): string {
        return `${this.id}-${this.name}`;
    }
}


interface VendingMachine {
    insetCoin: (Coin: Coin) => void;
    buy: (item: Item) => void;
    getRefund: () => void;
    reset: () => void;
}

interface Coin {
    value: number;
}

interface Item {
    price: number;
}

class VendingMachineImpl implements VendingMachine {
    constructor(public coins: Coin[], public items: Item[]) {
        this.coins = coins;
        this.items = items;
    }

    insetCoin(coin: Coin): void {
        this.coins.push(coin);
    }

    buy(item: Item): void {
        this.items.push(item);
    }

    getRefund(): void {
        this.coins = [];
    }

    reset(): void {
        this.coins = [];
        this.items = [];
    }
}

enum Directions {
    Up,
    Down,
    Left,
    Right
}

enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}


/// E-Com

class Item {
    constructor(public name: string, public price: number) {
        this.name = name;
        this.price = price;
    }
}

class ShoppingCart {
    private items: Item[] = [];

    addItem(item: Item): void {
        this.items.push(item);
    }

    removeItem(item: Item): void {
        this.items.splice(this.items.indexOf(item), 1);
    }

    getItems(): Item[] {
        return this.items;
    }

    getTotalPrice(): number {
        return this.items.reduce((total, item) => total + item.price, 0);
    }
}

class Payment {
    private shoppingCart: ShoppingCart;

    constructor(shoppingCart: ShoppingCart) {
        this.shoppingCart = shoppingCart;
    }

    pay(paymentMethod: PaymentMethod): void {
        paymentMethod.pay(this.shoppingCart.getTotalPrice());
    }
}

class Order {
    payment: Payment;
    shoppingCart: ShoppingCart;

    constructor(payment: Payment, shoppingCart: ShoppingCart) {
        this.payment = payment;
        this.shoppingCart = shoppingCart;
    }

    placeOrder(): void {
        this.payment.pay(new CreditCard());
    }
}

interface PaymentMethod {
    pay(amount: number): void;
}

class CreditCard implements PaymentMethod {
    pay(amount: number): void {
        console.log(`Paying ${amount} using Credit Card`);
    }
}