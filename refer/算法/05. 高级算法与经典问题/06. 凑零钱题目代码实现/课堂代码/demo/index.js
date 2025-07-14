/**
 * 凑零钱问题：计算凑出 amount 所需的最少硬币数
 * @param {number[]} coins - 可使用的不同面值硬币
 * @param {number} amount - 目标金额
 * @return {number} - 最少硬币数，若无法凑出则返回 -1
 */
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  
  function helper(amount){
    if(amount === 0) return 0;
    if(amount < 0) return -1;
    if(dp[amount] !== Infinity) return dp[amount];
    
    let minCoins = dp[amount];
    // 尝试每一种硬币
    for(const coin of coins){
      const subResult = helper(amount - coin);
      
      if(subResult >= 0 && subResult < minCoins){
        minCoins = subResult + 1;
      }
    }
    dp[amount] = minCoins === Infinity ? -1 : minCoins;
    return dp[amount];
  }
  
  return helper(amount);
}

console.log(coinChange([1, 2, 5], 11)); // 3
console.log(coinChange([2], 3)); // -1
console.log(coinChange([1, 5, 10], 100)); // 10
