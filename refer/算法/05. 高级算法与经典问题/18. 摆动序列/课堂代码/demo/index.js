/**
 * nums - 整数数组
 */
function wiggleMaxLength(nums) {
  // 如果数组长度小于2，直接返回数组长度，因为只有一个数字或者两个不同数字的序列本身就是摆动序列
  if (nums.length < 2) return nums.length;

  let preDiff = 0; // 用来记录上一次相邻两个数字的插值
  let count = 1; // 当前摆动序列的长度，至少为1

  // 遍历数组里面所有的数，从第二个数开始
  for (let i = 1; i < nums.length; i++) {
    // 1. 先计算插值
    const diff = nums[i] - nums[i - 1];

    // 如果 diff > 0 && preDiff <= 0，说明当前出现了正差，前一个差值要么是负数，要么是0（一开始还未确定方向的情况）
    // diff < 0 && preDiff >= 0，说明当前出现了负差，前一个差值要么是正数，要么是0（一开始还未确定方向的情况）
    if ((diff > 0 && preDiff <= 0) || (diff < 0 && preDiff >= 0)) {
      count++; // 符合摆动条件，摆动计数器+1
      preDiff = diff; // 更新差值
    }
  }

  return count;
}
console.log(wiggleMaxLength([1, 7, 4, 9, 2, 5]));
console.log(wiggleMaxLength([1, 17, 5, 10, 13, 15, 10, 5, 16, 8]));
console.log(wiggleMaxLength([1, 2, 3, 4, 5, 6, 7, 8, 9]));
