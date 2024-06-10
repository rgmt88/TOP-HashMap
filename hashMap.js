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
        },

        remove(key) {
            
        }
    }
}

let map = HashMap(23);
console.log(map.set('roberto', 'martinez'));
console.log(map.set('Silvia', 'Garuti'));
console.log(map.set('rodrigo', 'martinez'));
console.log(map.buckets);
console.log(map.get('Silvia'));
console.log(map.has('Rodrigo'));
