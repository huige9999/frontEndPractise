// 首先需要一个节点
class Node {
  // 接收该节点要存储的数据
  constructor(data) {
    this.data = data; // 当前节点存储的数据
    this.next = null; // 下一个节点的地址
  }
}

// 链表类
class LinkedList {
  constructor() {
    this.head = null; // 链表的头节点
    this.size = 0; // 链表的长度
  }

  // 打印链表数据
  print() {
    // 无外乎就是遍历所有的节点，通过 next 就可以找到下一个节点
    let current = this.head; // 一开始从头节点开始
    let result = []; // 存放所有节点的值
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    // 出了 while 之后，说明遍历节点结束
    console.log(result.join(" -> ") + " -> null");
  }
}

module.exports = {
  Node,
  LinkedList,
};
