import Vue from "./Vue.js";
import Dep from "./Dep.js";


export default class Watcher {
   vm: Vue; // 表示Vue实例对象
   el: Node; // 代表DOM节点
   vmKey: string; // 存储data中的key

   constructor(vm: Vue, el: Node, vmKey: string) {
     this.vm = vm;
     this.el = el;
     this.vmKey = vmKey;
    
     // Watcher初始化的时候，将当前的Watcher实例对象保存给Dep.target
     // 之所以要存储是为了进行依赖的收集
     Dep.target = this;
     // 先初始化更新一遍
     this.update();
    // 避免重复收集依赖
     Dep.target = null;
   }
   
   update():void {
    // 根据节点类型进行更新
    // 这个例子做了简化，假设只有文本节点和元素节点
     if(this.el.nodeType === Node.TEXT_NODE) {
        // this.vm[this.vmKey]访问的是Vue实例对象中的data中的属性
        // 因为后续回对data属性进行劫持，将data里面的所有属性存储到Vue实例对象中
        this.el.nodeValue = this.vm[this.vmKey]
     } else if(this.el.nodeType === Node.ELEMENT_NODE) {
        (this.el as HTMLElement).innerHTML = this.vm[this.vmKey]
     }
   }
}