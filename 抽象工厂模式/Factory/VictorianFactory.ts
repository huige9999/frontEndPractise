import { AbstractFactory } from "./AbstractFactory";
import { Chair, Sofa, CoffeeTable } from "../Products/AbstractProduct";
import { VictorianChair, VictorianSofa, VictorianCoffeeTable } from "../Products/VictorianProducts";

export class VictorianFactory extends AbstractFactory {
    public createChair(): Chair {
        return new VictorianChair();
    }
    public createSofa(): Sofa {
        return new VictorianSofa();
    }

    public createCoffeeTable(): CoffeeTable {
        return new VictorianCoffeeTable();
    }
}