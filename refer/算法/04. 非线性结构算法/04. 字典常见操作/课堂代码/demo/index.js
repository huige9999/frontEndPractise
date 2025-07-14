// const m = new Map();

// m.set("name", "Tom");
// m.set("age", 30);
// m.set("city", "New York");

// console.log(m);

// m.delete("city");
// console.log(m);

// console.log(m.size);

// m.set("name", "张三");
// console.log(m);

// console.log(m.get("name"));

// console.log(m.keys());
// console.log(m.values());
// console.log(m.entries());

// m.forEach((value, key) => {
//   console.log(key, value);
// });

// 1. 合并字典
// const m1 = new Map([
//   ["a", 1],
//   ["b", 2],
// ]);
// const m2 = new Map([
//   ["c", 10],
//   ["b", 20],
// ]);

// const m3 = new Map([...m2, ...m1]);
// console.log(m3);

// 2. 过滤字典
// const m1 = new Map([
//   ["a", 1],
//   ["b", 2],
//   ["c", 3],
//   ["d", 4],
// ]);
// const m2 = new Map([...m1].filter(([key, value]) => value >= 3));
// console.log(m2);

// 3. 转换字典键值
const m1 = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
  ["d", 4],
]);
const m2 = new Map([...m1].map(([key, value]) => [key, value * 2]));
console.log(m2);
