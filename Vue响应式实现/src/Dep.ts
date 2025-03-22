import Watcher from "./Watcher.js";

/**
 * 主体
 *   行为：
 *     添加观察者
 *     通知观察者
 */
export default class Dep {
  // 用于暂时存储当前的Watcher实例对象，主要用于进行依赖的收集
  static target: Watcher | null = null;
  // 维护一个观察者数组
  subs: Watcher[];

  constructor() {
    this.subs = [];
  }

  // 观察者添加到数组中
  addSubs(sub: Watcher) {
    this.subs.push(sub);
  }

  // 通知所有的观察者进行更新
  notify() {
    for (const sub of this.subs) {
      sub.update();
    }
  }
}
