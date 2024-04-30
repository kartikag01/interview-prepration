function Activity(amount) {
    this.amount = amount;
}

Activity.prototype.setAmount = function (value) {
    if (value <= 0) {
        return false;
    }
    this.amount = value;
    return true;
}

Activity.prototype.getAmount = function () {
    return this.amount;
}

function Payment(amount, receiver) {
    //NOTE
    Activity.call(this, amount);
    // this.amount = amount;
    this.receiver = receiver;
}

Payment.prototype.setReceiver = function (receiver) {
    this.receiver = receiver;
}

Payment.prototype.getReceiver = function () {
    return this.receiver;
}

Object.setPrototypeOf(Payment.prototype, Activity.prototype);

function Refund(amount, sender) {
    Activity.call(this, amount);
    // this.amount = amount;
    this.sender = sender;
}

Refund.prototype.setSender = function (sender) {
    this.sender = sender;
}

Refund.prototype.getSender = function () {
    return this.sender;
}

Object.setPrototypeOf(Refund.prototype, Activity.prototype);

// OR check this example.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf#pseudoclassical_inheritance_using_object.setprototypeof