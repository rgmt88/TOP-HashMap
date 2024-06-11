function HashMap(initialSize = 10) {
    let buckets = new Array(initialSize).fill(null);
    // Track the current number of key-value pairs
    let size = 0;
    // Flag to indicate if a resize operation is underway
    let resizing = false;

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
            if (!resizing && size / buckets.length >= 0.75) {
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

function testHashMap() {
    // Initialize new HashMap
    let hm = new HashMap(3); // Start small to test resizing

    // Add some key-value pairs
    hm.set('name', 'Alice');
    hm.set('age', 30);
    hm.set('country', 'Wonderland');
    hm.set('occupation', 'Adventurer');
    hm.set('hobby', 'Exploring');

    // Output values to check correct insertion and auto-resizing
    console.log('Values:', hm.values()); // Should show ['Alice', 30, 'Wonderland', 'Adventurer', 'Exploring']

    // Test retrieval
    console.log('Get name:', hm.get('name')); // Should output 'Alice'
    console.log('Get age:', hm.get('age')); // Should output 30

    // Check presence
    console.log('Has hobby:', hm.has('hobby')); // Should output true
    console.log('Has salary:', hm.has('salary')); // Should output false

    // Test removal
    hm.remove('occupation');
    console.log('Post-removal values:', hm.values()); // Should not include 'Adventurer'

    // Check length
    console.log('Current length (should be 4):', hm.length());

    // Test all keys and entries
    console.log('All keys:', hm.keys()); // Should list all current keys
    console.log('All entries:', hm.entries()); // Should show all key-value pairs

    // Clearing the hash map
    hm.clear();
    console.log('Length after clear:', hm.length()); // Should be 0
    console.log('Entries after clear:', hm.entries()); // Should be empty
}

testHashMap();


