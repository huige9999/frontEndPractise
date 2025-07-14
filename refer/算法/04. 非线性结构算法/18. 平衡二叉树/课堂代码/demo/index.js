const { buildSearchTree } = require("./binarySearchTree.js");

// const arr = [3, 5, 1, 6, 7, 2, 9, 8];
// const arr = [4, 2, 7, 1, 3, 6, 5];
const arr = [10, 5, 15, 3, 7, 12, 20, 6, 8];
const bst = buildSearchTree(arr);

/**
 * 计算以 node 节点为根的子树的高度
 * 在计算的过程中会判断子树是否平衡
 * 如果子树不平衡，返回 - 1
 * 如果子树平衡，返回该子树的高度
 */
function checkHeight(node) {
  // 如果节点为空，子树高度为 0
  if (node === null) return 0;

  // 接下来需要递归的去计算左子树和右子树的高度
  const leftHeight = checkHeight(node.left);
  // 如果左子树不平衡，直接返回 -1
  if (leftHeight === -1) return -1;

  const rightHeight = checkHeight(node.right);
  // 如果右子树不平衡，直接返回 -1
  if (rightHeight === -1) return -1;

  // 现在得到了左右子树各自的高度
  // 接下来计算左右子树高度差
  // 如果左右子树的高度差大于 1，说明当前的树不平衡，返回 -1
  if (Math.abs(leftHeight - rightHeight) > 1) return -1;

  // 返回以当前 node 节点为根节点，子树的高度
  // 这里看 node 节点的左右子树谁更大就取谁的值
  return Math.max(leftHeight, rightHeight) + 1;
}

function isBalanced(root) {
  return checkHeight(root) !== -1;
}

console.log(isBalanced(bst));
