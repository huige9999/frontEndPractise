/**
 * nums - 代表你在该位置可以跳跃的最大长度，例如 [2,3,1,1,4]
 */
function canJump(nums) {
  let maxReach = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;

    // 更新 maxReach，取“当前已知的最远距离”和“从当前位置能够跳到的最远距离”的最大值
    maxReach = Math.max(maxReach, i + nums[i]);

    // 接下来就看更新的 maxReach 是否到达了最后一个下标
    if (maxReach >= nums.length - 1) return true;
  }

  // 遍历结束之后，仍然没有跳到最后，返回 flase
  return false;
}

console.log(canJump([2, 3, 1, 1, 4]));
console.log(canJump([3, 2, 1, 0, 4]));
