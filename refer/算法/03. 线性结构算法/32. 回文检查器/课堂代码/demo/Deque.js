class Deque {
  constructor() {
    this.frontIndex = 0; // 指向队首元素的索引
    this.backIndex = 0; // 指向队尾元素的下一个可插入的位置
    this.items = {}; // 存储双端队列里面的所有元素
  }

  // 先实现一些辅助方法：size、isEmpty、clear
  size() {
    return this.backIndex - this.frontIndex;
  }
  isEmpty() {
    return this.size() === 0;
  }
  clear() {
    this.items = {};
    this.frontIndex = 0;
    this.backIndex = 0;
  }
  // 添加到前面
  addFront(item) {
    // 1. 如果队列为空，那么添加到前端和后端的效果是一样的
    if (this.isEmpty()) {
      this.addBack(item);
      return;
    }

    // 2. 如果队列非空，并且 frontIndex > 0
    // 我们可以在 frontIndex - 1 位置添加新的元素
    if (this.frontIndex > 0) {
      this.frontIndex--;
      this.items[this.frontIndex] = item;
      return;
    }

    // 3. 如果 frontIndex === 0
    // 我们需要将所有的元素向后面移动，为索引为 0 的位置腾出空间
    for (let i = this.backIndex; i > 0; i--) {
      this.items[i] = this.items[i - 1];
    }
    // 更新队尾的索引，因为所有元素都向后移动了
    // 所以 backIndex 需要更新
    this.backIndex++;
    this.frontIndex = 0;
    this.items[this.frontIndex] = item;
  }
  // 添加到后面
  addBack(item) {
    this.items[this.backIndex] = item;
    this.backIndex++;
  }
  removeFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    // 取出队首的元素
    const result = this.items[this.frontIndex];
    // 需要删除这个元素
    delete this.items[this.frontIndex];
    this.frontIndex++;
    return result;
  }
  removeBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.backIndex--; // 现在指向队尾元素
    // 取出队尾
    const result = this.items[this.backIndex];
    delete this.items[this.backIndex];
    return result;
  }
  peekFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.frontIndex];
  }
  peekBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.backIndex - 1];
  }
  // 返回队列的字符串表示
  toString() {
    if (this.isEmpty()) {
      return "";
    }
    // 先把队首元素作为字符串的起始
    let objString = `${this.items[this.frontIndex]}`;
    // 从队首下一位遍历到队尾
    for (let i = this.frontIndex + 1; i < this.backIndex; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}

module.exports = Deque;
