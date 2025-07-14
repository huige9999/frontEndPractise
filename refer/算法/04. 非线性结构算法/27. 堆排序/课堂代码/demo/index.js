const {MinHeap, MaxHeap} = require("./heap.js");

const minHeap = new MinHeap();
// 来一个乱序的数列
const array = [7, 6, 3, 5, 4, 1, 2];
minHeap.heapify(array);
console.log(minHeap.getAsArray());

const maxHeap = new MaxHeap();
maxHeap.heapify(array);
console.log(maxHeap.getAsArray());
