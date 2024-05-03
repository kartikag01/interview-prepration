class LRUCache<T, V> {
    private capacity: number;
    private cache: Map<T, V>; // NOTE:

    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key: T): V {
        if (!this.cache.has(key)) {
            return -1 as V;
        }
        let val = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, val as V);

        return this.cache.get(key) as V;
    }

    put(key: T, value: V) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        this.cache.set(key, value);
        if (this.capacity < this.cache.size) {
            // NOTE: keys().next().value returns first item's key
            this.cache.delete(this.cache.keys().next().value);
        }
    }
}