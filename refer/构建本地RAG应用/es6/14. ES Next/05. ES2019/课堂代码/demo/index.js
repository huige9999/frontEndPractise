// const arr = [1, [2, [3, [4]], 5]];
// console.log(arr.flat());
// console.log(arr.flat(2));
// console.log(arr.flat(Infinity)); // 无限展开，最终变成一维数组

// let arr = [1, 2, 3, 4, 5];
// arr = arr.map((x) => [x, x * 2, x * 3]);
// console.log(arr.flat());

// arr = arr.flatMap((x) => [x, [x * 2], x * 3]);
// console.log(arr);

// arr = arr.map((x) => [x, [x * 2], x * 3]);
// console.log(arr.flat(Infinity));

// const str = "   Hello World   ";
// console.log(str.trimStart());
// console.log(str.trimEnd());

// try {
// } catch {
//   console.log("捕获到异常");
// }

// let obj = {
//   name: "zhangsan",
//   age: 20,
// };
// console.log(Object.entries(obj));

// const arr = [
//   ["name", "zhangsan"],
//   ["age", 20],
// ];
// console.log(Object.fromEntries(arr));

// const m = new Map([
//   ["name", "张三"],
//   ["age", 20],
//   ["gender", "男"],
// ]);
// console.log(Object.fromEntries(m));

// const sym = Symbol("这是一个简单的Symbol");
// console.log(sym.description);

// function example() {
//   // 这是一个注释
//   return "Hello, world!";
// }

// console.log(example.toString());
/*
function example() {
  // 这是一个注释
  return "Hello, world!";
}
*/

// const obj = { name: "Alice", age: 25 };
// // 将一个 JSON 对象转为字符串
// const jsonString = JSON.stringify(obj);
// console.log(jsonString);

const str = "Hello\u2028World"; // 包含特殊字符的字符串
const jsonstr = JSON.stringify(str); // 转为 JSON 字符串
console.log(jsonstr); // "Hello World"
