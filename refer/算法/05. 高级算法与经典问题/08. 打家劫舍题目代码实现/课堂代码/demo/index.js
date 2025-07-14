/**
 * 打家劫舍 - 表格法 (Bottom-Up)
 * @param {number[]} nums - 每个房屋中存放的金额
 * @return {number}       - 能偷窃到的最高金额
 */
function rob(nums) {
  const n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];

  // 创建 dp 数组，用于存储偷到每间房的最高金额
  // 数组第几项就代表偷到第几间房的最大金额
  // dp[0] - 偷到第1间房
  // dp[1] - 偷到第2间房
  // .....
  const dp = new Array(n);

  function helper(i) {
    if (i < 0) return 0;

    // 如果之前已经计算过了，直接返回对应的值
    if (dp[i] !== undefined) return dp[i];

    if (i === 0) {
      dp[0] = nums[0];
      return dp[0];
    }

    if (i === 1) {
      dp[1] = Math.max(nums[0], nums[1]);
      return dp[1];
    }

    const result = Math.max(helper(i - 1), helper(i - 2) + nums[i]);
    dp[i] = result;
    return result;
  }

  return helper(n - 1);
}
console.log(rob([2, 7, 9, 3, 1])); // 12
console.log(rob([1, 2, 3, 1])); // 12
