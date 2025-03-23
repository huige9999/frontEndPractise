import { Chair, Sofa, CoffeeTable } from './AbstractProduct';


export class VictorianChair extends Chair {
    sitOn() {
        console.log('坐在维多利亚风格的椅子上');
    }
}
export class VictorianSofa extends Sofa {
    lieOn() {
        console.log('躺在维多利亚风格的沙发上');
    }
}
export class VictorianCoffeeTable extends CoffeeTable {
    putOn(item) {
        return `维多利亚风格的茶几上放了${item}`;
    }
}