# LRU算法

LRU **缓存淘汰算法**就是一种常用的策略，全称为 Least Recently Used，也就是我们认为最近使用过的数据应该是 “有用的”，很久没有用过的数据应该就是无用的，内存满了就应该先删除那些很久没用过的数据。



**题目描述**

首先要接收一个 capacity 参数作为缓存容量的最大容量，然后实现两个 API，一个是 `PUT(key, val)` 方法存入键值对，另一个是 `get(key)` 方法获取 key 对应的 val，如果 key 不存在则返回 -1. 

注意，get 和 put 方法都必须是 `O(1)` 的时间复杂度。下面是对应的测试用例：

```js
// 缓存容量为2
LRUCache cache = new LRUCache(2);
// 你可以把 cache 理解为一个队列
// 假设左边是队头，右边是队尾
// 最近使用的排在队头，久未使用的排在队尾
// 圆括号表示键值对

cache.put(1, 1);
// cache = [(1, 1)]

cache.put(2, 2);
// cache = [(2, 2), (1, 1)]

cache.get(1); // 返回 1
// cache = [(1, 1), (2, 2)]
// 因为最近访问了键 1，所以提至队头
// 返回键 1 对应的值 1

cache.put(3, 3);
// cache = [(3, 3), (1, 1)]
// 缓存容量已满，需要删除内容空出位置
// 优先删除久未使用的数据，也就是队尾的数据
// 然后把新的数据插入到队头

cache.get(2) // 返回-1（未找到）
// cache = [(3, 3), (1, 1)]
// cache 中已经不存在键为 2 的数据

cache.put(1, 4)
// cache = [(1, 4), (3, 3)]
// 键1已经存在，更新对应的值，并将其提前到队头
```



**LRU算法设计**

cache 这个数据结构必备的条件如下：

1. 显然 cache 中的元素**必须有序**，从而可以区分最近使用和久未使用的数据，当容量满了之后要删除最久未使用的那个元素来腾出位置。
2. 要在 cache 中快速找到某个 key 是否存在并得到对应的 val
3. 每次访问 cache 中的某个 key，**需要将这个元素变为最近使用的**，也就是说 cache 要支持在任意位置的快速插入和删除元素。



🤔什么数据结构同时符合上述条件呢？

- 哈希表：查找非常快，但是数据没有固定的顺序
- 链表：有顺序之分，插入和删除速度也很快，但是查找比较慢

这里可以将两者结合一下，形成一种复合类型的数据结构：哈希链表（LinkedHashMap）



![image-20250327100953202](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2025-03-27-020953.png)

借助这个结构，我们逐一分析上面 3 个条件：

1. 如果每次默认从链表尾部添加元素，那么显然越靠近尾部的元素就是最近使用的，越靠近头部的元素就是越久未使用的。
2. 对于某一个 key，可以通过哈希表快速定位到链表中的节点，从而取得对应的 val
3. 链表显然是支持在任意位置快速插入和删除的，改改指针就可以了。只不过传统的链表无法按照索引快速访问某一个位置的元素，而这里借助哈希表，可以通过 key 快速映射到任意一个链表节点，然后进行插入和删除。

🙋为什么这里需要使用双向链表？

回答：因为我们需要在删除一个节点的时候，操作该节点的前驱节点，通过双向链表可以快速查找到一个节点的前驱节点。





**代码实现**

```js
// 缓存的数据，是以双向链表的一个节点的形式存在的
class Node{
  constructor(key, value){
    this.key = key;
    this.value = value;
    // 这是一个双向链表的节点，因此还有前驱和后驱的指针
    this.prev = null; // 前驱指针
    this.next = null; // 后驱指针
  }
}

class LRUCache{
  constructor(capacity){
    if(!Number.isInteger(capacity) || capacity <= 0){
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
  get(key){
    if(!this.map.has(key)) return -1;
    const node = this.map.get(key);
    // 除了取以外，移动到队尾（队尾表示是最近使用的）
    this.#moveToTail(node);
    return node.value;
  }
  
  // 做设置操作
  put(key, value){
    if(this.map.has(key)){
      // 更新操作
      const node = this.map.get(key);
      node.value = value;
      this.#moveToTail(node); // 设置完成后，也需要将该节点变为最新的
    } else {
      // 新增操作
      
      // 新增首先需要判断一下，有没有超出最大容量
      // 因为一旦超出了最大容量，需要做删除操作
      if(this.map.size === this.capacity){
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
  #moveToTail(node){
    this.#removeNode(node);
    this.#addToTail(node);
  }
  
  // 添加某个节点到最后
  #addToTail(node){
     // 主要就是需要设置一下前后节点的指向
    node.prev = this.tail.prev;
    node.next = this.tail;
    this.tail.prev.next = node;
    this.tail.prev = node;
  }
  
  // 移除链表中的某个节点
  #removeNode(node){
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
```

