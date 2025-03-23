import { Chair, Sofa, CoffeeTable } from "../Products/AbstractProduct";

export abstract class AbstractFactory {
    public abstract createChair(): Chair;
    public abstract createSofa(): Sofa;
    public abstract createCoffeeTable(): CoffeeTable;
}