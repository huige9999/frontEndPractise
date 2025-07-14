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

  // 重写 toString()方法，方便直接打印 CircularQueue 对象的内容
  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let result = []; // 存放队列里面的元素
    // 从 frontIndex 开始，遍历 count 个元素
    for (let i = 0; i < this.count; i++) {
      // 使用模运算获得实际的数组索引
      let index = (this.frontIndex + i) % this.maxSize;
      result.push(this.queue[index]);
    }
    return result.join(",");
  }
}

module.exports = CircularQueue;
