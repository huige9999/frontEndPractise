const CircularQueue = require("./CircularQueue.js");

/**
 * 
 * @param {*} players 玩家列表
 * @param {*} minPass 最小传花次数
 * @param {*} maxPass 最大传花次数
 */
async function jiguchuanhua(players, minPass = 3, maxPass = 8) {

    // 创建一个循环队列
    let queue = new CircularQueue(players.length);
    // 让所有玩家入队
    for(let p of players) {
        queue.enqueue(p);
    }

    console.log("游戏开始！当前的玩家有：", queue.toString());

    // 开始游戏
    while(queue.size() > 1){
        // 继续传花
        // 每次传花的时间长短是不一样的，意味着传花的次数也是不一样的
        // 生成3～8之间的随机数
        let passCount = Math.floor(Math.random() * (maxPass - minPass + 1)) + minPass;
        console.log("传花次数：", passCount);

        // 开始传递 passCount 次传花
        for(let i = 0; i < passCount; i++) {
            await new Promise((resolve)=>setTimeout(resolve, 500));
            console.log("🎵 鼓声响起 🎵");
            // 当前持花者出队
            let currentHolder = queue.dequeue(); // 从队列的队首取出一个元素
            queue.enqueue(currentHolder); // 将取出的元素再次入队到队尾
            console.log(`🌹 ${currentHolder} 将花递给了 ${queue.front()} 🌹`);
        }

        // 从上面的 for 循环出来后，说明传花次数已经达到了 passCount
        // 选出淘汰者，淘汰者就是当前队首的人
        let eliminated = queue.dequeue();
        console.log(`🔴 ${eliminated} 被淘汰了 🔴`);

        // 显示当前队列的情况
        console.log(queue.toString());
    }

    // 如果代码来到这里，说明队列里面只剩下一个人了
    // 游戏结束
    let winner = queue.front(); // 从队列中将胜利者取出
    console.log("游戏结束，胜利者是：", winner);
}

const players = [
  "张三",
  "李四",
  "王五",
  "赵六",
  "孙七",
  "周八",
  "吴九",
  "郑十",
];

jiguchuanhua(players);
