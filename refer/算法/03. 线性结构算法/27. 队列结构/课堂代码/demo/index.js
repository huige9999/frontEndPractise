class Queue {
  constructor(...args) {
    this.queue = [...args];
  }
  enqueue(...item) {
    return this.queue.push(...item);
  }
  dequeue() {
    return this.queue.shift();
  }
  size() {
    return this.queue.length;
  }
  isEmpty() {
    return this.size() === 0;
  }
  front() {
    return this.isEmpty() ? undefined : this.queue[0];
  }
  back() {
    return this.isEmpty() ? undefined : this.queue[this.size() - 1];
  }
}


// 测试用力
const queue = new Queue(1, 2, 3, 4, 5);
console.log(queue.size()); // 5
console.log(queue.front()); // 1
console.log(queue.back()); // 5
queue.enqueue(6, 7, 8);
console.log(queue.size()); // 8