/**
 * ratings - 每个孩子评分的数组，例如 [1,0,2]
 */
function candy(ratings) {
  const n = ratings.length;
  // 一开始每个孩子都能分配到 1 个糖果
  const candies = new Array(n).fill(1);

  // 第一次遍历：从左往右
  for (let i = 1; i < n; i++) {
    // 当前孩子的评分高于左边的孩子
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }

  // 第二次遍历：从右往左
  for (let i = n - 2; i >= 0; i--) {
    // 当前孩子的评分高于右边的孩子
    // 当前孩子的糖果数首先在右边孩子的基础上 +1，同时还要与之前的值做比较
    // 取更大的值作为当前孩子得到的糖果数
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }

  // 代码来到这里，现在 candies 已经存储了每个孩子至少要得到的糖果数量
  // 计算出总的糖果数
  return candies.reduce((a, b) => a + b, 0);
}
console.log(candy([1, 0, 2]));
console.log(candy([1, 2, 2]));
