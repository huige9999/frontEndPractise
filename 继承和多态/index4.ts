/**
 * TypeScript中实现继承
 */

class Person {
    private _name:string;
    private _age: number;
    constructor(name: string, age: number) {
        this._name = name;
        this._age = age;
    }

    sayHello() {
        console.log(`I am ${this._name}, ${this._age} years old.`);
    }

    get name() {
        return this._name;
    }
}

class Student extends Person {
    private _score: number;
    constructor(name: string, age: number, score: number) {
        super(name, age);
        this._score = score;
    }

    sayScore() {
        console.log(`My score is ${this._score}`);
    }
}

const student = new Student('lucy', 18, 100);
student.sayHello();
student.sayScore();