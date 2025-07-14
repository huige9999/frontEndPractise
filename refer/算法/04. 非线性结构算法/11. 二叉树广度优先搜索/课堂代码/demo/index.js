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

function breadthFirstSearch(root, target){
  if(root === null) return;
  
  const queue = []; // 用于存储每一层的节点
  queue.push(root);
  
  while(queue.length > 0){
    const node = queue.shift(); // 从队列里面拿出最前面的节点
    
    if(node.value === target) return true;
    
    if(node.left !== null) queue.push(node.left);
    if(node.right !== null) queue.push(node.right);
  }
  return false;
}
console.log(breadthFirstSearch(root, "J"));
console.log(breadthFirstSearch(root, "N"));
console.log(breadthFirstSearch(root, "Z"));
