/**
 * 使用邻接表来存储图信息，支持有向图/无向图，支持边权
 */
class Graph {
  /**
   * isDirected - 是否为有向图，默认值为 false（无向图）
   */
  constructor(isDirected = false) {
    this.isDirected = isDirected;
    // 通过 map 来存储所有顶点以及所有出边的信息，最终 map 所存储的信息大致如下
    // Map {
    // 	'A' => [{node: 'B', weight: 2},{node: 'C', weight: 1}],
    //  'B' => [{node: 'C', weight: 3}],
    //  'C' => [],
    // }
    this.adjacencyList = new Map();
  }

  // 接下来实现一些辅助方法

  // 获取图中所有的顶点列表
  getVertices() {
    return [...this.adjacencyList.keys()];
  }

  // 获取图中所有的边
  getEdges() {
    let edges = []; // 这个数组就存储所有的边
    for (let [vertex, neighbors] of this.adjacencyList) {
      for (let { node } of neighbors) {
        edges.push([vertex, node]); // 数组的每一项是 [起点，终点]
      }
    }
    return edges;
  }

  // 统计图中所有边的数量
  edgeCount() {
    let count = 0; // 计数器，对边进行计数
    for (let [_, neighbors] of this.adjacencyList) {
      count += neighbors.length;
    }

    // 如果是无向图，每条边在两个顶点的邻接表中会出现两次，需要除以2
    return this.isDirected ? count : count / 2;
  }

  // 判断图中是否存在某一条边
  // src - 起点
  // dest - 终点
  hasEdge(src, dest) {
    if (!this.adjacencyList.has(src)) return false;
    return this.adjacencyList.get(src).some((nodeObj) => nodeObj.node === dest);
  }

  /**
   * 添加一个顶点到图中。
   * @param {*} vertex - 新顶点的名称或标识
   */
  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  /**
   * 添加一条边（支持有向/无向、支持权重）。
   * @param {*} src - 边的起点
   * @param {*} dest - 边的终点
   * @param {number} [weight=1] - 该边的权重（可选，默认1）
   */
  addEdge(src, dest, weight = 1) {
    // 首先需要判断一下，起点和终点是否存在于 map 中
    // 如果没有，需要先添加对应的顶点
    if (!this.adjacencyList.has(src)) this.addVertex(src);
    if (!this.adjacencyList.has(dest)) this.addVertex(dest);

    // 接下来来添加边
    const srcNeighbors = this.adjacencyList.get(src); // 先获取起点对应的连接顶点数组
    // 接下来需要检查一下，看是否已经有了这条边
    let hasExist = srcNeighbors.some((nodeObj) => nodeObj.node === dest);
    if (!hasExist) {
      srcNeighbors.push({ node: dest, weight });
    }

    // 如果是无向图，还需要添加 dest --> src
    if (!this.isDirected) {
      const destNeighbors = this.adjacencyList.get(dest); // 先获取起点对应的连接顶点数组
      // 接下来需要检查一下，看是否已经有了这条边
      let hasExist = destNeighbors.some((nodeObj) => nodeObj.node === src);
      if (!hasExist) {
        destNeighbors.push({ node: src, weight });
      }
    }
  }

