// const mySet = new Set();

// mySet.add(1);
// mySet.add(2);
// mySet.add(3);

// console.log(mySet);
// console.log(mySet.size);
// console.log(mySet.has(2));

// mySet.delete(2);
// console.log(mySet.has(2));

// mySet.clear();
// console.log(mySet.size);
// console.log(mySet);

// 并集
// const s1 = new Set([1, 2, 3]);
// const s2 = new Set([3, 4, 5]);

// const s3 = new Set([...s1, ...s2]);
// console.log(s3);

// 交集
// const s1 = new Set([1, 2, 3]);
// const s2 = new Set([3, 4, 5]);

// const s3 = new Set([...s1].filter((x) => s2.has(x)));
// console.log(s3);

// 差集
// const s1 = new Set([1, 2, 3]);
// const s2 = new Set([3, 4, 5]);

// const s3 = new Set([...s1].filter((x) => !s2.has(x)));
// console.log(s3);

// 子集
const s1 = new Set([1, 2, 3, 77]);
const s2 = new Set([1, 2, 3, 4, 5]);

const isSubset = [...s1].every((x) => s2.has(x));
console.log(isSubset);
