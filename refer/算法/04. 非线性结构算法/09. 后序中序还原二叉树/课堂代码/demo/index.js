class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// 后序序列
const postOrderList = ["D", "E", "B", "F", "G", "C", "A"];
// 中序序列
const inOrderList = ["D", "B", "E", "A", "F", "C", "G"];

// 接收两个参数
// 1. 后序序列
// 2. 中序序列
function buildTree(postOrderList, inOrderList) {
  // 如果后序序列或者中序序列为空，说明无法构建
  if (!postOrderList.length || !inOrderList.length) return null;

  // 如果两者长度不相等，也无法构建
  if (postOrderList.length !== inOrderList.length) {
    throw new Error("前序序列和中序序列长度不一致，无法构建");
  }

  // 后序序列的最后一个元素就是当前树的根节点，因为前序遍历的顺序为左子树 -> 右子树 --> 根节点
  const rootValue = postOrderList[postOrderList.length - 1];
  const root = new TreeNode(rootValue); // 创建一个根节点

  // 如果只有一个元素，那么直接返回根节点
  if (postOrderList.length === 1) return root;

  // 在中序序列中寻找根节点所在的位置
  // 中序序列：DBEAFCG
  const rootIndex = inOrderList.indexOf(rootValue);
  if (rootIndex === -1) {
    throw new Error(`值为${rootValue}在中序序列中没有找到，无法构建二叉树`);
  }

  // 上面的到了根节点在中序序列中的下标，可以将中序左边部分和右边部分分离出来
  const leftInOrderList = inOrderList.slice(0, rootIndex); // DBE
  const rightInOrderList = inOrderList.slice(rootIndex + 1); // FCG

  const leftTreeSize = leftInOrderList.length; // 拿到中序序列的左子树的长度
  // 根据这个长度从前序序列中把左子树和右子树分离出来
  const leftPostOrderList = postOrderList.slice(0, leftTreeSize); //BDE
  const rightPostOrderList = postOrderList.slice(
    leftTreeSize,
    postOrderList.length - 1
  ); // CFG

  // 到目前为止，我们得到了后序序列的左右子树序列和中序序列的左右子树序列
  // 接下来递归调用 buildTree，将新的后序序列和中序序列传进去
  root.left = buildTree(leftPostOrderList, leftInOrderList);
  root.right = buildTree(rightPostOrderList, rightInOrderList);

  // 最后返回构建好的二叉树
  return root;
}
const root = buildTree(postOrderList, inOrderList);
console.log(root);
