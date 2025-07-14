const { Node, LinkedList } = require("./LinkedList.js");
const ll = new LinkedList(); // 拿到一个链表的实例对象
// 有3个节点
const n1 = new Node(1);
const n2 = new Node(2);
const n3 = new Node(3);
n1.next = n2;
n2.next = n3;
ll.head = n1;
ll.print();