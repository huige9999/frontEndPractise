class Stack {
  constructor(...args) {
    this.stack = [...args]; // 栈内部使用数组来存储数据
  }
  push(...items) {
    return this.stack.push(...items);
  }
  pop() {
    return this.stack.pop();
  }
  size() {
    return this.stack.length;
  }
  peak() {
    return this.isEmpty() ? undefined : this.stack[this.size() - 1];
  }
  isEmpty() {
    return this.size() === 0;
  }
}

const stack = new Stack(1, 2, 3, 4, 5);
console.log(stack.pop()); // 5
console.log(stack.peak()); // 4
console.log(stack.isEmpty()); // false
console.log(stack.size()); // 4
console.log(stack.push(100, 200, 300)); // 7
console.log(stack.size()); // 7
console.log(stack.peak()); // 300
console.log(stack.pop()); // 300
console.log(stack.pop()); // 200
console.log(stack.pop()); // 100
