/**
 * bills - 顾客付的账，例如 [5,5,10,10,20]
 */
function lemonadeChange(bills) {
  let five = 0; // 记录 5 美元钞票的数量
  let ten = 0; // 记录 10 美元钞票的数量

  for (let bill of bills) {
    if (bill === 5) {
      five++;
    } else if (bill === 10) {
      // 收到一张 10 美元，需要找回 5 美元
      if (five > 0) {
        // 有钱找给他
        five--;
        ten++;
      } else {
        return false;
      }
    } else if (bill === 20) {
      // 现在收到了一张 20 美元，需要找零 15 美元
      // 可以 1 张 10 美元 + 1 张 5 美元（优先考虑）
      // 3 张 5 美元
      if (ten > 0 && five > 0) {
        ten--;
        five--;
      } else if (five >= 3) {
        five -= 3;
      } else {
        return false;
      }
    }
  }
  return true;
}

console.log(lemonadeChange([5, 5, 5, 10, 20]));
console.log(lemonadeChange([5, 5, 10, 10, 20]));