  /**
   * 移除一个顶点，以及与它相关的所有边（出边和入边）。
   * @param {*} vertex - 要移除的顶点
   */
  removeVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) return;

    // 开始进行删除操作

    // 这里只是删除了对应的顶点已经顶点对应的边的集合
    this.adjacencyList.delete(vertex);

    // 还有一个很重要的步骤，删除其他顶点对该顶点的指向
    for (let [key, edgeArr] of this.adjacencyList.entries()) {
      this.adjacencyList.set(
        key,
        edgeArr.filter((nodeObj) => nodeObj.node !== vertex)
      );
    }
  }

  /**
   * 移除一条边。
   * @param {*} src - 边的起点 A
   * @param {*} dest - 边的终点 B
   */
  removeEdge(src, dest) {
    if (!this.adjacencyList.has(src)) return;

    // 接下来进行过滤操作，假设删除 AB 这条边
    this.adjacencyList.set(
      src,
      this.adjacencyList.get(src).filter((nodeObj) => nodeObj.node !== dest)
    );

    // 注意：如果是无向图，也需要移除 dest --> src 这条边
    if (!this.isDirected && this.adjacencyList.has(dest)) {
      this.adjacencyList.set(
        dest,
        this.adjacencyList.get(dest).filter((nodeObj) => nodeObj.node !== src)
      );
    }
  }

  dfs(startVertex) {
    if (!this.adjacencyList.has(startVertex)) return [];

    const visited = new Set();
    const result = []; // 存储遍历的结果

    const dfsHelper = (vertex) => {
      visited.add(vertex);
      result.push(vertex);

      for (let nodeObj of this.adjacencyList.get(vertex)) {
        const v = nodeObj.node;
        if (!visited.has(v)) {
          // 进入该分支，说明当前这个节点还没有遍历到
          dfsHelper(v);
        }
      }
    };
    dfsHelper(startVertex);

    return result;
  }

  /**
   * 广度优先搜索（BFS），从指定顶点开始遍历。
   * @param {*} startVertex - 起始顶点
   * @returns {Array} 返回按访问顺序得到的顶点列表
   */
  bfs(startVertex) {
    if (!this.adjacencyList.has(startVertex)) return [];

    const visited = new Set();
    const result = []; // 存储最终的结果
    const queue = []; // 需要将每一层的顶点加入到队列里面

    visited.add(startVertex);
    queue.push(startVertex);

    while (queue.length > 0) {
      const current = queue.shift(); // 先拿到这个顶点
      result.push(current);

      // 接下来就需要寻找该顶点对应的下一层
      for (let nodeObj of this.adjacencyList.get(current)) {
        const v = nodeObj.node;
        if (!visited.has(v)) {
          visited.add(v);
          queue.push(v);
        }
      }
    }

    return result;
  }

  /**
   * startVertex - 指定的起始顶点
   * returns - 一个对象 { edges: [], totalWeight: 0}
   * edges 记录有哪些边，totalWeight 记录最小生成树的总权重
   */
  primMST(startVertex) {
    if (this.isDirected) {
      // 进入此分支，说明当前是有向图
      // 有向图一般不太适用
      throw new Error("普里姆算法一般适用于无向图");
    }

    // 接下来判断一下图中是否存在这个起始顶点
    if (!this.adjacencyList.has(startVertex))
      return { edges: [], totalWeight: 0 };

    // 获取所有的顶点
    const vertices = this.getVertices(); // ['A', 'B', 'C', 'D', 'E']

    const mstSet = new Set(); // 用来存储已经加入到了 MST 的顶点
    const dist = new Map(); // 记录一个顶点连接到已经生成的 MST 的最小权重
    const parent = new Map(); // 记录一个顶点连接到 MST 最优的那条边的“父顶点”

    // 接下来初始化 dist 和 parent
    for (let v of vertices) {
      dist.set(v, Infinity);
      parent.set(v, null);
    }
    dist.set(startVertex, 0);
    // dist = {
    //   A: 0,
    //   B: Infinity,
    //   C: Infinity,
    //   D: Infinity,
    //   E: Infinity
    // }
    // parent = {
    //   A: null,
    //   B: null,
    //   C: null,
    //   D: null,
    //   E: null
    // }
    // mstSet = { } (空)

    // 遍历所有的顶点，每一次遍历都会将一个顶点加入到 MST 里面
    for (let i = 0; i < vertices.length; i++) {
      // 1. 首先需要找到还没有加入到 MST 并且 dist 是最小的顶点
      let current = null;
      let minDist = Infinity;

      for (let v of vertices) {
        if (!mstSet.has(v) && dist.get(v) < minDist) {
          minDist = dist.get(v);
          current = v;
        }
      }

      // 如果没有找到这样的顶点（可能图不联通之类的），提前结束
      if (current === null) break;

      // 代码来到这里，说明找到了，将选定的顶点加入到 MST 集合里面
      mstSet.add(current);

      // 现在 current（顶点）已经找到了，需要根据 current 顶点来更新 dist 以及 parent
      for (let neighborObj of this.adjacencyList.get(current)) {
        const neighbor = neighborObj.node; // 拿到该顶点（current）对应的邻居顶点
        const weight = neighborObj.weight; // 拿到该顶点（current）到邻居顶点的加权值

        // 接下来更新那些还没有加入 MST，并且存在最小边权的顶点
        if (!mstSet.has(neighbor) && weight < dist.get(neighbor)) {
          dist.set(neighbor, weight);
          parent.set(neighbor, current);
        }
      }
    }
    // i = 0, current = A
    // mstSet = { 'A' }
    // 找到 A 的邻居 B(weight = 4)，C(weight = 7)
    // dist = { A:0, B:4, C:7, D:Infinity, E:Infinity }
    // parent = { A:null, B:'A', C:'A', D:null, E:null }

    // i = 1, current = B
    // mstSet = { 'A', 'B' }
    // 找到 B 的邻居 A(weight = 4) D(weight=6) C(weight=8)
    // dist = { A:0, B:4, C:7, D:6, E:Infinity }
    // parent = { A:null, B:'A', C:'A', D:'B', E:null }

    // 生成 MST 的边信息
    const mstEdges = [];
    let totalWeight = 0;

    for (let v of vertices) {
      const p = parent.get(v);
      if (p !== null) {
        const w = dist.get(v); // 获取到当前这个顶点加入到 MST 时的最小边权值
        mstEdges.push([p, v, w]);
        totalWeight += w;
      }
    }

    return {
      mstEdges,
      totalWeight,
    };
  }

  /**
   * Kruskal（克鲁斯卡尔）最小生成树算法，适用于无向图。
   * 返回生成树的所有边及其总权重。
   * @returns
   * 例如 { edges: [[ 'A', 'B', 4 ], [ 'C', 'D', 5 ], [ 'B', 'D', 6 ], [ 'D', 'E', 7 ]], totalWeight: 22 }
   */
  kruskalMST() {
    // 如果是有向图，Kruskal 算法一般不适用，这里直接抛出异常
    if (this.isDirected) {
      throw new Error("克鲁斯卡尔算法一般用于无向图");
    }

    // 1. 需要收集所有的边 [src, dest, weight]
    // 除了简单收集以外，还需要去重，因为是无向图，每条边会出现两次 A-->B,B-->A
    // A < B 的情况才保留
    const edges = [];
    for (let [vertex, neighbors] of this.adjacencyList) {
      for (let { node, weight } of neighbors) {
        // 比较顶点，避免重复的边
        if (vertex < node) {
          edges.push([vertex, node, weight]);
        }
      }
    }

    // 上面的代码执行完成后，edges 就会存储所有的边信息，并且没有重复的
    // edges = [
    //   ['A','B',4],  // A <-> B
    //   ['A','C',7],  // A <-> C
    //   ['B','D',6],  // B <-> D
    //   ['B','C',8],  // B <-> C
    //   ['D','E',7],  // D <-> E
    //   ['C','D',5],  // C <-> D
    // ]

    // 接下来就对 edges 按照边权值进行排序
    edges.sort((a, b) => a[2] - b[2]);
    // edges = [
    //   ['A','B',4], // 权重 4
    //   ['C','D',5], // 权重 5
    //   ['B','D',6], // 权重 6
    //   ['A','C',7], // 权重 7
    //   ['D','E',7], // 权重 7
    //   ['B','C',8], // 权重 8
    // ]

    const parent = new Map(); // 用于记录每个顶点的父节点
    const rank = new Map(); // 用于近似表示树的高度，从而在合并两颗树的时候，可以让矮的树挂到高的树下面。

    // 接下来对这两个 Map 进行初始化
    const vertices = this.getVertices(); // 获取所有的顶点 [ 'A', 'B', 'C', 'D', 'E' ]
    for (let v of vertices) {
      parent.set(v, v);
      rank.set(v, 0);
    }
    // parent = {
    //   A: 'A',
    //   B: 'B',
    //   C: 'C',
    //   D: 'D',
    //   E: 'E'
    // }
    // rank = {
    //   A: 0,
    //   B: 0,
    //   C: 0,
    //   D: 0,
    //   E: 0
    // }

    // 接下来需要写一个辅助方法
    /**
     * x - 要查找根节点的元素
     * returns x 的根节点
     */
    // parent(A) = B  parent(B) = C  parent(C) = C
    // find(A)-->find(B)-->find(C)
    // 最终 find(A) 的返回值就是 C
    // 这里不仅仅是返回一个顶点的根，而且还做了路径压缩
    // parent.set(B, C)，递归回到外层后还执行了 parent.set(A, C)
    // 最终 A、B、C 的父节点都指向 C，并且以后再 find(A) 或者 find(B) 的时候，直接就得到根节点 C
    const find = (x) => {
      if (parent.get(x) !== x) {
        // 如果 x 的父节点不是自己，说明 x 还没有到达根节点
        // 那么就递归的向上查找
        parent.set(x, find(parent.get(x)));
      }
      return parent.get(x);
    };

    // 接收两个顶点
    // 合并两个顶点的联通分量
    const union = (x, y) => {
      const rootX = find(x); // 找到 x 的根节点
      const rootY = find(y); // 找到 y 的根节点

      // 如果已经在同一个联通分量
      if (rootX === rootY) return false;

      // 接下来是不等的情况，我们就需要合并
      if (rank.get(rootX) > rank.get(rootY)) {
        // 说明 X 的树更高
        parent.set(rootY, rootX);
      } else if (rank.get(rootX) < rank.get(rootY)) {
        // 说明 Y 树更高
        parent.set(rootX, rootY);
      } else {
        // rank 相等的时候，那么就随便选择一个来作为根
        parent.set(rootY, rootX);
        rank.set(rootX, rank.get(rootX) + 1);
      }
      return true;
    };
    // parent(A) = A, rank(A) = 1, 表示 A 是一颗独立的树，树高为 1
    // parent(B) = B, rank(B) = 0, 表示 B 也是一颗独立的树，但是这颗树要更矮一些
    // union(A, B)
    // rootX = A	rootY = B
    // parent.set(rootY, rootX); --> parent.set(B, A) 表示 B 现在是挂在 A 下面的

    // 最后就是生成返回的 MST 对应的信息
    let mstEdges = [];
    let totalWeight = 0;

    for (let [src, dest, weight] of edges) {
      if (union(src, dest)) {
        mstEdges.push([src, dest, weight]);
        totalWeight += weight;
      }
    }

    return {
      mstEdges,
      totalWeight,
    };
  }
}

// 测试用例
const graph = new Graph();

// graph.addVertex("V1");
// graph.addVertex("V2");
// graph.addVertex("V3");
// graph.addVertex("V4");
// graph.addVertex("V5");

// graph.addEdge("V1", "V2");
// graph.addEdge("V1", "V4");
// graph.addEdge("V4", "V3");
// graph.addEdge("V2", "V5");
// graph.addEdge("V3", "V2");
// graph.addEdge("V3", "V5");

// console.log(graph.adjacencyList);

// console.log(graph.bfs("V1"));

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 7);
graph.addEdge("B", "C", 8);
graph.addEdge("B", "D", 6);
graph.addEdge("C", "D", 5);
graph.addEdge("D", "E", 7);

console.log(graph.primMST("A"));
console.log(graph.kruskalMST());
