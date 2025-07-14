const { LinkedList } = require("./LinkedList.js");
const ll = new LinkedList(); // 拿到一个链表的实例对象
// 有3个节点
ll.add(1);
ll.add(2);
ll.add(3);
ll.print();
ll.addAt(100, 0);
ll.print();
ll.addAt(300, 3);
ll.print();
ll.remove(300);
ll.print();
ll.remove(100);
ll.print();
ll.removeAt(1);
ll.print();
