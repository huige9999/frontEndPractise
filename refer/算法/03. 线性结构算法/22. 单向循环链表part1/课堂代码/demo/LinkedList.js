// 首先需要一个节点
class Node {
  // 接收该节点要存储的数据
  constructor(data) {
    this.data = data; // 当前节点存储的数据
    this.next = null; // 下一个节点的地址
  }
}

// 链表类
class CircleLinkedList {
  constructor() {
    this.head = null; // 链表的头节点
    this.size = 0; // 链表的长度
  }

  // 新增一个指定数据的节点
  // 放到当前链表的最后
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
      // 这里还需要一个操作，新增的这个节点会变成尾节点，这个尾节点需要指向头部
      newNode.next = this.head;
    } else {
      // 说明当前的单向链表不是空的
      // 将节点添加到最后
      let current = this.head;
      while (current.next !== this.head) {
        current = current.next;
      }
      // 退出上面 while 循环的时候，current 是最后一个节点
      current.next = newNode;
      newNode.next = this.head;
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

    const newNode = new Node(data);

    if (!this.head) {
      // 说明是空链表
      newNode.next = newNode; // 形成循环
      this.head = newNode;
    } else if (index === 0) {
      // 在头部插入，而且链表不为空
      // 需要找到最后一个节点，并且让最后一个节点指向当前的新节点（因为新节点成为了新的头部）
      let last = this.head;
      // 找到最后一个节点
      while (last.next !== this.head) {
        last = last.next;
      }
      newNode.next = this.head;
      this.head = newNode;
      last.next = this.head;
    } else {
      // 在链表的中间或者尾部插入
      let current = this.head;
      let counter = 0; // 计数器
      while (counter < index - 1) {
        current = current.next;
        counter++;
      }
      // 出了while循环之后，说明找到了插入的位置
      newNode.next = current.next;
      current.next = newNode;
    }
    this.size++;
  }

  // 接收1个参数
  // 要删除的节点对应数据是什么
  remove(data) {
    // 链表为空就返回 null
    if (!this.head) return null;

    let current = this.head;
    let previous = null;

    do {
      if (current.data === data) {
        // 说明找到了要删除的节点
        // 在删除的时候分为两种情况，看删除的节点是不是头节点
        if (previous === null) {
          // 说明当前要删除的节点是头节点
          // 这里又要分成两种情况
          // 1. 只有一个头节点
          // 2. 超过一个节点
          if (current.next === this.head) {
            // 说明只有一个节点
            this.head = null;
          } else {
            // 说明不止一个节点
            // 找到最后一个节点，让它指向当前要删除的节点的下一个节点
            let last = this.head;
            while (last.next !== this.head) {
              last = last.next;
            }
            this.head = current.next;
            last.next = this.head;
          }
        } else {
          // 说明当前要删除的节点不是头节点
          previous.next = current.next;
        }
        this.size--;
        return current.data;
      }
      // 继续往下找
      previous = current;
      current = current.next;
    } while (current !== this.head);
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

  reverse() {
    if (!this.head) return; // 如果是空链表，直接返回

    // 没有进入上面的 if，说明链表有东西，进行反转操作
    let current = this.head;
    let previous = null; // 保存上一个节点
    let next = null; // 保存下一个节点

    while (current !== null) {
      // 进行反转操作
      next = current.next; // 将当前节点原本的下一个节点暂存
      current.next = previous;
      previous = current;
      current = next;
    }

    // 重置头节点
    this.head = previous;
  }

  // 接收参数
  // 要交换的两个节点的下标，下标是从 0 开始
  swap(index1, index2) {
    if (index1 === index2) return false; // 如果索引相等，不需要交换
    if (
      index1 < 0 ||
      index1 >= this.size ||
      index2 < 0 ||
      index2 >= this.size
    ) {
      throw new Error("索引无效");
    }

    // 代码走到这一步，说明索引是没有问题的
    // 开始进行交换
    let current = this.head; // 一开始指向头节点
    let counter = 0; // 计数器，靠它找到对应下标的节点
    let node1 = null; // 存储index1对应的节点
    let node2 = null; // 存储 index2 对应的节点

    // 这个while循环主要是寻找节点
    while (current !== null) {
      if (counter === index1) node1 = current;
      if (counter === index2) node2 = current;
      if (node1 && node2) break; // 两个节点都找到了，就退出
      current = current.next;
      counter++;
    }

    if (node1 && node2) {
      // 交换两个节点的数据
      let temp = node1.data;
      node1.data = node2.data;
      node2.data = temp;
      return true;
    }

    return false;
  }

  // 获取链表的长度
  length() {
    return this.size;
  }

  // 打印链表数据
  print() {
    // 无外乎就是遍历所有的节点，通过 next 就可以找到下一个节点
    let current = this.head; // 一开始从头节点开始
    let result = ""; // 存储整个链表拼接出来的结果
    if (this.head) {
      do {
        result += `${current.data} -> `;
        current = current.next;
      } while (current !== this.head);
    }
    result += "null";
    console.log(result);
  }
}

module.exports = {
  Node,
  CircleLinkedList,
};
