import { AbstractFactory } from "./Factory/AbstractFactory";
import { VictorianFactory } from "./Factory/VictorianFactory";
import { ModernFactory } from "./Factory/ModernFactory";

class Store {
    private factory: AbstractFactory;

    constructor(factory: AbstractFactory) {
        this.factory = factory;
    }

    public orderFurniture(): string {
        // 生产对应风格的一套家具
        const chair = this.factory.createChair();
        const sofa = this.factory.createSofa();
        const coffeeTable = this.factory.createCoffeeTable();

        return `${chair.sitOn()} ${sofa.lieOn()} ${coffeeTable.putOn("coffee")}`;
    }
}

// 现在客户想要一套维多利亚风格的家具
const store = new Store(new VictorianFactory());
console.log(store.orderFurniture());

// 现在客户想要一套现代风格的家具
const store2 = new Store(new ModernFactory());
console.log(store2.orderFurniture());