// const arr = [1, 2, 3, 4, 5];

// console.log(arr.toReversed());
// console.log(arr);

// console.log(arr.toSorted((a, b) => b - a));
// console.log(arr);

// console.log(arr.toSpliced(1, 3));
// console.log(arr);

// console.log(arr.with(0, 100));
// console.log(arr);

// const setA = new Set([1, 2, 3]);
// const setB = new Set([3, 4, 5]);

// console.log(setA.intersection(setB));
// console.log(setA.union(setB));
// console.log(setA.difference(setB)); // 差集，返回在 A 中但不在 B 中的元素
// console.log(setA.symmetricDifference(setB)); // 对称差集，返回在 A 或 B 中，但不会同时出现在 A 和 B 中的元素
// console.log(setA.isDisjointFrom(setB)); // 是否互斥，返回 A 和 B 是否没有交集

// let s = Symbol("foo"); // 未注册的 Symbol
// let obj = {
//   name: "bar",
// };
// let wm = new WeakMap();
// // 在ES2023之前，weakmap的键只能是对象，不能是Symbol
// // 但是在ES2023中，WeakMap的键可以是Symbol
// wm.set(s, obj);
// console.log(wm.get(s)); // { name: 'bar' }

// let s = Symbol("foo"); // 未注册的 Symbol
// let ws = new WeakSet();

// ws.add(s);
// console.log(ws.has(s)); // true

let s = Symbol.for("foo"); // 注册的 Symbol
let obj = {
  name: "bar",
};
let wm = new WeakMap();
// 注册的Symbol不能作为WeakMap的键
wm.set(s, obj);
// TypeError: Invalid value used as weak map key