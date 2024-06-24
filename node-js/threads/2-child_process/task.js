import Database from "./Singleton.js";
import { parentPort } from 'worker_threads';

function task(delay = 1000) {
    const d1 = Database.getInstance(delay);
    setTimeout(() => {
        parentPort.postMessage(d1);
    }, delay);
}

task();