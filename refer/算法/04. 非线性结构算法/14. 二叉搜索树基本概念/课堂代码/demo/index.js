const arr = []; // 存放乱序的数
// 生成1万个乱序的数
for (let i = 0; i < 10000; i++) {
  arr[i] = Math.floor(Math.random() * 10000);
}

let count = 0; // 计数器，用于对查找的次数进行计数

// 查找指定的元素
function search(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    count++;
    if (arr[i] === target) return true;
  }
  return false;
}
console.log(search(arr, 7));
console.log(`用了${count}次查找`);
