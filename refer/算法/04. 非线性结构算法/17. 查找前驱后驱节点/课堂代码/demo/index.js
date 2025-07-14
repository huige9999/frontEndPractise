class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

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

/**
 * arr - 要构建的二叉搜索树的序列
 */
function buildSearchTree(arr) {
  if (arr === null || arr.length === 0) return null;

  const root = new TreeNode(arr[0]); // 最上层的根节点

  // 注意这里 i 是从 1 开始的，因为第一个元素已经根节点了
  for (let i = 1; i < arr.length; i++) {
    addNode(root, arr[i]);
  }

  return root;
}

const arr = [3, 5, 1, 6, 7, 2, 9, 8];
const bst = buildSearchTree(arr);

function inOrder(root) {
  if (root === null) return;

  inOrder(root.left);

  console.log(root.value);

  inOrder(root.right);
}
// inOrder(bst);
function searchByBST(root, target) {
  if (root === null) return false;

  // 下面的逻辑有一点类似于二分查找
  if (root.value === target) return true;
  if (root.value > target) return searchByBST(root.left, target);
  else return searchByBST(root.right, target);
}

// 查找最小值
function findMin(root) {
  while (root && root.left !== null) {
    root = root.left;
  }
  return root;
}
// 查找最大值
function findMax(root) {
  while (root && root.right !== null) {
    root = root.right;
  }
  return root;
}

/**
 * root - 二叉搜索树根节点
 * target - 要删除的目标值
 * return - 删除之后的子树
 */
function deleteNode(root, target) {
  // 如果当前节点为 null，直接返回 null
  if (root === null) return root;

  // 如果目标值小于当前的节点值，说明要删除的节点在左子树
  if (target < root.value) {
    root.left = deleteNode(root.left, target);
  } else if (target > root.value) {
    // 目标值大于当前的节点值，说明要删除的节点在右子树
    root.right = deleteNode(root.right, target);
  } else {
    // target 和当前节点值相等的情况，说明找到了要删除的节点
    if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    }

    // 如果代码走到这里，说明当前节点既有左子树也有右子树
    // 采用中序后继的方法
    // 找到右子树最小的节点赋值给当前节点
    root.value = findMin(root.right).value;
    // 还需要删除这个复制来的最小节点
    root.right = delete (root.right, root.value);
  }

  // 返回修改后的子树
  return root;
}

function preNode(root, target) {
  let current = root; // 缓存当前的节点
  let predecessor = null; // 存储前驱节点

  // 在 while 循环中查找前驱节点
  while (current !== null) {
    if (current.value < target) {
      // 因为当前节点的值小于目标值，它可能是一个前驱节点
      // 先暂时缓存起来
      // 这里之所以缓存，是为了应对目标节点的左子树为null的情况
      predecessor = current;
      current = current.right;
    } else if (current.value > target) {
      current = current.left;
    } else {
      // 进入此分支，说明找到了当前的目标节点
      if (current.left !== null) {
        // 如果有左子树，前驱就应该是左子树的最大值
        predecessor = findMax(current.left);
      }
      break;
    }
  }

  // 出了 while 之后，那么前驱节点就应该找到了
  return predecessor;
}

function postNode(root, target) {
  let current = root; // 缓存当前的节点
  let successor = null; // 存储后驱节点

  // 在 while 循环中查找后驱节点
  while (current !== null) {
    if (current.value > target) {
      // 因为当前节点的值大于目标值，它可能是一个后驱节点
      // 先暂时缓存起来
      // 这里之所以缓存，是为了应对目标节点的右子树为null的情况
      successor = current;
      current = current.left;
    } else if (current.value < target) {
      current = current.right;
    } else {
      // 进入此分支，说明找到了当前的目标节点
      if (current.right !== null) {
        // 如果有右子树，后驱就应该是右子树的最小值
        successor = findMin(current.right);
      }
      break;
    }
  }

  // 出了 while 之后，那么后驱节点就应该找到了
  return successor;
}

console.log(postNode(bst, 2));
