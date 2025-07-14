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
}

// 测试用例
const graph = new Graph(true);

graph.addVertex("V1");
graph.addVertex("V2");
graph.addVertex("V3");
graph.addVertex("V4");
graph.addVertex("V5");

graph.addEdge("V1", "V2");
graph.addEdge("V1", "V4");
graph.addEdge("V4", "V3");
graph.addEdge("V2", "V5");
graph.addEdge("V3", "V2");
graph.addEdge("V3", "V5");

console.log(graph.adjacencyList);

console.log(graph.bfs("V1"));
