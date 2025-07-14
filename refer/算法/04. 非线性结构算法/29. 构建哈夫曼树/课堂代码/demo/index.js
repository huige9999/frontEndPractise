/**
 * 哈夫曼节点类
 */
class HuffmanNode {
  constructor(char, freq, left = null, right = null) {
    this.char = char; // 字符
    this.freq = freq; // 频率
    this.left = left; // 左子节点
    this.right = right; // 右子节点
  }
}

/**
 * str - 待编码的字符串
 * return - 返回一个对象，对象的键是对应的字符，对象的值是该字符所出现的次数
 * { 'a': 5, 'b': 2, ...}
 */
function getFrequencyMap(str) {
  const freq = {};

  // 遍历字符串的每一个字符
  for (const ch of str) {
    freq[ch] = (freq[ch] || 0) + 1;
  }

  return freq;
}

/**
 * str - 待编码的字符串
 * return - 构建的哈夫曼树所对应的根节点
 */
function buildHuffmanTree(str) {
  // 1. 先得到字符串里面每一个字符出现的频率
  const freqMap = getFrequencyMap(str);

  // 这里得到的就是键所构成的数组，例如 ['A', 'B', 'C', ...]
  const uniqueChars = Object.keys(freqMap);
  // 做一下边界处理
  if (uniqueChars.length === 0) return null;
  if (uniqueChars.length === 1) {
    // 说明整个字符串里面只有一种字符，类似于 'AAAAAAAAAA...'
    // 那么这里我们就可以直接指定编码为 0
    return new HuffmanNode(uniqueChars[0], freqMap[uniqueChars[0]]);
  }

  // 代码来到这里，说明有多个字符
  // 首先将所有出现了的字符生成哈夫曼节点对象
  // 注意这里是一种字符就会生成一个哈夫曼节点对象
  let nodes = uniqueChars.map((ch) => new HuffmanNode(ch, freqMap[ch]));

  // 接下来就是哈夫曼节点两两进行合并
  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq); // 首先按照频率进行排序
    const left = nodes.shift(); // 取出一个频率最小的作为左子节点
    const right = nodes.shift(); // 再取出一个频率最小的作为右子节点

    // 合并出新的子节点
    const newNode = new HuffmanNode(null, left.freq + right.freq, left, right);

    // 放回到数组里面
    nodes.push(newNode);
  }

  // 跳出上面的while循环，说明node数组的长度没有大于1，整个数组只剩1个节点
  // 这个节点就是整颗哈夫曼树的根节点
  return nodes[0];
}

let str = "ABAACDC";
console.log(buildHuffmanTree(str));
