import { AbstractFactory } from "./AbstractFactory";
import { Chair, Sofa, CoffeeTable } from "../Products/AbstractProduct";
import { ModernChair, ModernSofa, ModernCoffeeTable } from "../Products/ModernProducts";

export class ModernFactory extends AbstractFactory {
    public createChair(): Chair {
        return new ModernChair();
    }
    public createSofa(): Sofa {
        return new ModernSofa();
    }

    public createCoffeeTable(): CoffeeTable {
        return new ModernCoffeeTable();
    }
}