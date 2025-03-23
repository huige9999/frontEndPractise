import { IProduct } from './Interface';

export class ProductB implements IProduct {
    use() {
        console.log('ProductB')
    }
}