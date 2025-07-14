// console.log(typeof 1234);
// console.log(typeof 1234n);

// const num = 100;
// console.log(Boolean(num)); // true

// console.log(BigInt(Number.MAX_SAFE_INTEGER));
// console.log(2 ** 53 - 1);

// let str = "1" + "0".repeat(10);
// console.log(BigInt(str));

// console.log(5 / 2); // 2.5
// console.log(5n / 2n); // 2n 将余数舍弃掉了

// console.log(100 + 100n);
// TypeError: Cannot mix BigInt and other types, use explicit conversions

// console.log(3 > 2n); // true

// Math.pow(2n, 3);
// TypeError: Cannot convert a BigInt value to a number

// console.log(global);
// console.log(globalThis);
// console.log(globalThis === global);

// console.log(0 || 10); // 10
// console.log('' || 10);  // 10
// console.log(false || 10);  // 10
// console.log(undefined || 10);  // 10
// console.log(null || 10);  // 10

// console.log(0 ?? 10); // 0
// console.log('' ?? 10);  // ''
// console.log(false ?? 10);  // false
// console.log(undefined ?? 10);  // 10
// console.log(null ?? 10);  // 10

// const user = {
//   address: {
//     street: "123 Main St",
//   },
// };
// console.log(user?.address?.street);
// console.log(user?.contact?.email); // undefined
// console.log(user.contact.email);
// TypeError: Cannot read properties of undefined (reading 'email')

// const promises = [
//   Promise.resolve(1),
//   Promise.reject("Error"),
//   Promise.resolve(3),
// ];

// Promise.allSettled(promises).then((results) => {
//   console.log(results);
//   // 输出: [{status: 'fulfilled', value: 1}, {status: 'rejected', reason: 'Error'}, {status: 'fulfilled', value: 3}]
// });

// // 模拟API请求
// const fetchUserProfile = () =>
//   new Promise((resolve, reject) =>
//     setTimeout(() => {
//       resolve({ id: 1, name: "Alice" });
//     }, 1000)
//   );

// const fetchWeatherData = () =>
//   new Promise((resolve, reject) =>
//     setTimeout(() => {
//       reject("天气API请求失败");
//     }, 3000)
//   );

// const fetchNotifications = () =>
//   new Promise((resolve, reject) =>
//     setTimeout(() => {
//       resolve([{ id: 1, message: "新消息" }]);
//     }, 500)
//   );

// Promise.allSettled([
//   fetchUserProfile(),
//   fetchWeatherData(),
//   fetchNotifications(),
// ]).then((results) => {
//   results.forEach((result, index) => {
//     if (result.status === "fulfilled") {
//       console.log(`Promise ${index + 1} 成功`, result.value);
//     } else {
//       console.log(`Promise ${index + 1} 失败`, result.reason);
//     }
//   });

//   // 拼接拿到的结果
//   const userProfile =
//     results[0].status === "fulfilled" ? results[0].value : null;
//   const weather =
//     results[1].status === "fulfilled" ? results[1].value : "无法获取天气信息";
//   const notifications =
//     results[2].status === "fulfilled" ? results[2].value : [];

//   // 模拟在仪表盘显示数据
//   console.log("用户信息：", userProfile);
//   console.log("天气信息：", weather);
//   console.log("通知：", notifications);
// });

// const obj = {
//   2: "Second", // 整数键
//   1: "First", // 整数键
//   b: "Letter B", // 字符串键
//   a: "Letter A", // 字符串键
//   [Symbol("symbolKey")]: "Symbol Key", // 符号键
// };

// for (let key in obj) {
//   console.log(key);
// }
/*
1
2
b
a
*/

// const text = "Hello world! Welcome to JavaScript.";
// const reg = /\b(\w+)\b/g;

// const matches = text.matchAll(reg);
// console.log(matches);
// for (const m of matches) {
//   console.log(m);
// }

const text = `
  Visit us at https://www.example.com or follow our blog at http://blog.example.com!
  You can also check https://support.example.com for more information.
`;

// 更精确的正则表达式：提取完整的 URL，包括域名和路径
const regex = /(https?):\/\/([^\s/$.?#].[^\s!]*)/g;

text.matchAll(regex).forEach((m) => {
  console.log(`完整的 URL: ${m[0]}`); // 完整的匹配结果
  console.log(`协议: ${m[1]}`); // 捕获的协议 (http 或 https)
  console.log(`域名: ${m[2]}`); // 捕获的域名部分
  console.log("\n"); // 换行
});
