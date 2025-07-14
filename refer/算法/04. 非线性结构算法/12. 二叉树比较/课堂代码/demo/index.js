// 定义二叉树的节点结构
class TreeNode {
  constructor(value) {
    this.value = value; // 节点的值
    this.left = null; // 左子树
    this.right = null; // 右子树
  }
}

// 构建第一颗二叉树
const a1 = new TreeNode("a");
const b1 = new TreeNode("b");
const c1 = new TreeNode("c");
const d1 = new TreeNode("d");
const e1 = new TreeNode("e");
const f1 = new TreeNode("f");
const g1 = new TreeNode("g");
// 交换左右子树
a1.left = b1;
a1.right = c1;
c1.left = f1;
c1.right = g1;
b1.left = d1;
b1.right = e1;

// 构建第二颗二叉树
const a2 = new TreeNode("a");
const b2 = new TreeNode("b");
const c2 = new TreeNode("c");
const d2 = new TreeNode("d");
const e2 = new TreeNode("e");
const f2 = new TreeNode("f");
const g2 = new TreeNode("g");
a2.left = c2;
a2.right = b2;
c2.left = f2;
c2.right = g2;
b2.left = d2;
b2.right = e2;

/**
 * 比较两棵二叉树是否相同
 * @param {TreeNode|null} tree1 第一棵树的根节点
 * @param {TreeNode|null} tree2 第二棵树的根节点
 * @returns {boolean} 若相同返回 true，否则返回 false
 */
function compareTree(tree1, tree2) {
  // 两个根节点的引用是相同的
  if (tree1 === tree2) return true;

  // 如果其中一个为空另一个不为空
  if ((tree1 === null && tree2 !== null) || (tree1 !== null && tree2 === null))
    return false;

  // 代码走到这里，说明 tree1 和 tree2 都不为 null
  // 可以访问 value
  if (tree1.value !== tree2.value) return false;

  // 递归的判断左右子树是否相同
  // const leftResult = compareTree(tree1.left, tree2.left);
  // const rightResult = compareTree(tree1.right, tree2.right);

  // 最后，左子树和右子树都必须相同
  // return leftResult && rightResult;

  const result1 =
    compareTree(tree1.left, tree2.left) &&
    compareTree(tree1.right, tree2.right);
  const result2 =
    compareTree(tree1.left, tree2.right) &&
    compareTree(tree1.right, tree2.left);
  return result1 || result2;
}

// 调用 compareTree
console.log(compareTree(a1, a2)); // true
