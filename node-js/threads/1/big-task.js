import { parentPort } from 'worker_threads';

function bigTask() {
    let number = 0;
    const startTime = Date.now();
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 1000000000; j++) {
            
        }
        number++;
        console.log("number =", number);
        // NOTE
        parentPort.postMessage(number);
    }
    const endTime = Date.now();
    return number;
}

bigTask();
