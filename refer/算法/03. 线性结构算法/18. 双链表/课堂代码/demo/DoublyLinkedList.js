// DoublyLinkedList.js
class Node {
  // 节点当前的数据
  constructor(data) {
    // 每个节点就是三个属性
    this.data = data; // 当前节点存储的数据
    this.next = null; // 下一个节点的指针
    this.prev = null; // 上一个节点的指针
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null; // 双向链表的头节点
    this.tail = null; // 双向链表的尾节点
    this.size = 0; // 链表的长度
  }

  // 打印链表
  print() {
    let current = this.head; // current --> 头节点
    let result = []; // 存储节点内容
    while (current) {
      result.push(current.data);
      current = current.next; // 更新节点
    }
    // 退出上面的while，说明节点已经遍历完毕
    console.log(result.join(" <-> "));
  }
}
module.exports = {
  Node,
  DoublyLinkedList,
};
