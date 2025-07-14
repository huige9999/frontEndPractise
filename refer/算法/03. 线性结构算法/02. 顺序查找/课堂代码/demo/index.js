function search(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  // 说明整个数组遍历完了，但是没有一次进入 if
  // 说明不存在
  return -1;
}

const arr = [10, 20, 30, 40, 50];
const target = 30;
const result = search(arr, target);
console.log(result); // 2
