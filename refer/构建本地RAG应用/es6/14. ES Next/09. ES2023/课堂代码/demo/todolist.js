#!/usr/bin/env node
const fs = require("fs"); // 和文件处理相关的模块
const path = require("path"); // 和路径处理相关的模块

// 定义任务文件的路径，回头添加的任务会以文件的形式存储在这个路径下面
const TASK_FILE = path.join(__dirname, "tasks.json");

// 初始化任务文件
function initializeTaskFile() {
  if (!fs.existsSync(TASK_FILE)) {
    // 如果没有这个文件，就创建一个空的文件，然后初始化为空数组
    fs.writeFileSync(TASK_FILE, JSON.stringify([]));
  }
}

// 读取任务列表
function readTasks() {
  const data = fs.readFileSync(TASK_FILE, "utf-8");
  return JSON.parse(data);
}

// 写入任务列表
function writeTasks(tasks) {
  fs.writeFileSync(TASK_FILE, JSON.stringify(tasks, null, 2));
}

// 显示任务列表
function listTasks() {
  const tasks = readTasks();
  console.log("待办任务列表:");
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. [${task.done ? "x" : " "}] ${task.name}`);
  });
}

// 添加新任务
function addTask(taskName) {
  const tasks = readTasks();
  tasks.push({ name: taskName, done: false });
  writeTasks(tasks);
  console.log(`添加任务: ${taskName}`);
}

// 标记任务为完成
function completeTask(taskIndex) {
  const tasks = readTasks();
  if (taskIndex < 1 || taskIndex > tasks.length) {
    console.log("任务索引无效");
    return;
  }
  tasks[taskIndex - 1].done = true;
  writeTasks(tasks);
  console.log(`任务完成: ${tasks[taskIndex - 1].name}`);
}

// 删除已完成的任务
function deleteCompletedTasks() {
  let tasks = readTasks();
  tasks = tasks.filter((task) => !task.done);
  writeTasks(tasks);
  console.log("删除所有已完成的任务");
}

// 主函数
function main() {
  // console.log("process.argv:", process.argv);
  const [, , command, ...args] = process.argv;

  // 先做初始化
  initializeTaskFile();

  switch (command) {
    case "list": {
      listTasks();
      break;
    }
    case "add": {
      const taskName = args.join(" ");
      if (taskName) {
        addTask(taskName);
      } else {
        console.log("请提供任务名称");
      }
      break;
    }
    case "complete":
      const taskIndex = parseInt(args[0], 10);
      if (!isNaN(taskIndex)) {
        completeTask(taskIndex);
      } else {
        console.log("请提供有效的任务索引");
      }
      break;
    case "clear":
      deleteCompletedTasks();
      break;
    default:
      console.log("可用命令: list, add <task>, complete <index>, clear");
  }
}
main();
