// let user = {
//   isLogin: true,
// };
// user.isLogin &&= "admin";
// console.log(user.isLogin); // admin

// let setting = {
//   theme: "",
// };

// // 只有 setting.theme 为假值时才会赋值
// setting.theme ||= "dark";
// console.log(setting.theme); // dark

// let x = undefined;
// x ??= "default";
// console.log(x); // default

// const str = "hello world, hello javascript";
// const newstr = str.replace(/hello/g, "hi");
// console.log(newstr);

// let newstr = str;
// while (newstr.includes("hello")) {
//   newstr = newstr.replace("hello", "hi");
// }
// console.log(newstr)

// console.log(str.replaceAll("hello", "hi"));

// const aggreErrors = new AggregateError(
//   [new Error("请求API出错"), new Error("数据库连接错误")],
//   "发生了多个错误"
// );
// console.log(aggreErrors.message);
// console.log(aggreErrors.errors);

// const p1 = Promise.reject(1);
// const p2 = Promise.reject(2);
// const p3 = Promise.reject(3);

// Promise.any([p1, p2, p3])
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//     // [AggregateError: All promises were rejected] { [errors]: [ 1, 2, 3 ] }
//   });

// // 模拟从多个 CDN 加载 jQuery
// const loadFromCDN1 = () =>
//   new Promise((resolve, reject) =>
//     setTimeout(() => reject("CDN 1 failed"), 1000)
//   );
// const loadFromCDN2 = () =>
//   new Promise((resolve) =>
//     setTimeout(() => resolve("CDN 2: Loaded jQuery"), 1500)
//   );
// const loadFromCDN3 = () =>
//   new Promise((resolve) =>
//     setTimeout(() => resolve("CDN 3: Loaded jQuery"), 2000)
//   );

// Promise.any([loadFromCDN1(), loadFromCDN2(), loadFromCDN3()])
//   .then((value) => {
//     console.log(value);
//     init();
//   })
//   .catch((err) => {
//     console.log(err);
//     // [AggregateError: All promises were rejected] { [errors]: [ 'CDN 1 failed' ] }
//   });

// function init() {
//   console.log("jQuery is ready");
// }

// const largeNum = 1_000_00_0_000;
// console.log(largeNum); // 1000000000

// let obj = {
//   name: "张三",
// };
// // 引用 obj
// // const objRef = obj;
// // 相当于创建了一个 obj 的弱引用
// const objWeakRef = new WeakRef(obj);

// // console.log(objRef); // 通过强引用访问
// console.log(objWeakRef.deref()); // 通过弱引用访问

// obj = null; // 释放 obj 的引用
// // 释放了 obj 之后，垃圾回收器就会回收 obj

// // 有可能为 undefined，这个取决于垃圾回收器何时回收 obj
// console.log(objWeakRef.deref()); // undefined

// class DOMCache {
//   constructor() {
//     this.cache = new Map();
//   }

//   addCache(id, node) {
//     // 这里在添加缓存节点的时候，使用 WeakRef 创建弱引用
//     this.cache.set(id, new WeakRef(node));
//   }
//   getCache(id) {
//     const ref = this.cache.get(id);
//     if (ref) {
//       const node = ref.deref(); // 获取到弱引用的DOM节点
//       if (node) {
//         return node;
//       }
//       // 如果没有进入上面的分支，说明节点已经被回收
//       this.cache.delete(id);
//     }
//     return null;
//   }
// }
// const domCache = new DOMCache();
// let myDiv = document.createElement("div"); // 创建DOM节点
// myDiv.id = "myDiv";

// // 缓存DOM节点
// domCache.addCache("myDiv", myDiv);
// // 之后可以从缓存中获取DOM节点
// domCache.getCache("myDiv");

// myDiv = null; // 释放DOM节点的引用
// // 释放掉之后，垃圾回收器就会在一定的时间内回收DOM节点

// class DatabaseConnection {
//   constructor(name) {
//     this.name = name;
//     this.isConnected = true;
//     console.log(`已连接至 ${this.name} 数据库`);
//   }

//   // 关闭数据库连接
//   close() {
//     this.isConnected = false;
//     console.log(`已关闭 ${this.name} 数据库`);
//   }
// }
// const databaseConnection = new DatabaseConnection("MongoDB");

// const reg = new FinalizationRegistry((heldValue) => {
//   heldValue.close();
// });

// // 需求：当 databaseConnection 实例被垃圾回收时，自动关闭数据库连接
// databaseConnection = null;

// reg.register(databaseConnection, databaseConnection);

// class Cache {
//   constructor() {
//     // 负责存储缓存数据
//     this.cache = new Map();
//     this.reg = new FinalizationRegistry((key) => {
//       // 当缓存数据被回收时，会调用这个回调函数
//       console.log(`清除缓存：${key}`);
//       this.cache.delete(key);
//     });
//   }

//   // 添加缓存
//   add(key, value) {
//     this.cache.set(key, new WeakRef(value));
//     // 注册缓存数据
//     this.reg.register(value, key);
//   }

//   // 获取缓存的值
//   get(key) {
//     const ref = this.cache.get(key);
//     if (ref) {
//       const value = ref.deref(); // 获取到弱引用的DOM节点
//       if (value) {
//         return value;
//       }
//     }
//     return null;
//   }
// }

// const javaScriptFrameworks = ["React", "Vue", "Angular"];

// // 相当于创建了一个国际化的格式化类型
// const shortUnitFormat = new Intl.ListFormat("en", {
//   style: "short",
//   type: "unit",
// });
// console.log(shortUnitFormat.format(javaScriptFrameworks));

// const narrowUnitFormatter = new Intl.ListFormat("en", {
//   style: "narrow",
//   type: "unit",
// });
// console.log(narrowUnitFormatter.format(javaScriptFrameworks));
// // Prints 'Angular React Vue'

// const longConjunctionFormatter = new Intl.ListFormat("en", {
//   style: "long",
//   type: "conjunction",
// });
// console.log(longConjunctionFormatter.format(javaScriptFrameworks));
// // Prints 'Angular, React, and Vue'

// const longDisjunctionFormatter = new Intl.ListFormat("en", {
//   style: "long",
//   type: "disjunction",
// });
// console.log(longDisjunctionFormatter.format(javaScriptFrameworks));
// // Prints 'Angular, React, or Vue'

// const longConjunctionItalianFormatter = new Intl.ListFormat("it", {
//   style: "long",
//   type: "conjunction",
// });
// console.log(longConjunctionItalianFormatter.format(javaScriptFrameworks));
// // Prints 'Angular, React e Vue'

// const longDisjunctionGermanFormatter = new Intl.ListFormat("de", {
//   style: "long",
//   type: "disjunction",
// });
// console.log(longDisjunctionGermanFormatter.format(javaScriptFrameworks));
// // Prints 'Angular, React oder Vue'

const d = new Date();

// 创建一种格式化风格
const formatStyle = new Intl.DateTimeFormat("en-US", {
  dateStyle: "short",
});
console.log(formatStyle.format(d));
