function binaryInsertionSort(arr) {
  // 从第二个元素开始遍历，因为第一个元素会被视为已排序元素
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i]; // 当前要插入的元素
    let left = 0;
    let right = i - 1;

    // 这里就是使用二分查找，查找正确的插入位置
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (arr[mid] < current) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    // 跳出上面的 while 循环，说明 left > right
    // 说明找到了插入位置，插入位置就是 left 这个位置

    // 移动
    for (let j = i - 1; j >= left; j--) {
      arr[j + 1] = arr[j];
    }

    // 插入
    arr[left] = current;
  }
}

const arr = [7, 20, 27, 36, 55, 60, 28, 36, 67, 44, 16];
binaryInsertionSort(arr);
console.log(arr);
