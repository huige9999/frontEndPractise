// 测试文件
const { CircleDoublyLinkedList } = require("./CircleDoublyLinkedList");

// 创建一个 DoublyLinkedList 并将 node1 作为头节点
const cdl = new CircleDoublyLinkedList();
cdl.add(1);
cdl.add(2);
cdl.add(3);
cdl.add(4);
cdl.add(5);
cdl.print();
cdl.addAt(0, 100);
cdl.print();
cdl.addAt(3, 300);
cdl.print();
cdl.removeAt(0);
cdl.print();
cdl.removeAt(2);
cdl.print();
cdl.reverse();
cdl.print();
cdl.swap(1, 3);
cdl.print();
cdl.forEach((node) => {
  console.log("数据：" + node.data);
});
console.log(cdl.find(3));
console.log(cdl.find(300));
