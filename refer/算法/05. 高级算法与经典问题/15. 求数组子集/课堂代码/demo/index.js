/**
 * nums - 是一个数组，例如 [1,2,3]
 * returns - 所有子集的数组
 */
function subsets(nums) {
  const results = []; // 存放最终的结果
  const path = []; // 临时数组，表示当前选中的子集

  /**
   * start - 数组中每个数的下标
   */
  function backtrack(start) {
    results.push([...path]);

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  }
  backtrack(0);

  return results;
}
console.log(subsets([1,2,3]));
console.log(subsets([0]));