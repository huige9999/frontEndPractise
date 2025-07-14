/**
 * 还原字符串 s 所能拼出的所有有效 IP 地址
 * @param {string} s - 只包含数字的字符串  例如 "25525511135"
 * @return {string[]} - 所有可能的有效 IP 地址
 */
function restoreIpAddresses(s) {
  const results = [];

  /**
   * start - 当前字符串处理到的下标
   * segmentCount - 已经切分了多少段
   * path - 暂存已经切好的段，是一个数组，例如 ["255", "255"]
   */
  function backtrack(start, segmentCount, path) {
    if (segmentCount === 4) {
      // 说明已经切好了4段
      if (start === s.length) {
        // 说明字符串也刚好用完了
        results.push(path.join("."));
      }
      return;
    }

    // IP的每一段最多3个字符
    for (let length = 1; length <= 3; length++) {
      // 如果剩下的字符不足 length 个，直接 break 进行剪枝
      if (start + length > s.length) break;

      // 代码来到这里，说明剩余字符是足够的
      const segment = s.substring(start, start + length);

      // 如果这一段的长度大于 1 并且该分段有前导 0，无效的，进行剪枝
      if (segment.length > 1 && segment[0] === "0") break;

      // 接下来还需要检查数的范围
      // 如果超出了有效的数字范围，也需要进行剪枝
      const num = parseInt(segment, 10);
      if (num > 255) break;

      // 代码来到这里，说明当前分段是有效的
      path.push(segment);
      backtrack(start + length, segmentCount + 1, path);
      path.pop();
    }
  }

  backtrack(0, 0, []);

  return results;
}

console.log(restoreIpAddresses("25525511135"));
console.log(restoreIpAddresses("0000"));
console.log(restoreIpAddresses("101023"));
