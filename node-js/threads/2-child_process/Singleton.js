class Database {
    
    constructor() {
        this.connection = null;
    }

    // NOTE
    static getInstance(i) {
        if(!Database.instance) {
            console.log("----HERE----", i);
            Database.instance = new Database();
        }
        return Database.instance;
    }

    connect() {
        this.connection = 'Connected';
    }
}

export default Database;


// const db1 = Database.getInstance(5);
// const db2 = Database.getInstance();

// console.log(db1 === db2);

// db1.connect(); 

// console.log(db1.connection);
// console.log(db2.connection);