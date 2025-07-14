// 这个方法负责合并
function merge(left, right) {
  let result = []; // 临时数组
  let leftIndex = 0; // 左数组的索引，默认指向第一个元素
  let rightIndex = 0; // 右数组的索引，默认指向右数组的第一个元素

  while (leftIndex < left.length && rightIndex < right.length) {
    // 里面就判断究竟是左边数组的元素小还是右边数组元素小
    // 将小的元素放入到临时数组里面
    if (left[leftIndex] <= right[rightIndex]) {
      // 说明左边的元素更小
      // 将左边元素放入到临时数组里面
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      // 说明右边元素更小
      // 将右边元素放入到临时数组里面
      result.push(right[rightIndex++]);
    }
  }

  // 代码来到这里，说明 left 或者 right 总之有一边已经结束了
  // 将另外一个数组剩余的所有元素放入到临时数组里面
  if (leftIndex < left.length) {
    // 说明左边数组有剩余
    result = result.concat(left.slice(leftIndex));
  }

  if (rightIndex < right.length) {
    // 说明右边数组有剩余
    result = result.concat(right.slice(rightIndex));
  }

  return result;
}

// 这个方法主要是负责拆
function mergeSort(arr) {
  if (arr.length < 2) {
    // 如果进入此分支，说明数组不能够再拆了，该数组已经是单独的一个元素了
    // 直接返回该数组
    // 这个其实就是递归的出口
    return arr;
  }

  // 如果没有进入上面的 if，那么就需要拆分数组，就是对半分
  const mid = Math.floor(arr.length / 2);

  // 根据上面计算出来的中间值，将整个数组分为左半部分和右半部分
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  // 下一步，就是合并左右两个子数组
  return merge(left, right);
}

const arr = [38, 27, 43, 3, 9, 82, 10];
const sortedArr = mergeSort(arr);
console.log(sortedArr);
