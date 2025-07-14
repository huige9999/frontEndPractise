const { buildSearchTree } = require("./binarySearchTree.js");

// const arr = [3, 5, 1, 6, 7, 2, 9, 8];
// const arr = [4, 2, 7, 1, 3, 6, 5];
// const arr = [10, 5, 15, 3, 7, 12, 20, 6, 8];

// const arr = [10, 20, 30]; // 左旋示例数据
const arr = [30, 20, 10]; // 右旋示例数据
let bst = buildSearchTree(arr);

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

/**
 * root - 整颗树的根几点
 * pivotValue - 想要旋转的节点所对应的值
 */
function leftRotate(root, pivotValue) {
  let pivot = root; // 用于存储要旋转的节点，一开始临时将根节点作为我们要旋转的节点
  let parent = null; // 存储节点的父节点
  let isLeftChild = false; // 记录当前要旋转的节点是否是父节点的左子节点

  // 1. 根据这个 pivotValue 找到要旋转的节点
  while (pivot && pivot.value !== pivotValue) {
    parent = pivot;
    if (pivotValue < pivot.value) {
      pivot = pivot.left;
      isLeftChild = true;
    } else {
      pivot = pivot.right;
      isLeftChild = false;
    }
  }

  // 代码来到这里的时候，pivot 对应的就是要旋转的那个节点

  // 如果找不到 pivot 节点，啥也不做，直接返回原来的 root 节点
  if (!pivot) return root;

  // 接下来就该做旋转的操作
  const rightNode = pivot.right; // 记录旋转节点的右子节点，因为这个右子节点会成为新的根节点
  if (!rightNode) return root; // 如果没有右子节点，无法左旋，直接返回原来的 root

  // 做左旋的时候，rightNode 的左子树会成为旋转节点的右子树
  pivot.right = rightNode.left;

  // 原本的旋转节点，会成为新根节点的左子树
  rightNode.left = pivot;

  // 接下来需要让 rightNode（新根节点）接替 pivot（旋转节点）在父节点的位置
  if (!parent) {
    root = rightNode;
  } else {
    // 说明之前 pivot 是有父节点
    // 还需要判断之前的 pivot 旋转节点是父节点的左子节点还是右子节点
    if (isLeftChild) {
      parent.left = rightNode;
    } else {
      parent.right = rightNode;
    }
  }

  return root;
}

function rightRotate(root, pivotValue) {
  let pivot = root; // 假设当前的根节点就是旋转节点
  let parent = null; // 存储父节点
  let isLeftChild = false; // 记录旋转节点是不是父节点的左子节点

  // 根据 pivotValue 寻找旋转节点
  while (pivot && pivot.value !== pivotValue) {
    parent = pivot;
    if (pivotValue < pivot.value) {
      pivot = pivot.left;
      isLeftChild = true;
    } else {
      pivot = pivot.right;
      isLeftChild = false;
    }
  }

  if (!pivot) return root;

  // 记录旋转节点的左子节点，因为这个节点回头会成为新的根节点
  const leftNode = pivot.left;
  if (!leftNode) return root; // 没有左子树，无法右旋

  pivot.left = leftNode.right;
  leftNode.right = pivot;

  // 修正和 parent 之间的位置关系
  if (!parent) {
    root = leftNode;
  } else {
    if (isLeftChild) {
      parent.left = leftNode;
    } else {
      parent.right = leftNode;
    }
  }

  return root;
}

console.log(isBalanced(bst)); // false
bst = rightRotate(bst, 30);
console.log(isBalanced(bst)); // true
