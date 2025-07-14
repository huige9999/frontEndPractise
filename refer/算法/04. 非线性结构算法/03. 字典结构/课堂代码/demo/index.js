class MyDictionary {
  constructor() {
    this.items = {};
  }
  // 向字典中添加新的元素
  set(key, value) {
    this.items[key] = value;
  }
  // 判断字典中是否存在某个键
  hasKey(key) {
    return Object.prototype.hasOwnProperty.call(this.items, key);
  }
  // 根据 key 来获取数据
  get(key) {
    return this.hasKey(key) ? this.items[key] : undefined;
  }
  // 一些辅助方法
  clear() {
    this.items = {};
  }
  size() {
    return this.keys().length;
  }
  isEmpty() {
    return this.size() === 0;
  }
  keys() {
    return Object.keys(this.items);
  }
  values() {
    return Object.values(this.items);
  }
  keyValues() {
    return Object.entries(this.items);
  }
  forEach(fn) {
    for (let key in this.items) {
      fn(key, this.items[key]);
    }
  }
}

// 测试用例
const dict = new MyDictionary();
dict.set("name", "Tom");
dict.set("age", 18);
dict.set("gender", "male");
console.log(dict.size()); // 3
console.log(dict.isEmpty()); // false
console.log(dict.keys());
// ["name", "age", "gender"]
console.log(dict.values());
// ["Tom", 18, "male"]
console.log(dict.keyValues());
// [["name", "Tom"], ["age", 18], ["gender", "male"]]

dict.set("name", "Jerry");
console.log(dict.get("name")); // Jerry
console.log(dict.hasKey("name")); // true

dict.forEach((key, value) => {
  console.log(`${key}: ${value}`);
});
