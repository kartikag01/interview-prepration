class Car {
    constructor(model, price) {
        this.model = model;
        this.price = price;
    }
}

class CarFactory {
    createCar(model) {
        switch (model) {
            case 'civic':
                return new Car('Honda Civic', 20000);
            case 'accord':
                return new Car('Honda Accord', 25000);
            case 'odyssey':
                return new Car('Honda Odyssey', 30000);
            default:
                throw new Error('Unknown model');
        }
    }
}

const factory = new CarFactory();

const civic = factory.createCar('civic');
const accord = factory.createCar('accord');

console.log(civic.model); // Honda Civic 
console.log(accord.model); // Honda Accord