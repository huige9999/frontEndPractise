const { CircleLinkedList } = require("./CircleLinkedList.js");
const ll = new CircleLinkedList(); // 拿到一个链表的实例对象
// 有3个节点
ll.add(1);
ll.add(2);
ll.add(3);
ll.add(4);
ll.add(5);
ll.addAt(500, 0);
ll.addAt(300, 3);
ll.print();
ll.removeAt(0);
ll.print();
ll.removeAt(2);
ll.print();
ll.reverse();
ll.print();
ll.swap(1, 3);
ll.print();
