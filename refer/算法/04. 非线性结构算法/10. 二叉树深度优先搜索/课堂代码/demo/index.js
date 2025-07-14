class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// 初始化二叉树
const root = new TreeNode("A");
root.left = new TreeNode("B");
root.right = new TreeNode("C");
root.left.left = new TreeNode("D");
root.left.right = new TreeNode("E");
root.left.left.left = new TreeNode("H");
root.left.left.right = new TreeNode("I");
root.left.right.left = new TreeNode("J");
root.left.right.right = new TreeNode("K");
root.right.left = new TreeNode("F");
root.right.right = new TreeNode("G");
root.right.left.left = new TreeNode("L");
root.right.left.right = new TreeNode("M");
root.right.right.left = new TreeNode("N");
root.right.right.right = new TreeNode("O");

// console.log(root);

function depthFirstSearch(root, target) {
  if (root === null) return false;

  if (root.value === target) return true;

  const leftResult = depthFirstSearch(root.left, target);
  const rightResult = depthFirstSearch(root.right, target);

  return leftResult || rightResult;
}
console.log(depthFirstSearch(root, "J"));
console.log(depthFirstSearch(root, "M"));
console.log(depthFirstSearch(root, "Z"));
