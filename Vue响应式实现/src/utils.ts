import Vue from "./Vue.js";
import Dep from "./Dep.js";
import Watcher from "./Watcher.js";

export function observe(vm: Vue, obj: Record<string, any>): void {
  // 实例化一个主体
  const dep = new Dep();

  // 遍历数据属性
  Object.keys(obj).forEach((key) => {
    // 首先将原来的值保存起来
    let internalValue = obj[key];

    Object.defineProperty(vm, key, {
      get(): any {
        // 如果有观察者，应该将观察者添加到主体的观察者列表里面
        if (Dep.target) {
          dep.addSubs(Dep.target);
        }

        return internalValue;
      },
      set(newValue: any): void {
        internalValue = newValue;
        // 通知所有的观察者进行更新
        dep.notify();
      },
    });
  });
}

export function compile(vm: Vue): void {
  // 首先拿到Vue实例上的el属性，这个属性是个选择器
  // 这一步其实就是拿到最外层的DOM节点 <div id="app">
  const el: HTMLElement | null = document.querySelector(vm.$el);
  if (!el) {
    throw new Error("Element with selector cannot be found");
  }

  // 接下来我们创建一个文档碎片
  const documentFragment: DocumentFragment = document.createDocumentFragment();

  // 对节点进行处理，我们会用到一个正则表达式
  // 该正则表达式就是用来匹配{{}}的，因为猫须字符串会成为一个观察者
  const reg: RegExp = /\{\{(.*)\}\}/;

  while (el.firstChild) {
    // 拿到第一个子节点，然后我们会进行各种分析
    const child: ChildNode = el.firstChild;

    // 接下来对子节点进行分析
    if (child.nodeType === Node.ELEMENT_NODE) {
      // 说明这是一个元素节点
      const element = child as HTMLElement;
      if (reg.test(element.innerHTML)) {
        const matches = element.innerHTML.match(reg);
        const vmKey: string = matches ? matches[1].trim() : "";
        new Watcher(vm, element, vmKey);
      } else {
        // 说明里面没有猫须，我们还需要判断这个元素节点的属性是否有 v-model
        // 如果你有 v-model 也需要进行处理
        Array.from(element.attributes).forEach((attr) => {
          if (attr.name === "v-model") {
            // 如果进入此分支，说明该元素节点的属性包含 v-model
            const vmKey: string = attr.value; // 这里其实就是 msg
            element.addEventListener("input", (ev: Event) => {
              const target = ev.target as HTMLInputElement;
              // 这里其实就是将文本框所输入的值赋值给 vm 实例对象上面的 msg 属性
              vm[vmKey] = target.value;
            });
          }
        });
      }
    } else if(child.nodeType === Node.TEXT_NODE && reg.test(child.nodeValue || "")) {
        // 说明这是一个文本节点，并且这个文本节点也是带猫须的
        // 那么我们需要将这个文本节点转换为一个观察者
        const matches = (child.nodeValue || '').match(reg);
        const vmKey: string = matches ? matches[1].trim() : "";
        new Watcher(vm, child, vmKey);
    }

    // 处理完成后，我们就会将其添加到文档碎片中
    // 当我们将一个已有节点添加到另一个节点下面的时候做的是一个移动的操作
    documentFragment.appendChild(child);
  }

  // 因此当退出上面的while循环的时候，el应该是一个空节点
  // 所有的子节点都放到了文档碎片中
  // 我们再将文档碎片中的所有子节点重新添加回el中
  el.appendChild(documentFragment);
}
