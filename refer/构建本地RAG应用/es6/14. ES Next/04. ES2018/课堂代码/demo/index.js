// const asyncObj = {
//   async *[Symbol.asyncIterator]() {
//     yield 1;
//     yield 2;
//     yield 3;
//   },
// };

// async function proceeAsyncData(data) {
//   for await (let item of data) {
//     console.log(item);
//   }
// }

// proceeAsyncData(asyncObj);

// /**
//  * 根据传入的页码数返回对应页码的用户数据
//  * @param {*} page 页码数
//  */
// async function fetchUser(page) {
//   // 假设每页10个用户
//   const pageSize = 10;

//   // 模拟服务器延迟
//   await new Promise((resolve) => setTimeout(resolve, 1500));

//   // 总共的用户数据
//   const totalUsers = 45;

//   // 计算当前页对应的起始值和结束值
//   const start = (page - 1) * pageSize;
//   const end = Math.min(start + pageSize, totalUsers);

//   // 如果没有更多的用户，就返回空数组
//   if (start >= totalUsers) return [];

//   // 生成当前页的用户数据
//   const users = Array.from({ length: end - start }, (_, i) => {
//     return {
//       id: start + i + 1,
//       name: `用户${start + i + 1}`,
//     };
//   });

//   return users;
// }

// // 异步生成器函数：分页获取所有的用户
// async function* fetchAllUsers() {
//   let page = 1; // 一开始从第一页开始
//   let hasMore = true; // 是否还有更多的用户数据

//   while (hasMore) {
//     // 根据当前页码拿到对应的用户数据
//     const users = await fetchUser(page);
//     if (users.length === 0) {
//       hasMore = false;
//     } else {
//       yield users;
//       page++;
//     }
//   }
// }

// async function processAllUsers() {
//   let allUsers = [];

//   for await (let users of fetchAllUsers()) {
//     console.log(`当前页的用户数据：`, users);
//     allUsers = allUsers.concat(users);
//   }

//   console.log(`所用的用户数据：`, allUsers);
// }
// processAllUsers();

// const { a, b, ...rest } = { a: 1, b: 2, c: 3, d: 4, e: 5 };
// console.log(a, b, rest); // 1 2 { c: 3, d: 4, e: 5 }

// const o1 = {
//   a: 1,
//   b: 2,
// };
// const o2 = {
//   c: 3,
//   d: 4,
// };
// const merged = { ...o1, ...o2 };
// console.log(merged);

// const regex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
// const result = regex.exec("2024-09-11");

// console.log(result);
// console.log(result.groups); // { year: '2024', month: '09', day: '11' }
// console.log(result.groups.year); // '2024' (第一组捕获到的年份)
// console.log(result.groups.month); // '09' (第二组捕获到的月份)
// console.log(result.groups.day); // '11' (第三组捕获到的日期)

// const reg = /\d+(?!px)/; //匹配数字，并且后面不是px
// console.log("123ab".match(reg)); // [ '123', index: 0, input: '123ab', groups: undefined ]

// 匹配数字，但是数字前面有$符号
// const reg = /(?<!\$)\d+/;
// console.log("100$456".match(reg)); // [ '100', index: 0, input: '100$456', groups: undefined ]

// const regExp = /\p{Script=Greek}/u;
// console.log("α".match(regExp)); // [ 'α', index: 0, input: 'α', groups: undefined ]
// console.log("a".match(regExp)); // null

// const regExp2 = /\p{Script=Han}/u;
// console.log(regExp2.test("你好")); // true

// const regExp3 = /\p{Emoji}/u;
// console.log(regExp3.test("😄")); // true

// const regex = /foo.bar/s;
// const str = "foo\nbar";
// console.log(regex.test(str)); // true

function showLoading() {
  console.log("loading...");
}

function hideLoading() {
  console.log("hide loading...");
}

// 请求数据
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5;
      if (isSuccess) {
        resolve("数据加载成功");
      } else {
        reject("数据加载失败");
      }
    }, 2000);
  });
}

function loadData() {
  showLoading();
  fetchData()
    .then((data) => {
      console.log("成功：", data);
    })
    .catch((err) => {
      console.log("失败：", err);
    })
    .finally(() => {
      // 无论请求成功还是失败都会执行
      hideLoading();
    });
}
loadData();
