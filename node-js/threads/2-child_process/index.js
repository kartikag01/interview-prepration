import runWorker  from './runWorker.js'

function main() {
    let db1;
    runWorker("./task.js", (res) => {
        db1 = res;
        console.log("task1", res);
    }, );
    
    let db2;
    for (let index = 0; index < 10000; index++) {
        
    }
    
    runWorker("./task.js", (res) => {
        db2 = res;
        console.log("Task2", res);
    });
    
    setTimeout(() => {
        
        console.log(db1 === db2);
        
        db1.connect(); 
        
        console.log(db1.connection);
        console.log(db2.connection);
    }, 5000);
}

main()