function search(arr, target) {
  // 基本上和二分查找非常相似，区别就是找 mid 值的地方已经跳出 while 循环的条件
  let low = 0; // 起始下标
  let high = arr.length - 1; // 末尾下标

  while (low <= high && target >= arr[low] && target <= arr[high]) {
    // 计算mid，不再是一分为二，而是计算比例
    // 比例的计算根据公式来算
    let mid =
      low +
      Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));

    // 后面就和二分查找的逻辑一模一样
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] > target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
}

const arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const target = 70;
const result = search(arr, target);
console.log(result);

const target2 = 85;
const result2 = search(arr, target2);
console.log(result2);
