// 缓存的数据，是以双向链表的一个节点的形式存在的
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    // 这是一个双向链表的节点，因此还有前驱和后驱的指针
    this.prev = null; // 前驱指针
    this.next = null; // 后驱指针
  }
}

class LRUCache {
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("缓存容量必须是一个正整数");
    }
    this.capacity = capacity;
    this.map = new Map(); // 使用 map 结构来充当 Hash 表

    // 创造一对虚拟的头尾节点
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  // 对外暴露的方法

  // 做获取操作
  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    // 除了取以外，移动到队尾（队尾表示是最近使用的）
    this.#moveToTail(node);
    return node.value;
  }

  // 做设置操作
  put(key, value) {
    if (this.map.has(key)) {
      // 更新操作
      const node = this.map.get(key);
      node.value = value;
      this.#moveToTail(node); // 设置完成后，也需要将该节点变为最新的
    } else {
      // 新增操作

      // 新增首先需要判断一下，有没有超出最大容量
      // 因为一旦超出了最大容量，需要做删除操作
      if (this.map.size === this.capacity) {
        // 需要先删除一个，因为现在已经满了
        const firstNode = this.head.next;
        this.#removeNode(firstNode);
        // 哈希表也需要更新
        this.map.delete(firstNode.key);
      }
      // 代码来到这里，一定有空位
      const newNode = new Node(key, value);
      this.#addToTail(newNode);
      // 并且哈希表也需要新增对应的key
      this.map.set(key, newNode);
    }
  }

  // 还有一组私有的方法，不对外暴露

  // 移动一个节点到最后
  #moveToTail(node) {
    this.#removeNode(node);
    this.#addToTail(node);
  }

  // 添加某个节点到最后
  #addToTail(node) {
    // 主要就是需要设置一下前后节点的指向
    node.prev = this.tail.prev;
    node.next = this.tail;
    this.tail.prev.next = node;
    this.tail.prev = node;
  }

  // 移除链表中的某个节点
  #removeNode(node) {
    // 主要操作仍然是修改节点的前后指向
    const prev = node.prev; // 存储该节点的前驱节点
    const next = node.next; // 存储该节点的后驱节点
    //接下来指向让前后驱节点相互指向
    prev.next = next;
    next.prev = prev;
    // 断开当前节点的前后连接，防止内存泄露
    node.prev = null;
    node.next = null;
  }
}

module.exports = LRUCache;