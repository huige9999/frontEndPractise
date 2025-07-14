function fibonacciMemo(n) {
  // 首先创建一个 memo 数组作为缓存
  const memo = new Array(n + 1).fill(null);

  function helper(k) {
    if (k < 2) return k;

    // 接下来就从缓存里面去找结果
    // 如果不等于 null，说明这一位的斐波那契数是之前计算过的
    // 直接从缓存中去获取即可
    if (memo[k] !== null) return memo[k];

    // 在计算的同时，做了缓存
    memo[k] = helper(k - 1) + helper(k - 2);

    return memo[k];
  }

  return helper(n);
}
console.log(fibonacciMemo(0));
console.log(fibonacciMemo(1));
console.log(fibonacciMemo(5));
console.log(fibonacciMemo(10));
