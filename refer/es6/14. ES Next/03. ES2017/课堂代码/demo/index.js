// function Person() {
//   this.name = "张三";
//   this.age = 18;
// }
// Person.prototype.test = "test";
// Person.prototype.say = function () {
//   console.log("Hello");
// };

// const p = new Person();

// for (const key in p) {
//   console.log(key);
// }

// console.log(Object.entries(p));

// const obj = {
//   name: "张三",
//   age: 18,
// };

// console.log(Object.values(obj)); // [ '张三', 18 ]
// console.log(Object.keys(obj)); // [ 'name', 'age' ]
// console.log(Object.entries(obj)); // [ [ 'name', '张三' ], [ 'age', 18 ] ]

// console.log("5".padStart(3, "0"));
// console.log("123".padStart(10, "*"));
// console.log("123".padStart(10));

// console.log("5".padEnd(3, "0"));
// console.log("123".padEnd(10, "*"));
// console.log("123".padEnd(10), "test");

// // 商品数据
// const products = [
//   { name: "Apple", price: 1.5, stock: 120 },
//   { name: "Banana", price: 0.8, stock: 60 },
//   { name: "Watermelon", price: 5.0, stock: 10 },
//   { name: "Grapes", price: 2.7, stock: 30 },
// ];

// // 打印表头
// console.log("Product".padEnd(15) + "Price".padEnd(10) + "Stock".padEnd(10));

// // 打印表格内容
// products.forEach((product) => {
//   console.log(
//     product.name.padEnd(15) +
//       product.price.toString().padEnd(10) +
//       product.stock.toString().padEnd(10)
//   );
// });

// const obj = {
//   name: "张三",
//   age: 18,
//   // 访问器属性
//   get getAge() {
//     return this.age;
//   },
// };

// const describs = Object.getOwnPropertyDescriptors(obj);
// console.log(describs);

function foo(param1, param2) {
  // 这里的最后一个参数后允许有逗号
}

foo("a", "b");
