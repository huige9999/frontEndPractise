class MySet {
  constructor() {
    this.items = {};
  }
  add(item) {
    if (!this.has(item)) {
      // 当前集合不包含item
      this.items[item] = item;
      return true;
    }
    return false;
  }
  delete(item) {
    if (this.has(item)) {
      // 当前集合包含item
      delete this.items[item];
      return true;
    }
    return false;
  }
  // 判断item是否在集合中已经存在，存在返回true，否则返回false
  has(item) {
    // 回头集合里面的每一个元素是以属性的形式挂上去了
    return Object.prototype.hasOwnProperty.call(this.items, item);
  }
  clear() {
    this.items = {};
  }
  size() {
    return Object.keys(this.items).length;
  }
  values() {
    return Object.values(this.items);
  }
}

// 测试用例
const set = new MySet();
set.add(1);
set.add(2);
set.add(3);
console.log(set.values()); // [1, 2, 3]
console.log(set.size()); // 3
set.delete(2);
console.log(set.values()); // [1, 3]
console.log(set.size()); // 2
console.log(set.has(1)); // true
console.log(set.has(2)); // false
set.clear();
console.log(set.values()); // []