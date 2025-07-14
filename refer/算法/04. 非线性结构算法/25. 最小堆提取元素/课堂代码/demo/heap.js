const { defaultCompare, swap, Compare } = require("./utils.js");
// 最小堆类
class MinHeap {
  /**
   * compareFn - 比较方法
   */
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.heap = []; // 用于存储最小堆所有元素
  }
  // 获取左子节点下标
  getLeftIndex(index) {
    return 2 * index + 1;
  }
  // 获取右子节点下标
  getRightIndex(index) {
    return 2 * index + 2;
  }
  // 获取父节点
  getParentIndex(index) {
    if (index === 0) return undefined;
    return Math.floor((index - 1) / 2);
  }
  // 获取当前最小堆的最小值
  // 最小堆中，堆顶的元素就是最小的，是数组的第一个元素
  findMini() {
    return this.isEmpty() ? undefined : this.heap[0];
  }
  // 还有一些工具方法
  size() {
    return this.heap.length;
  }
  isEmpty() {
    return this.size() <= 0;
  }
  clear() {
    this.heap = [];
  }

  getAsArray() {
    // 就是获取内部存储了元素的数组
    return this.heap;
  }

  insert(value) {
    if (value !== null) {
      // 执行插入操作

      // 获取新元素应该插入的位置
      const index = this.heap.length;
      this.heap.push(value);
      // 接下来就需要向上调整
      this.siftUp(index); // 传入新元素的下标
      return true;
    }
    return false;
  }

  /**
   * index - 一开始元素的下标
   */
  siftUp(index) {
    // 先获取父节点的下标
    let parent = this.getParentIndex(index);

    // 接下来循环和父节点做比较以及交换操作
    while (
      index > 0 &&
      this.compareFn(this.heap[parent], this.heap[index]) ===
        Compare.BIGGER_THAN
    ) {
      // 两个节点需要进行交换
      swap(this.heap, parent, index);
      // 更新 index 的值，后面方便根据新的 index 寻找下一个父节点
      index = parent;
      // 继续寻找父节点的下标
      parent = this.getParentIndex(index);
    }
  }

  // 从堆顶提取最值
  extract() {
    if (this.isEmpty()) return undefined;
    // 如果整个二叉堆只有一个元素，直接弹出，不需要做下移处理
    if (this.size() === 1) return this.heap.shift();

    // 下面说明不止一个元素，那么需要做下移处理
    const removedValue = this.heap[0]; // 先存储最值
    this.heap[0] = this.heap.pop(); // 将最后一个元素弹出，作为新的堆顶元素
    this.siftDown(0);

    // 向外界返回之前缓存的最值
    return removedValue;
  }

  siftDown(index) {
    let element = index;
    // 先获取左右子节点的下标
    const left = this.getLeftIndex(index); // 左子节点下标
    const right = this.getRightIndex(index); // 右子节点下标
    const size = this.size();

    // 先比较左边的子节点，当前 element 对应的节点是父节点
    if (
      left < size &&
      this.compareFn(this.heap[element], this.heap[left]) ===
        Compare.BIGGER_THAN
    ) {
      // 需要记录新的左子节点下标
      element = left;
    }

    // 然后再比较右子节点，当前 element 对应的节点可能是父节点，也可能是左子节点
    if (
      right < size &&
      this.compareFn(this.heap[element], this.heap[right]) ===
        Compare.BIGGER_THAN
    ) {
      // 需要记录新的右子节点下标
      element = right;
    }

    // 如果发现比父节点更小的子节点，那么就需要交换并且递归向下继续调整
    if (element !== index) {
      swap(this.heap, index, element);
      this.siftDown(element); // 继续往下调整
    }
  }
}

module.exports = MinHeap;
