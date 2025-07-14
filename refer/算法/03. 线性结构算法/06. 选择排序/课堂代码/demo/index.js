function selectionSort(arr) {
  const n = arr.length;

  // 指向未排序区间的起始位置
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i; // 假设当前的 i 所对应的数就是最小值
    // 内层for循环每次都是从 i 的右侧那一个到最后一个
    // 内层for循环的目的是找到最小值的索引
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      // 做一个交换
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
}

const arr = [5, 3, 8, 4, 2];
selectionSort(arr);
console.log(arr);