function generateArray(size) {
    return Array.from({length: size}, () => Math.floor(Math.random() * 1000))
}

Array.prototype.max = function() {
    return Math.max.apply(null, this)
}

Array.prototype.min = function() {
    return Math.min.apply(null, this)
}

Array.prototype.median = function() {
    const mid = Math.ceil(this.length / 2);
    console.log(this)
    return this.length % 2 === 0 ? (this[mid] + this[mid - 1]) / 2 : this[mid - 1]
}

function arrayParams(arr) {
    return {min: arr.min(), max: arr.max(), median: arr.median()}
}

function quickSort(arr) {
    if (arr.length < 2) return arr;
    let pivot = arr[0];
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
        pivot > arr[i] ? left.push(arr[i]) : right.push(arr[i])
    }
    return quickSort(left).concat(pivot, quickSort(right));
}

let arr = generateArray(10_000)

// console.log(arr)
//
console.log(quickSort(arr))
//
// console.log(arrayParams(arr))

Array.prototype.median.apply(this)

console.log(this)

