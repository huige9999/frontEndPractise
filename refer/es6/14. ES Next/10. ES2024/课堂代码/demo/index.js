// const fruits = [
//   { name: "apple", type: "pome" },
//   { name: "banana", type: "berry" },
//   { name: "cherry", type: "drupe" },
//   { name: "pear", type: "pome" },
// ];

// const groupedFruits = Object.groupBy(fruits, (f) => f.type);
// console.log(groupedFruits);

// const fruits = [
//   { name: "pineapple🍍", color: "🟡" },
//   { name: "apple🍎", color: "🔴" },
//   { name: "banana🍌", color: "🟡" },
//   { name: "strawberry🍓", color: "🔴" },
// ];
// const groupedFruits = Object.groupBy(fruits, (f) => f.color);
// console.log(groupedFruits);

// const arr = [6.1, 4.2, 6.3];
// // 按照向下取整后进行分组
// const grouped = Map.groupBy(arr, Math.floor);
// console.log(grouped);
// const grouped2 = Object.groupBy(arr, Math.floor);
// console.log(grouped2);

// const apiEndpoints = [
//   "https://api.example.com/data1",
//   "https://api.example.com/data2",
//   "https://api.example.com/data3",
// ];

// /**
//  *
//  * @param {*} apiEndpoints 数组，存放了多个API的地址
//  */
// function fetchMutipleAPIs(apiEndpoints) {
//   const { promise, resolve, reject } = Promise.withResolvers();

//   let completed = 0; // 记录已经完成的请求数量
//   const total = apiEndpoints.length; // 总请求数量
//   const results = []; // 存放结果

//   apiEndpoints.forEach((endPoint, index) => {
//     fetchDataFromURL(endPoint)
//       .then((data) => {
//         results[index] = data;
//         completed++;
//         if (completed === total) {
//           // 进入该分支，说明所有请求都已经完成
//           // 然后再手动的resolve整体的结果
//           resolve(results);
//         }
//       })
//       .catch((e) => {
//         console.log("请求失败error:", e.message);
//       });
//   });

//   return promise;
// }

// function fetchDataFromURL(url) {
//   return new Promise((resolve, reject) => {
//     const delay = Math.random() * 2000;
//     const isSuccessful = Math.random() > 0.2; // 80%的概率请求成功
//     setTimeout(() => {
//       if (isSuccessful) {
//         resolve(`Data from ${url}`);
//       } else {
//         reject(new Error(`请求 ${url} 失败`));
//       }
//     }, delay);
//   });
// }

// fetchMutipleAPIs(apiEndpoints)
//   .then((result) => {
//     console.log("所有请求都已经完成，结果为:", result);
//   })
//   .catch((err) => {
//     console.log("请求失败", err);
//   });

// const regex = /[\p{Script=Latin}||\p{Script=Cyrillic}]/v;
// console.log(regex.test("A")); // 输出：true
// console.log(regex.test("Б")); // 输出：true
// console.log(regex.test("汉")); // 输出：false

// const regex = /[\p{Script=Latin}--\p{Lowercase_Letter}]/v;
// console.log(regex.test("A")); // 输出：true
// console.log(regex.test("a")); // 输出：false

// const regex = /[\p{Number}--\p{Numeric_Type=Numeric}]/v;
// console.log(regex.test("5")); // 输出：true
// console.log(regex.test("Ⅳ")); // 输出：false

const regex = /[[a-f]&&[d-z]]/v;
console.log(regex.test("e")); // 输出：true
console.log(regex.test("b")); // 输出：false
