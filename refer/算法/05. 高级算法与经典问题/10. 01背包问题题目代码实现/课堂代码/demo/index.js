/* 0-1 背包：动态规划 */
// 1. 重量的数组
// 2. 价值的数组
// 3. 背包的容量
function knapsackDP(wgt, val, cap) {
  const n = wgt.length; // 得到物品的数量

  // 接下来就初始化一个 dp 表，这个 dp 表就是一个二维数组
  const dp = new Array(n + 1).fill(0).map(() => new Array(cap + 1).fill(0));

  // 外层循环在遍历物品
  for (let i = 1; i <= n; i++) {
    // 内层循环在遍历背包容量
    for (let c = 1; c <= cap; c++) {
      if (wgt[i - 1] > c) {
        // 进入此分支，说明当前物品超过背包容量
        // 我们就不选择物品 i
        dp[i][c] = dp[i - 1][c];
      } else {
        // 当前物品没有超过背包容量，接下来就要看选不选物品i
        // 选不选取决于哪一种方案的价值更大
        dp[i][c] = Math.max(
          dp[i - 1][c],
          dp[i - 1][c - wgt[i - 1]] + val[i - 1]
        );
      }
    }
  }
  return dp[n][cap];
}
const wgt = [2, 3, 4, 5]; // 物品重量
const val = [3, 4, 5, 6]; // 物品价值
const cap = 5; // 背包容量
console.log(knapsackDP(wgt, val, cap)); // 7

const wgt2 = [10, 20, 30, 40, 50]; // 物品重量
const val2 = [50, 120, 150, 210, 240]; // 物品价值
const cap2 = 50; // 背包容量
console.log(knapsackDP(wgt2, val2, cap2)); // 270
