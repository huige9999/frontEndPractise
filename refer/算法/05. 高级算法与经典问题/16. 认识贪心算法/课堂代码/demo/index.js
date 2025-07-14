/**
 * g - 小孩数组，数字代表胃口值 [1,2,3] 3 个孩子的胃口值分别是：1,2,3
 * s - 饼干数组，数字代表尺寸 [1,2,3] 3块饼干，尺寸分别是 1,2,3
 */
function findContentChildren(g, s) {
  // 1. 先对小孩的胃口值还有饼干尺寸进行排序
  g.sort((a, b) => a - b); // 对胃口值排序
  s.sort((a, b) => a - b); // 对饼干尺寸进行排序

  let count = 0; // 记录满足孩子的数量
  let i = 0; // 孩子数组的指针
  let j = 0; // 饼干数组的指针

  // 同时遍历孩子和饼干的数组
  while (i < g.length && j < s.length) {
    if (s[j] >= g[i]) {
      count++;
      i++; // 下一个孩子
      j++; // 当前的饼干也被用了，移动到下一块饼干
    } else {
      // 因为饼干是排好序了的，直接尝试下一块饼干
      j++;
    }
  }

  return count;
}

console.log(findContentChildren([1, 2, 3], [1, 1]));
console.log(findContentChildren([1, 2], [1, 2, 3]));
