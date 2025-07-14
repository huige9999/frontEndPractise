function shellSort(arr) {
  let n = arr.length; // 数组的长度
  let gap = Math.floor(n / 2); // gap就是增量

  // 外面的循环表示的是增量的轮数，增量有几个数，这里就会循环多少次
  while (gap > 0) {
    // 根据当前的增量值，对每一组进行一个插入排序
    // 这个 for 循环就是在处理同一组的元素
    for (let i = gap; i < n; i++) {
      let temp = arr[i]; // 暂存当前的元素
      let j = i; // 将 j 设置为当前索引 i，主要是用来寻找插入位置

      // 将当前元素按照间隔进行插入排序
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }

      arr[j] = temp; // 将暂存的元素放入到正确的位置
    }

    // 更新 gap 值
    gap = Math.floor(gap / 2);
  }
}

const arr = [36, 27, 20, 60, 55, 7, 28, 36, 67, 44, 16];
shellSort(arr);
console.log(arr);
