function binarySearch(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) {
    // 没有找到时递归的出口
    return -1;
  }

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) {
    // 找到的时候，递归的出口
    return mid;
  } else if (arr[mid] < target) {
    // 说明目标值在右边
    return binarySearch(arr, target, mid + 1, right);
  } else {
    // 说明目标值在左边
    return binarySearch(arr, target, left, mid - 1);
  }
}

const arr = [4, 7, 9, 11, 20, 24, 30, 41];
const target1 = 30;
const target2 = 70;

console.log(binarySearch(arr, target1)); // 6
console.log(binarySearch(arr, target2)); // -1
