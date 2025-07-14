const list = []; // 存放乱序的数
// 生成1万个乱序的数
for (let i = 0; i < 10000; i++) {
  list[i] = Math.floor(Math.random() * 10000);
}

let count1 = 0; // 计数器，用于对查找的次数进行计数

// 顺序查找指定的元素
function search(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    count1++;
    if (arr[i] === target) return true;
  }
  return false;
}
console.log(search(list, 7));
console.log(`顺序查找用了${count1}次查找`);

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

/**
 * arr - 要构建的二叉搜索树的序列
 */
function buildSearchTree(arr) {
  if (arr === null || arr.length === 0) return null;

  /**
   * root - 父节点
   * num - 当前节点
   */
  function addNode(root, num) {
    if (root === null || root.value === num) return;

    if (root.value < num) {
      // 当前节点比父节点大，应该放在右边
      if (root.right === null) {
        // 当前父节点没有右子树，那么当前节点直接成为新的右子树即可
        root.right = new TreeNode(num);
      } else {
        addNode(root.right, num);
      }
    } else {
      // 当前节点比父节点小，应该放在左边
      if (root.left === null) root.left = new TreeNode(num);
      else addNode(root.left, num);
    }
  }

  const root = new TreeNode(arr[0]); // 最上层的根节点

  // 注意这里 i 是从 1 开始的，因为第一个元素已经根节点了
  for (let i = 1; i < arr.length; i++) {
    addNode(root, arr[i]);
  }

  return root;
}

// const arr = [3, 5, 1, 6, 7, 2, 9, 8];
// const bst = buildSearchTree(arr);
const bst = buildSearchTree(list);
// console.log(bst);

function inOrder(root) {
  if (root === null) return;

  inOrder(root.left);

  console.log(root.value);

  inOrder(root.right);
}
// inOrder(bst);

let count2 = 0; // 针对二叉搜索树的查找次数
function searchByBST(root, target) {
  if (root === null) return false;

  // 计数器自增
  count2++;
  // 下面的逻辑有一点类似于二分查找
  if (root.value === target) return true;
  if (root.value > target) return searchByBST(root.left, target);
  else return searchByBST(root.right, target);
}

console.log(searchByBST(bst, 7));
console.log(`二叉查找用了${count2}次查找`);

