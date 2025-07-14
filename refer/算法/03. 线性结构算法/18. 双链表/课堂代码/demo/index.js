// 测试文件
const { DoublyLinkedList, Node } = require("./DoublyLinkedList");

// 先创建3个节点
const node1 = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);

// 接下来，将这3个节点串联成一个双向链表
node1.next = node2;
node2.prev = node1;
node2.next = node3;
node3.prev = node2;

// 创建一个 DoublyLinkedList 并将 node1 作为头节点
const dl = new DoublyLinkedList();
dl.head = node1;
dl.tail = node3;
dl.size = 3;

// 打印双向链表
dl.print();