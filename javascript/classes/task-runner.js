function TaskRunner(concurrency) {
    this.concurrency = concurrency;
    this.waitingQ = [];
    this.running = 0;
    this.next = this.next.bind(this);
}

TaskRunner.prototype.push = function (task) {
    if (this.running < this.concurrency) {
        this.running++;
        task().then(this.next);
    } else {
        this.waitingQ.push(task);
    }
};

TaskRunner.prototype.next = function () {
    this.running--;
    if (this.waitingQ.length > 0) {
        this.push(this.waitingQ.shift());
    }
};


let task = new TaskRunner(1);

task.push(task1);
task.push(task2);
task.push(task3);
task.push(task4);
task.push(task5);


// TASK
function task1() {
    console.log('task 1');
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, 1000);
    });
}

function task2() {
    console.log('task 2');
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, 2000);
    });
}

function task3() {
    console.log('task 3');
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, 2500);
    });
}

function task4() {
    console.log('task 4');
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, 1500);
    });
}

function task5() {
    console.log('task 5');
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, 1000);
    });
}