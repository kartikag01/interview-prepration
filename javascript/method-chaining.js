class MathClass {
    constructor(initialNumber) {
        this.result = initialNumber;
    }
    add(number) {
        this.result += number;
        return this;
    }
    sub(number) {
        this.result -= number;
        return this;
    }
}

const value = new MathClass(5)
    .add(2)
    .add(2)
    .sub(3);

console.log(value)