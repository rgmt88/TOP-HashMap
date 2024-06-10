function HashMap(size) {
    const buckets = new Array(size).fill(null);

    function hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % size;
        }

        return hashCode;
    }

    return {
        hash,
        buckets,

        set(key, value) {
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
                    for (let j = 0; j < buckets[i].length; j++) {
                        if (buckets[i][j]) {
                            count++;
                        }
                    }
                }
            }
            return count;
        }
    }
}

let map = HashMap(10);
map.set('roberto', 'martinez');
map.set('Silvia', 'Garuti');
map.set('rodrigo', 'martinez');
console.log(map.buckets);
console.log(map.get('Silvia'));
console.log(map.has('Rodrigo'));
console.log(map.length());
