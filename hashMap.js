function HashMap(initialSize = 10) {
    const buckets = new Array(initialSize).fill(null);
    // Track the current number of key-value pairs
    let size = 0;

    function hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % buckets.length;
        }

        return hashCode;
    }

    function resize(newCapacity) {
        const newBuckets = new Array(newCapacity).fill(null);
        const oldBuckets = buckets;
        buckets = newBuckets;
        const oldSize = size;
        size = 0;

        let resizing = true;
        oldBuckets.forEach(bucket => {
            if (bucket) {
                bucket.forEach(([key, value]) => {
                    // Temporarily bypass the resize logic in set
                    const index = hash(key);
                    if (buckets[index] === null) {
                        buckets[index] = [];
                    }
                    buckets[index].push([key, value]);
                    size++;
                });
            }
        });
        resizing = false;
    }

    return {
        set(key, value) {
            if (! resizing && size / buckets.length >= 0.75) {
                resize(buckets.length * 2);
            }

            const index = hash(key);
            if (buckets[index] === null) {
                buckets[index] = [];
            }

            let inserted = false;
            for (let i = 0; i < buckets[index].length; i++) {
                if (buckets[index][i][0] === key) {
                    buckets[index][i][1] = value;
                    inserted = true;
                    break;
                }
            }

            if (!inserted) {
                buckets[index].push([key, value]);
                size++;
            }
        },

        get(key) {
            const index = hash(key);
            if (buckets[index] === null) {
                return null;
            }

            for (let i = 0; i < buckets[index].length; i++) {
                if (buckets[index][i][0] === key) {
                    return buckets[index][i][1];
                }
            }
            return null;
        },

        has(key) {
            const index = hash(key);
            if (buckets[index] === null) {
                return false;
            }

            for (let i = 0; i < buckets[index].length; i++) {
                if (buckets[index][i][0] === key) {
                    return true;
                }
            }
            return false;
        },

        remove(key) {
            const index = hash(key);
            if (buckets[index] === null) {
                return false;
            }

            for (let i = 0; i < buckets[index].length; i++) {
                if (buckets[index][i][0] === key) {
                    buckets[index].splice(i, 1);
                    if (buckets[index].length === 0) {
                        buckets[index] = null;
                    }
                    return true;
                }
            }
            return false;
        },

        length() {
            let count = 0;
            for (let i = 0; i < buckets.length; i++) {
                if (buckets[i] !== null) {
                    count += buckets[i].length;
                }
            }
            return count;
        },

        clear() {
            buckets.fill(null);    
        },

        keys() {
            let result = [];
            for (let i = 0; i < buckets.length; i++) {
                if (buckets[i] !== null) {
                    for (let j = 0; j < buckets[i].length; j++) {
                        result.push(buckets[i][j][0]);
                    }
                }
            }
            return result;
        },

        values() {
            let result = [];
            for (let i = 0; i < buckets.length; i++) {
                if (buckets[i] !== null) {
                    for (let j = 0; j < buckets[i].length; j++) {
                        result.push(buckets[i][j][1]);
                    }
                }
            }
            return result;
        },

        entries() {
            let result = [];
            for (let i = 0; i < buckets.length; i++) {
                if (buckets[i] !== null) {
                    for (let j = 0; j < buckets[i].length; j++) {
                        result.push(buckets[i][j]);
                    }
                }
            }
            return result;
        }
    }
}

// Create a new hash map
let myHashMap = new HashMap(10);

// Adding elements
myHashMap.set("name", "Alice");
myHashMap.set("age", 25);
myHashMap.set("occupation", "Engineer");
myHashMap.set("country", "Canada");

// Retrieving an element
console.log("Name:", myHashMap.get("name"));  // Should log 'Alice'

// Checking existence
console.log("Has age:", myHashMap.has("age"));  // Should log true
console.log("Has salary:", myHashMap.has("salary"));  // Should log false

// Getting all keys
console.log("Keys:", myHashMap.keys());  // Should log ['name', 'age', 'occupation', 'country']

// Getting all values
console.log("Values:", myHashMap.values());  // Should log ['Alice', 25, 'Engineer', 'Canada']

// Getting all entries
console.log("Entries:", myHashMap.entries());  // Should log [['name', 'Alice'], ['age', 25], ...

// Length of the hash map
console.log("Length:", myHashMap.length());  // Should log 4

// Removing an element
myHashMap.remove("occupation");
console.log("Post-remove length:", myHashMap.length());  // Should log 3

// Clearing the hash map
myHashMap.clear();
console.log("Post-clear length:", myHashMap.length());  // Should log 0

// Trying to retrieve a cleared key
console.log("Name post-clear:", myHashMap.get("name"));  // Should log null

