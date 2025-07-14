/**
 * n - 斐波那契的第 n 项
 */
function fibonacci(n) {
  if (n < 2) {
    return n;
  }

  // 接下来我们需要一个 dp 数组来记录状态
  const dp = new Array(n + 1);

  // 接下来做初始化
  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    // 填充表格
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}
console.log(fibonacci(0));
console.log(fibonacci(1));
console.log(fibonacci(5));
console.log(fibonacci(10));
