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

  // 接收一个参数
  // 该参数为新的节点的数据
  add(item) {
    // 生成新的节点
    const newNode = new Node(item);

    if (!this.head) {
      // 进入此分支，说明 this.head 为 null
      // this.head 为 null 说明是一个空链表
      // 当前就一个节点，头部也是它，尾部也是它
      this.head = newNode;
      this.tail = newNode;
    } else {
      // 说明当前的双向链表是有节点
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    // 无论上面进入哪个分支，都是添加
    // 长度会增长
    this.size++;
  }
  // 接收两个参数
  // 1. 要插入的下标
  // 2. 新节点的数据
  addAt(index, item) {
    if (index < 0 || index > this.size) {
      throw new Error("索引值无效");
    }

    // 创建新的节点
    const newNode = new Node(item);

    // 没有进入上面的if，说明索引没有问题，接下来开始根据索引进行插入操作
    if (index === 0) {
      // 进入此分支，说明是要插入到头部
      newNode.next = this.head;
      if (this.head) {
        // 因为头节点可能是null，例如空链表的情况
        this.head.prev = newNode;
      }
      this.head = newNode; // 更新头节点
      if (!this.tail) {
        // 没有尾节点的时候，会进入此分支
        this.tail = newNode;
      }
    } else if (index === this.size) {
      // 进入此分支，说明是要插入到尾部
      this.add(item);
    } else {
      // 插入到中间
      // 这里会涉及到需要找到具体的位置
      let current = this.head;
      let counter = 0; // 计数器，用于标注节点的个数，起到一个类似于数组下标的作用
      while (current) {
        if (counter === index) {
          // 更新各个节点的指向
          newNode.prev = current.prev;
          newNode.next = current;
          current.prev.next = newNode;
          current.prev = newNode;
          break;
        }
        // 不停的更新节点
        current = current.next;
        counter++;
      }
    }
    this.size++;
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
