const { MinHeap } = require("./heap.js");
const array = [36, 27, 20, 60, 55, 7, 28, 39, 67, 44, 16];

const heap = new MinHeap(); // 首先构建一个最小堆
heap.heapify(array);

const sortedArray = []; // 存储排好序后的元素
while (!heap.isEmpty()) {
  sortedArray.push(heap.extract());
}

// 上面的 while 出来之后，排序就排好了
console.log(sortedArray);
