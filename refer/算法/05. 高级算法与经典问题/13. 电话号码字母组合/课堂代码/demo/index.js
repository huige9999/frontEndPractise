/**
 * digits - 是一个字符串，该字符串包含数字 2-9
 * returns - 所有字母的组合
 */
function letterCombinations(digits) {
  const result = []; // 存储最终结果的数组

  if (!digits || digits.length === 0) return result;

  // 数组下标和字母的对应关系
  const numMap = [
    "", // 0 - 不使用
    "", // 1 - 不使用
    "abc", // 2
    "def", // 3
    "ghi", // '4'
    "jkl", // '5'
    "mno", // '6'
    "pqrs", // '7'
    "tuv", // '8'
    "wxyz", // '9'
  ];

  /**
   * index - 当前处理到了第几位 "23" 需要先处理第 0 位 2，然后处理第 1 位就是 3
   * path - 已经组合好的字母序列
   */
  function backtrack(index, path) {
    if (index === digits.length) {
      // 进入此分支，说明所有数字都已经处理完了
      result.push(path.join("")); // 将 path 数组拼成字符串，推入到结果数组里面
      return;
    }

    const digit = digits[index]; // 2
    const letters = numMap[parseInt(digit)]; // 获取当前数字所对应的字母序列

    // 遍历字母序列
    for (let i = 0; i < letters.length; i++) {
      path.push(letters[i]); // 将一个字母推入到path中
      // 递归下一位数字
      backtrack(index + 1, path);
      path.pop(); // 移除最后一个字母
    }
  }
  backtrack(0, []);

  return result;
}
console.log(letterCombinations("23"));
console.log(letterCombinations("234"));
console.log(letterCombinations("2"));
