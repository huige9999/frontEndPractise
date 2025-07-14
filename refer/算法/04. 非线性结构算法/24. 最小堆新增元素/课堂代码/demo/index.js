const MinHeap = require("./heap.js");

const minHeap = new MinHeap();
minHeap.insert(2);
minHeap.insert(3);
minHeap.insert(4);
minHeap.insert(5);
minHeap.insert(1);

console.log(minHeap.getAsArray());
