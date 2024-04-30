class StorageFullException extends Error {
    constructor(message: string) {
        super("StorageFullException");
    }
}

interface Storage<K, V> {
    get(key: K): V;
    set(key: K, value: V): void;
    remove(key: K): void;
}

// https://leetcode.com/problems/lru-cache/description/
class HashMapStorage<K, V> implements Storage<K, V>  {

    private map: Map<K, V>;
    private capicity: number;

    constructor(capicity: number = 2) {
        this.capicity = capicity;
        this.map = new Map<K, V>();
    }

    get(key: K): V {
        let result = this.map.get(key);
        if (result) {
            return result
        } else {
            throw new Error("Key not found");
        }
    }

    set(key: K, value: V): void {
        if (this.capicity === this.map.size) {
            throw new StorageFullException("Storage is full");
        }
        this.map.set(key, value);
    }

    remove(key: K): void {
        // console.log("HERE", this.map, this.map.size);
        // this.map[key] = null;
        // delete this.map[key];
        this.map.delete(key);
        // console.log(this.map, this.map.size);
    }
}

interface EvectionPolicy<K> {
    keyAccessed(key: K): void;
    evectKey(): void;
}

class LRUPolicy<K> implements EvectionPolicy<K> {

    private maxKeys: K[] = [];

    keyAccessed(key: K) {
        if (this.maxKeys.includes(key)) {
            this.maxKeys.splice(this.maxKeys.indexOf(key), 1);// remove from index
            this.maxKeys.push(key); // move to last
            return;
        }

        if (this.maxKeys.length < 2) {
            this.maxKeys.push(key); // latest key in last
            return;
        }

        if (this.maxKeys.length === 2) {
            this.maxKeys.shift(); // remove first
            this.maxKeys.push(key); // latest key in last
            return;
        }
    }

    evectKey(): K {
        let res = this.maxKeys.shift(); // remove first
        if (res) {
            return res;
        } else {
            throw new Error("Unexpected state. No key to evict");
        }
    }
}

class MyCache<K, V> {
    private evectionPolicy: EvectionPolicy<K>;
    private storage: Storage<K, V>;

    constructor(evectionPolicy: EvectionPolicy<K>, storage: Storage<K, V>) {
        this.evectionPolicy = evectionPolicy;
        this.storage = storage;
    }

    public get(key: K): V {
        try {
            let res = this.storage.get(key);
            this.evectionPolicy.keyAccessed(key);
            return res;
        } catch (e) {
            if (e instanceof StorageFullException) {
                console.log("StorageFullException");
            } else {
                console.log("Key not found");
            }
        }
    }

    public set(key: K, value: V): void {
        try {
            this.storage.set(key, value);
            this.evectionPolicy.keyAccessed(key);
        } catch (e) {
            console.log(e.message);
            if (e instanceof StorageFullException) {
                let keyToRemove = this.evectionPolicy.evectKey();
                if (keyToRemove == null) {
                    throw new Error("Unexpected state. Storage full and key is not evicting.");
                }
                this.storage.remove(keyToRemove);
                this.set(key, value);
                return;
            } else {
                throw e;
            }
        }
    }

    public remove(key: K): void {
        this.storage.remove(key);
        this.evectionPolicy.evectKey(key);
    }
}

function runner() {
    let storage = new HashMapStorage<number, string>(2);
    let policy = new LRUPolicy<number>();
    let cache = new MyCache<number, string>(policy, storage);

    cache.set(1, "one");
    cache.set(2, "two");
    cache.set(3, "three");

    console.log(cache.get(1));
    console.log(cache.get(2));
    console.log(cache.get(3));
}

runner();