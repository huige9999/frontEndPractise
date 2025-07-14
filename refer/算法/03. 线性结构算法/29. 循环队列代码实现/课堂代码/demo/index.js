class CircularQueue {
  constructor(maxSize = 10) {
    this.maxSize = maxSize;
    this.queue = new Array(maxSize);
    // 队首指针
    this.frontIndex = 0;
    // 队列元素计数
    this.count = 0;
  }

  // 一些辅助方法：size、isEmpty、isFull
  size() {
    return this.count;
  }
  isEmpty() {
    return this.count === 0;
  }
  isFull() {
    return this.count === this.maxSize;
  }

  // 新元素入队
  enqueue(item) {
    if (this.isFull()) {
      // 进入此分支，说明队列已满
      throw new Error("队列已满");
    }

    // 计算新元素应该存储的索引位置
    let index = (this.frontIndex + this.count) % this.maxSize;
    this.queue[index] = item;
    this.count++;
  }

  // 元素出队
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    // 取出队首的元素
    let item = this.queue[this.frontIndex];
    this.queue[this.frontIndex] = undefined;
    // 更新存储队首位置的变量
    this.frontIndex = (this.frontIndex + 1) % this.maxSize;
    this.count--;
    return item;
  }

  // 获取队首的元素，但是不移除
  front() {
    return this.isEmpty() ? undefined : this.queue[this.frontIndex];
  }

  // 获取队尾的元素，但是不移除
  // 队尾元素的索引计算公式：(frontIndex + count - 1) % maxSize
  back() {
    if (this.isEmpty()) return undefined;
    let index = (this.frontIndex + this.count - 1) % this.maxSize;
    return this.queue[index];
  }

  clear() {
    // 清空队列，全部还原
    this.queue = new Array(this.maxSize);
    this.frontIndex = 0;
    this.count = 0;
  }

  print() {
    // 显示当前队列信息
    // 1. 当前数组里面的元素  2. 元素的正确顺序
    console.log(this.queue);
    // 还需要显示元素正确的顺序
    for (let i = 0; i < this.count; i++) {
      // 计算正确的下标，然后打印出来
      let index = (this.frontIndex + i) % this.maxSize;
      console.log(this.queue[index] + " ");
    }
  }
}

// 测试用例
let queue = new CircularQueue(5);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
queue.enqueue(5); // 入队5，此时队列已满
console.log("Queue size:", queue.size()); // 5
console.log("队列是否为空?", queue.isEmpty()); // false
console.log("队列是否已满?", queue.isFull()); // true
console.log("队首元素:", queue.front()); // 1
console.log("队尾元素:", queue.back()); // 5
queue.dequeue(); // 出队1
queue.dequeue(); // 出队2
queue.print(); // [empty, empty, 3, 4, 5]
queue.enqueue(6); // 入队6
queue.enqueue(7); // 入队7
queue.print(); // [6, 7, 3, 4, 5]
