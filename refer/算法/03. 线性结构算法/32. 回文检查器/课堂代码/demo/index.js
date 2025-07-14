const Deque = require("./Deque.js");

function isPalindrome(str) {
  // 防御性处理
  if (str === undefined || str === null || str.length === 0) {
    return false;
  }

  // 判断该字符串是否是回文字符串
  const deque = new Deque(); // 先创建一个双端队列
  // 将字符串全部转为小写，并且去除了空格
  const lowerStr = str.toLocaleLowerCase().split(" ").join("");
  let isEuqal = true; // 假设是回文字符串
  let firstChar = null; // 存储前面的字符
  let lastChar = null; // 存储后面的字符
  // 将字符串的每一位入队
  for (let i = 0; i < lowerStr.length; i++) {
    deque.addBack(lowerStr.charAt(i));
  }

  while (deque.size() > 1 && isEuqal) {
    // 从双端队列的队首取一个字符
    firstChar = deque.removeFront();
    // 从双端队列的队尾取一个字符
    lastChar = deque.removeBack();
    if (firstChar !== lastChar) {
      isEuqal = false;
    }
  }

  return isEuqal;
}

// 测试用例
console.log(isPalindrome("level")); // true
console.log(isPalindrome("hello")); // false
console.log(isPalindrome("奶牛产牛奶")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome("Was it a car or a cat I saw")); // true
