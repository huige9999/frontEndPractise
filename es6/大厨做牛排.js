/**
 * 模拟耗时任务
 */
const fetchIngredient = (name) =>
  new Promise((resolve, reject) => {
    console.log(`管家: 正在去采购 ${name}...`);
    setTimeout(() => {
      if (Math.random() < 0.5) {
        console.log(`管家: ${name} 采购完毕!`);
        resolve(name);
      } else {
        console.log(`管家: ${name} 采购失败!`);
        reject(name);
      }
    }, 1000);
  });

/**
 * 大厨开始做饭
 */

function* cookMeal() {
  try {
    console.log("大厨开始做饭...");

    const beef = yield fetchIngredient("上等牛排");
    console.log(`大厨拿到${beef}，开始处理...`);

    const wine = yield fetchIngredient("82年红酒");
    console.log(`大厨拿到${wine}，准备上菜!`);

    return "法式大餐";
  } catch (err) {
    return "吃简餐吧";
  }
}

/**
 * 通用的执行器
 */
function run(generatorTask) {
  const chef = generatorTask();

  function nextStep(param) {
    const { value: instruction, done } = chef.next(param);
    if (done) {
      return Promise.resolve(instruction);
    }
    return Promise.resolve(instruction).then(
      (res) => nextStep(res),
      (err) => chef.throw(err)
    );
  }
  return nextStep();
}

run(cookMeal).then((res) => {
    console.log(res.value);
}).catch((err) => {
    console.log(err.value);
}) 
