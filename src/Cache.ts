import NodeCache from 'node-cache';

export default class Cache {
    private cache;
    constructor(private ttlSeconds = null) {
        if (ttlSeconds === null) ttlSeconds = 9999999;
        this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
    }

    /**
     * Gets value from cache
     * @param key Key used for cache
     * @param storeFunction Optional function parameter which sets the data if the key doesnt exist. If ommitted, undefined is returned
     */
    // eslint-disable-next-line
    get(key: string, storeFunction?: Function) {
        const value = this.cache.get(key);
        if (value) {
            return value;
        }

        if (storeFunction === undefined) {
            return undefined;
        }

        return storeFunction().then(result => {
            this.cache.set(key, result);
            return result;
        });
    }

    /**
     * Saves value to cache
     * @param key key to set
     * @param data data to set
     */
    // eslint-disable-next-line
    save(key: string, data: any): void {
        this.cache.set(key, data);
    }

    /**
     * Sets value to cache
     * @param key key to set
     * @param data data to set
     */
    // eslint-disable-next-line
    set(key: string, data: any): void {
        this.cache.set(key, data);
    }

    /**
     * Deleted key from cache
     * @param key Key to delete
     */
    del(key: string): void {
        this.cache.del(key);
    }

    /**
     * Deletes all keys from cache starting with string
     * @param startStr String to check
     */
    delStartWith(startStr = ''): void {
        if (!startStr) {
            return;
        }

        const keys = this.cache.keys();
        for (const key of keys) {
            if (key.indexOf(startStr) === 0) {
                this.del(key);
            }
        }
    }

    /**
     * Flushes whole cache
     */
    flush(): void {
        this.cache.flushAll();
    }
}
