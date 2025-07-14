function insertionSort(arr) {
  // 从第二个元素开始，到最后一个元素
  // 因为会假设第一个元素已经排好顺序了
  for (let i = 1; i < arr.length; i++) {
    // 取出每一个要插入的元素
    let current = arr[i];

    // 要和已排序区间里面的元素进行比较，找到正确的插入位置
    // j 一开始是已排序区间的最后一个元素
    let j = i - 1;
    // 这个循环负责将已排序区间的元素往后面移动
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    // 跳出 while 循环的时候，说明当前元素已经找到插入的位置了
    arr[j + 1] = current;
  }
}

const arr = [5, 3, 8, 4, 2];
insertionSort(arr);
console.log(arr);
