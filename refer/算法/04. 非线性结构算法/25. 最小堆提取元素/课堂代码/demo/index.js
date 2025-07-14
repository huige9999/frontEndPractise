const MinHeap = require("./heap.js");

const minHeap = new MinHeap();
minHeap.insert(1);
minHeap.insert(2);
minHeap.insert(4);
minHeap.insert(5);
minHeap.insert(3);

console.log(minHeap.extract());
console.log(minHeap.getAsArray());
