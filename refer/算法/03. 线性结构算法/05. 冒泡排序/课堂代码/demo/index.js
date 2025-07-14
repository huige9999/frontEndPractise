function bubbleSort(arr) {
  let n = arr.length;
  let swapped = false; // 记录是否发生了交换

  // 外层 for 循环控制的是冒泡的次数
  for (let i = 0; i < n - 1; i++) {
    // 内层循环控制的是比较的次数
    // 因为比较是从第一个数字开始
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // 进行交换
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        // 发生了交换，置 swapped 为 true
        swapped = true;
      }
    }
    // 出了内层for循环后，判断是否发生了交换
    // 我们就需要判断是否进入过 if，如果没有进入过，说明数组已经有序
    if (!swapped) {
      break;
    }
  }
}

let arr = [5, 3, 8, 4, 2];
bubbleSort(arr);
console.log(arr);
