class TreeNode {
  constructor(value) {
    this.value = value; // 节点的值
    this.left = null; // 左子树
    this.right = null; // 右子树
  }
}

// 构建上面的完全二叉树
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

function preOrder(root) {
  if (root === null) return;

  // 访问根节点
  console.log(root.value);

  // 遍历左子树
  preOrder(root.left);

  // 遍历右子树
  preOrder(root.right);
}

function inOrder(root) {
  if (root === null) return;

  // 遍历左子树
  inOrder(root.left);

  // 访问根节点
  console.log(root.value);

  // 遍历右子树
  inOrder(root.right);
}

function postOrder(root) {
  if (root === null) return;

  // 遍历左子树
  postOrder(root.left);

  // 遍历右子树
  postOrder(root.right);

  // 访问根节点
  console.log(root.value);
}

preOrder(root);
console.log("-----------------");
inOrder(root);
console.log("-----------------");
postOrder(root);
