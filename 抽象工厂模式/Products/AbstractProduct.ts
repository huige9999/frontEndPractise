export abstract class Chair {
    abstract sitOn(): void;
}

export abstract class Sofa {
    abstract lieOn(): void;
}

export abstract class CoffeeTable {
    abstract putOn(item: string): string;
}