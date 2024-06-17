import  { Worker } from 'worker_threads';

function runWorker(path, cb, workerData) {
    const worker = new Worker(path, { workerData });
    // workers can dispatch many message events, not just one, so not used Promise.
    // worker.on('message', cb.bind(null, null));
    worker.on('message', (message) => cb(message));
    worker.on('error', cb);
    worker.on('exit', (exitCode) => {
        if(exitCode === 0) {
            return null;
        }
        return cb(new Error(`Worker has stoped with code ${exitCode}`));
    });
    return worker;
}

export default runWorker;