import runWorker  from './runWorker.js'

function main() {
    runWorker("./big-task.js", (res) => {
        console.log("res from big task", res);
    });
    
    setTimeout(() => {

    }, 100000);
}

main()