import { IProduct } from "./Interface";
import { ProductA } from "./ProductA";
import { ProductB } from "./ProductB";


/**
 * 简单工厂要做的事：
 * 
 */

export class SimpleFactory {
    createProduct(type: string): IProduct {
        if(type === 'A') {
            return new ProductA();
        } else if(type === 'B') {
            return new ProductB();
        } else {
            throw new Error('type error');
        }
    }
}