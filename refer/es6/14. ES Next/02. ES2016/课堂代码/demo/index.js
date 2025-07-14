let i = 1;
let o = {
  get a() {
    return ++i;
  },
};
console.log(o.a ** (o.a ** o.a));
// 2 ** 3 ** 4
// 2 ** 81
// 2417851639229258349412352

// console.log(2 ** 81);
