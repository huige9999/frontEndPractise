const { CircleLinkedList } = require("./LinkedList.js");
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
ll.remove(500);
ll.print();
ll.remove(300);
ll.print();
