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

  // 新增一个指定数据的节点
  // 放到当前链表的最后
  add(data) {
    // 首先需要生成一个节点
    const newNode = new Node(data);
    // 需要判断新增的这个节点是不是头节点
    if (!this.head) {
      // 如果进入此分支，说明当前的单向链表是空的
      // 当前这个节点应该是头节点
      this.head = newNode;
    } else {
      // 说明当前的单向链表不是空的
      // 将节点添加到最后
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      // 退出上面 while 循环的时候，current 是最后一个节点
      current.next = newNode;
    }
    this.size++;
  }

  // 接收两个参数
  // 1. 数据
  // 2. 添加到哪个位置
  addAt(data, index) {
    // 安全性处理
    if (index < 0 || index > this.size) {
      throw new Error("索引值无效");
    }

    const newNode = new Node(data); // 新创建一个节点
    let current = this.head; // 一开始 current 指向头节点
    let counter = 0; // 计数器，对链表节点进行计数，类似于数组的下标

    // 下面就是插入的操作。插入仍然是分为是否是头节点位置
    if (index === 0) {
      // 在头部插入
      // 插入的新节点会成为新的头节点
      newNode.next = this.head;
      this.head = newNode; // 更新头节点的值
    } else {
      // 链表后面部分插入，需要遍历到指定的位置
      while (current) {
        if (counter === index - 1) {
          // 做插入操作
          newNode.next = current.next;
          current.next = newNode;
          break;
        }
        current = current.next;
        counter++;
      }
    }
    this.size++;
  }

  // 接收1个参数
  // 要删除的节点对应数据是什么
  remove(data) {
    let current = this.head; // 一开始指向头节点
    let previous = null; // 暂存上一个节点

    while (current !== null) {
      if (current.data === data) {
        // 说明当前的这个 current 所对应的节点是要删除的节点
        if (previous === null) {
          // 说明删除的节点是头节点
          this.head = current.next;
        } else {
          // 不是头节点
          previous.next = current.next;
        }
        this.size--;
        return current.data;
      }
      previous = current; // 先暂存该节点
      current = current.next; // 跳入下一个节点
    }
  }

  // 接收1个参数，指定的位置
  removeAt(index) {
    if (index < 0 || index >= this.size) {
      throw new Error("索引值无效");
    }
    let current = this.head; // 一开始指向头节点
    let previous = null; // 暂存上一个节点
    if (index === 0) {
      // 说明要删除的是头节点
      this.head = current.next;
    } else {
      // 说明不是头节点，需要遍历到指定的位置
      for (let i = 0; i < index; i++) {
        previous = current;
        current = current.next;
      }
      // 跳出 for 循环的时候，current 是当前要删除的这个节点
      // previous 是当前要删除的节点的前一个节点
      previous.next = current.next;
    }
    this.size--;
    return current.data;
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
