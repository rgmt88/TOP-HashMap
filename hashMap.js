function HashMap(initialSize = 10) {
    let state = {
        buckets: new Array(initialSize).fill(null),
        size: 0
    };
    let resizing = false;

    function hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % state.buckets.length;
        }

        return hashCode;
    }

    function resize(newCapacity) {
        resizing = true;
        const newBuckets = new Array(newCapacity).fill(null);
        const oldBuckets = state.buckets;
        state.buckets = newBuckets;
        state.size = 0;
        
        oldBuckets.forEach(bucket => {
            if (bucket) {
                bucket.forEach(([key, value]) => {
                    // Temporarily bypass the resize logic in set
                    const index = hash(key);
                    if (state.buckets[index] === null) {
                        state.buckets[index] = [];
                    }
                    state.buckets[index].push([key, value]);
                    state.size++;
                });
            }
        });
        resizing = false;
    }

    return {
        state,

        set(key, value) {
            if (!resizing && state.size / state.buckets.length >= 0.75) {
                resize(state.buckets.length * 2);
            }

            const index = hash(key);
            if (state.buckets[index] === null) {
                state.buckets[index] = [];
            }

            let inserted = false;
            for (let i = 0; i < state.buckets[index].length; i++) {
                if (state.buckets[index][i][0] === key) {
                    state.buckets[index][i][1] = value;
                    inserted = true;
                    break;
                }
            }

            if (!inserted) {
                state.buckets[index].push([key, value]);
                state.size++;
            }
        },

        get(key) {
            const index = hash(key);
            if (state.buckets[index] === null) {
                return null;
            }

            for (let i = 0; i < state.buckets[index].length; i++) {
                if (state.buckets[index][i][0] === key) {
                    return state.buckets[index][i][1];
                }
            }
            return null;
        },

        has(key) {
            const index = hash(key);
            if (state.buckets[index] === null) {
                return false;
            }

            for (let i = 0; i < state.buckets[index].length; i++) {
                if (state.buckets[index][i][0] === key) {
                    return true;
                }
            }
            return false;
        },

        remove(key) {
            const index = hash(key);
            if (state.buckets[index] === null) {
                return false;
            }

            for (let i = 0; i < state.buckets[index].length; i++) {
                if (state.buckets[index][i][0] === key) {
                    state.buckets[index].splice(i, 1);
                    if (state.buckets[index].length === 0) {
                        state.buckets[index] = null;
                    }
                    return true;
                }
            }
            return false;
        },

        length() {
            let count = 0;
            for (let i = 0; i < state.buckets.length; i++) {
                if (state.buckets[i] !== null) {
                    count += state.buckets[i].length;
                }
            }
            return count;
        },

        clear() {
            state.buckets.fill(null);
            state.size = 0;  
        },

        keys() {
            let result = [];
            for (let i = 0; i < state.buckets.length; i++) {
                if (state.buckets[i] !== null) {
                    for (let j = 0; j < state.buckets[i].length; j++) {
                        result.push(state.buckets[i][j][0]);
                    }
                }
            }
            return result;
        },

        values() {
            let result = [];
            for (let i = 0; i < state.buckets.length; i++) {
                if (state.buckets[i] !== null) {
                    for (let j = 0; j < state.buckets[i].length; j++) {
                        result.push(state.buckets[i][j][1]);
                    }
                }
            }
            return result;
        },

        entries() {
            let result = [];
            for (let i = 0; i < state.buckets.length; i++) {
                if (state.buckets[i] !== null) {
                    for (let j = 0; j < state.buckets[i].length; j++) {
                        result.push(state.buckets[i][j]);
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
    console.log('Buckets:', hm.state.buckets);

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
    // Check and display after clearing
    console.log('After clear - Buckets:', hm.state.buckets);
    console.log('Length after clear:', hm.length()); // Should be 0
    console.log('Entries after clear:', hm.entries()); // Should be empty
}

testHashMap();


