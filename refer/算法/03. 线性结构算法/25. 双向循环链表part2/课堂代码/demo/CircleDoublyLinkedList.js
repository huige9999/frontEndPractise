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

class CircleDoublyLinkedList {
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

    // 判断是否为空链表
    if (!this.head) {
      // 原本是空链表
      newNode.next = newNode;
      newNode.prev = newNode;
      this.head = newNode;
      this.tail = newNode;
    } else {
      // 说明当前的双向链表是有节点
      newNode.prev = this.tail;
      this.tail.next = newNode;

      newNode.next = this.head; // newNode作为最后一个节点，要指向回头节点
      this.head.prev = newNode;

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
      if (!this.head) {
        // 链表为空，直接插入
        newNode.next = newNode;
        newNode.prev = newNode;
        this.head = newNode;
        this.tail = newNode;
      } else {
        // 说明链表不为空，插入到头部，之前的头部节点就会成为新节点的 next
        newNode.next = this.head;
        newNode.prev = this.tail;
        this.head.prev = newNode;
        this.tail.next = newNode;
        this.head = newNode;
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

  // 接收一个参数
  // 要删除的数据节点对应的数据
  remove(item) {
    let current = this.head; // 一开始指向头节点

    if (!this.head) return false; // 如果链表为空，直接返回

    do {
      // 这里面就需要去寻找对应数据的那个节点
      if (current.data === item) {
        // 进入此分支，说明找到了要删除的节点
        if (current === this.head && current === this.tail) {
          // 进入此分支，说明整个双向链表只有一个节点
          // 将头尾节点都置为空
          this.head = null;
          this.tail = null;
        } else if (current === this.head) {
          // 说明当前要删除的节点是头节点
          this.head = this.head.next;
          this.head.prev = this.tail;
          this.tail.next = this.head;
        } else if (current === this.tail) {
          // 说明要删除的节点为尾节点
          this.tail = this.tail.prev;
          this.tail.next = this.head;
          this.head.prev = this.tail;
        } else {
          // 说明就是中间节点
          current.prev.next = current.next;
          current.next.prev = current.prev;
        }
        // 无论上面进入哪一个分支，都会删除一个节点
        this.size--;
        return true;
      }
      current = current.next; // 更新节点
    } while (current !== this.head);

    return false;
  }

  // 接收一个参数
  // 要删除的节点所对应的索引值
  removeAt(index) {
    if (index < 0 || index >= this.size) {
      throw new Error("索引值有误");
    }

    let current = this.head; // 先记录头节点
    let counter = 0; // 计数器，对下标进行计数

    if (index === 0) {
      // 进入此分支，说明删除的是头节点
      if (this.head === this.tail) {
        // 说明当前的双链表只有一个节点
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
        this.head.prev = this.tail;
        this.tail.next = this.head;
      }
    } else {
      // 说明删除的是后面的节点
      do {
        if (counter === index) {
          // 找到要删除的节点的时候，会进入该分支
          if (current === this.tail) {
            // 说明要删除的节点是尾节点
            this.tail = current.prev; // 更新尾节点
            this.tail.next = this.head;
            this.head.prev = this.tail;
          } else {
            // 说明就是中间的节点
            current.prev.next = current.next;
            current.next.prev = current.prev;
          }
          break;
        }
        // 不断的更新节点
        current = current.next;
        counter++;
      } while (current !== this.head);
    }
    this.size--;
  }

  reverse() {
    if (!this.head) return; // 如果是空链表，直接返回

    let current = this.head; // 缓存头节点
    let prev = null; // 用于缓存上一个节点
    let next = null; // 用于缓存下一个节点

    do {
      next = current.next;
      current.next = prev;
      current.prev = next;
      prev = current;
      current = next;
    } while (current !== this.head);

    // 更新头节点和尾节点
    this.tail = this.head; // 原来的头变成了尾巴
    this.head = prev; // 然后更新头节点
    this.tail.next = this.head; // 更新尾节点的next指向新的头节点，保持循环结构
    this.head.prev = this.tail; // 更新头节点的prev指向新的尾节点，保持循环结构
  }

  // 接收2个参数
  // 是两个下标值
  swap(index1, index2) {
    if (index1 === index2) return false; // 如果索引相等，不需要交换
    if (
      index1 < 0 ||
      index1 >= this.size ||
      index2 < 0 ||
      index2 >= this.size
    ) {
      throw new Error("索引值有错误");
    }

    let current = this.head; // 记录头节点
    let counter = 0; //计数器，用于记录索引的，类似于数组的下标
    let node1 = null;
    let node2 = null;

    do {
      if (counter === index1) node1 = current;
      if (counter === index2) node2 = current;
      if (node1 && node2) break; // 两个节点都找到了，跳出循环
      current = current.next;
      counter++;
    } while (current !== this.head);

    // 找到了两个节点，接下来进行交换操作
    if (node1 && node2) {
      let temp = node1.data;
      node1.data = node2.data;
      node2.data = temp;
      return true;
    }

    return false;
  }

  length() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }

  // 接收一个参数
  // 该参数是一个回调函数
  forEach(fn) {
    // 遍历整个链表，将所有的节点扔给这个回调函数
    let current = this.head;
    do {
      fn(current);
      current = current.next;
    } while (current !== this.head);
  }

  // 接收一个参数
  // 要查找的节点的数据是什么
  find(item) {
    let current = this.head;
    let counter = 0;

    do {
      if (current.data === item) {
        // 说明找到了
        return counter;
      }
      current = current.next;
      counter++;
    } while (current !== this.head);

    // 代码走到这儿，说明没有进入过 while 里面的 if
    // 说明没有找到
    return -1;
  }

  // 打印链表
  print() {
    if (!this.head) return; // 如果链表为空，直接返回

    let current = this.head; // current --> 头节点
    let result = []; // 存储节点的内容

    do {
      result.push(current.data);
      current = current.next;
    } while (current !== this.head);

    console.log(result.join(" <-> "));
  }
}
module.exports = {
  Node,
  CircleDoublyLinkedList,
};
