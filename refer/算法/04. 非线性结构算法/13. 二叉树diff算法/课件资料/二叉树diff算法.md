# 二叉树diff算法

关于树的 diff，这其实是一个比较常见的需求，也就是说，除了比较两颗树以外，其实我们往往还需要知道两颗树不同的话究竟是哪个地方不同，需要得到不一样的地方的具体信息。该信息类似于这样：

```js
{type: "新增", origin: null, now: c2},
{type: "修改", origin: c1, now: c2},
{type: "删除", origin: c2, now: null }
```

**代码实现**

```js
// 定义二叉树的节点结构
class TreeNode {
  constructor(value) {
    this.value = value; // 节点的值
    this.left = null; // 左子树
    this.right = null; // 右子树
  }
}

// 构建两棵示例二叉树
const a1 = new TreeNode("a");
const b1 = new TreeNode("b");
const c1 = new TreeNode("c");
const d1 = new TreeNode("d");
const e1 = new TreeNode("e");
const f1 = new TreeNode("f");
const g1 = new TreeNode("g");

a1.left = c1;
a1.right = b1;
c1.left = f1;
c1.right = g1;
b1.left = d1;
b1.right = e1;

const a2 = new TreeNode("a");
const b2 = new TreeNode("z");
const c2 = new TreeNode("c2");
const d2 = new TreeNode("x");
const e2 = new TreeNode("e");
const f2 = new TreeNode("f2");
const g2 = new TreeNode("g");

a2.left = c2;
a2.right = b2;
c2.left = f2;
// c2.right = g2;      // 与第一棵树不一样
b2.left = d2;
b2.right = e2;
f2.right = g2; // 与第一棵树不一样

// 执行 diff 对比
var diffList = []; // 记录具体的不同点
diffTree(a1, a2, diffList);
console.log(diffList);
```

在上面的测试用例中，我们两颗树如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2025-03-06-144237.png" alt="image-20250306224237581" style="zoom:50%;" />

接下来我们的工作，就是完成 diffTree 这个方法：

```js
/**
 * type - diff 的类型
 * originNode - 旧节点
 * nowNode - 新节点
 * parent1 - 旧节点的父节点
 * parent2 - 新节点的父节点
 * diffList - 收集差异的数组
 */
function handleDiff(type, originNode, nowNode, parent1, parent2, diffList){
  // 该方法主要负责向 diffList 里面记录信息
  const parent1Value = parent1?.value; // 使用可选链防止 parent 为 null 时访问 value 出错
  const parent2Value = parent2?.value;
  
  if(parent1Value !== parent2Value){
    // 说明父节点也有变化，需要显示新旧父节点信息
    diffList.push({
      type,
      origin: originNode,
      now: nowNode,
      oldParent: parent1
      newParent: parent2
    })
  } else {
    // 说明父节点没有变化，只放一个父节点信息即可
    diffList.push({
      type,
      origin: originNode,
      now: nowNode,
      parent: parent2
    })
  }
}

/**
 * root1 - 旧树的根节点
 * root2 - 新树的根节点
 * diffList - 用于收集差异的数组
 * parent1 - 在旧树中，当前节点的父节点
 * parent2 - 在新树中，当前节点的父节点
 */
function diffTree(root1, root2, diffList, parent1 = null, parent2 = null){
  // 说明两颗树引用是相同的（包括都为 null），说明没有差异
  if(root1 === root2) return diffList;
  
  // 旧树为空但是新树不为空 --> 现在有东西了
  // 属于"新增"
  if(root1 === null && root2 !== null){
    handleDiff("新增", null, root2, parent1, parent2 ,diffList);
    return diffList; // 因为新增的节点，下面不再有子节点，因此直接返回
  }
  
  // 旧树不为空但是新树为空 --> 说明以前有东西，但是现在没有了
  // 属于"删除"
  if(root1 !== null && root2 === null){
    handleDiff("删除", root1, null, parent1, parent2 ,diffList);
    return diffList; // 因此删除了该节点，直接返回
  }
  
  // 代码走到这里，两个节点一定不为空不为空，但是值不一样
  // 属于"修改"
  if(root1.value !== root2.value){
    handleDiff("修改", root1, root2, parent1, parent2 ,diffList);
  }
  
  // 接下来需要递归的对左右子树进行 diff 比较
  diffTree(root1.left, root2.left, diffList, root1, root2);
  diffTree(root1.right, root2.right, diffList, root1, root2);
}
```

---

-EOF-