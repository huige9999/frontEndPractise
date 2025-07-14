// 测试文件
const { DoublyLinkedList } = require("./DoublyLinkedList");

// 创建一个 DoublyLinkedList 并将 node1 作为头节点
const dl = new DoublyLinkedList();
dl.add(1);
dl.add(2);
dl.add(3);
dl.add(4);
dl.add(5);

// 打印双向链表
dl.print();

dl.addAt(0, 100);
dl.print();
dl.addAt(6, 1000);
dl.print();
dl.addAt(3, 2.5);
dl.print();
dl.remove(2.5);
dl.print();
dl.removeAt(0);
dl.print();
dl.removeAt(5);
dl.print();
dl.removeAt(2);
dl.print();