import { Chair, Sofa, CoffeeTable } from './AbstractProduct';

export class ModernChair extends Chair {
    sitOn(): void {
        console.log('Modern chair');
    }
}
export class ModernSofa extends Sofa {
    lieOn(): void {
        console.log('Modern sofa');
    }
}
export class ModernCoffeeTable extends CoffeeTable {
    putOn(item: string): string {
        return `Modern coffee table with ${item}`;
    }
}