const arr = [10, 20, 30, 40, 50];
// console.log(arr.at(0));
// console.log(arr[0]);
// console.log(arr.at(2));
// console.log(arr.at(-1));

// const str = "Hello";
// console.log(str.at(0));
// console.log(str.at(-1));

// console.log(arr[10]); // undefined
// console.log(arr.at(10)); // undefined

// class Person {
//   name = "张三";
//   age = 18;
//   sayHello() {
//     console.log(`Hello, I'm ${this.name}`);
//   }
// }
// const p = new Person();
// p.sayHello();
// p.name = "李四";
// p.sayHello();

// function Person(name, age) {
//   // 私有属性
//   var _name = name;
//   var _age = age;

//   // 私有方法
//   function privateMethod() {
//     console.log("这是一个私有的方法");
//   }

//   this.getName = function () {
//     return _name;
//   };
//   this.getAge = function () {
//     return _age;
//   };
//   this.setName = function (name) {
//     _name = name;
//   };
//   this.setAge = function (age) {
//     _age = age;
//   };
//   this.method = function () {
//     privateMethod();
//   };
// }
// var p = new Person("张三", 20);
// console.log(p.getName());
// console.log(p.getAge());
// p.method();
// p.setName("李四");
// p.setAge(22);
// console.log(p.getName());
// console.log(p.getAge());

// class Person {
//   // 私有属性
//   #name;
//   #age;

//   constructor(name, age) {
//     this.#name = name;
//     this.#age = age;
//   }

//   // 私有方法
//   #privateMethod() {
//     console.log("这是一个私有的方法");
//   }

//   get name() {
//     return this.#name;
//   }
//   get age() {
//     return this.#age;
//   }
//   set name(name) {
//     this.#name = name;
//   }
//   set age(age) {
//     this.#age = age;
//   }
//   method() {
//     this.#privateMethod();
//   }
// }
// var p = new Person("张三", 20);
// console.log(p.name);
// console.log(p.age);
// p.method();
// p.name = "李四";
// p.age = 22;
// console.log(p.name);
// console.log(p.age);
// console.log(p.#name); // 报错

// try {
//   throw new Error("出错了", { cause: "因为网络原因" });
// } catch (e) {
//   console.log(e.message);
//   console.log(e.cause);
// }

// const obj = {
//   name: "张三",
//   age: 20,
//   hasOwnProperty() {
//     return "hello";
//   },
// };
// // console.log(obj.hasOwnProperty("name")); // hello
// // const result = Object.prototype.hasOwnProperty.call(obj, "name");
// const result = Object.hasOwn(obj, "name");
// console.log(result); // true

// const regex1 = /(foo)(bar)?/;
// const regex2 = /(foo)(bar)?/d;
// const str = "abfoobarcd";
// console.log(regex1.exec(str));
// console.log(regex2.exec(str));

// const regex = /(?<first>foo)(?<second>bar)?/d;
// const match = regex.exec("abfoobarcd");
// console.log(match);
// console.log(match.indices.groups);

const reg = /(let|const|var)/d;
const code = "let x = 10";
const match = reg.exec(code);

if (match) {
  const [start, end] = match.indices[0];
  console.log(
    `高亮的位置：, ${code.slice(
      start,
      end
    )} 位于第 ${start} 到第 ${end} 个字符之间`
  );
}
