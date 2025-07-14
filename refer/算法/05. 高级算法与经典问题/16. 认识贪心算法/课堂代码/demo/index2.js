function getMaxAmount(bills) {
  bills.sort((a, b) => b - a); // 从大到小排序

  const selectedBills = bills.slice(0, 10);

  const totalAmount = selectedBills.reduce((sum, bill) => sum + bill, 0);

  return { selectedBills, totalAmount };
}

// 一堆钞票
const bills = [
  50, 100, 5, 20, 10, 200, 1000, 500, 50, 5, 10, 50, 100, 200, 500,
];
const result = getMaxAmount(bills);
console.log(result);
