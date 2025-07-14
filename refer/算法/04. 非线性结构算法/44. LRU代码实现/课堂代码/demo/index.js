const LRUCache = require("./LRU.js");

const cache = new LRUCache(2); // 缓存容量为2

cache.put(1, 1);
// cache = [(1, 1)]

cache.put(2, 2);
// cache = [(2, 2), (1, 1)]

console.log(cache.get(1)); // 返回 1
// cache = [(1, 1), (2, 2)]
// 因为最近访问了键 1，所以提至队头
// 返回键 1 对应的值 1

cache.put(3, 3);
// cache = [(3, 3), (1, 1)]
// 缓存容量已满，需要删除内容空出位置
// 优先删除久未使用的数据，也就是队尾的数据
// 然后把新的数据插入到队头

console.log(cache.get(2)); // 返回-1（未找到）
// cache = [(3, 3), (1, 1)]
// cache 中已经不存在键为 2 的数据

cache.put(1, 4);
// cache = [(1, 4), (3, 3)]
// 键1已经存在，更新对应的值，并将其提前到队头

console.log(cache.get(1)); // 返回 4
