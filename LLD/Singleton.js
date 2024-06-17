class Database {

    constructor() {
        this.connection = null;
    }

    // NOTE
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    connect() {
        this.connection = 'Connected';
    }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();

console.log(db1 === db2);

db1.connect();

console.log(db1.connection);
console.log(db2.connection);