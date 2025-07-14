/**
 * 不同路径：计算从左上角 (0,0) 到右下角 (m-1,n-1) 有多少种不同的路径
 * @param {number} m - 网格行数
 * @param {number} n - 网格列数
 * @return {number} - 不同路径的总数
 */
function uniquePaths(m, n) {
  // 1. 先创建一个 dp 数组，也就是表格，用于缓存数据
  const dp = Array.from({ length: m }, () => new Array(n).fill(null));

  function helper(i, j) {
    // 边界的处理
    if (i < 0 || j < 0) return 0;

    // 起点，满足以下条件，说明要么是第一行，要么是第一列
    if (i === 0 || j === 0) return 1;

    if (dp[i][j] !== null) return dp[i][j];

    // 代码走到这一步，说明没有，我们需要递归计算，并且在计算的时候缓存结果
    dp[i][j] = helper(i - 1, j) + helper(i, j - 1);
    return dp[i][j];
  }

  return helper(m - 1, n - 1);
}

console.log(uniquePaths(3, 2)); // 3
console.log(uniquePaths(3, 7)); // 28
