/**
 * ES6中实现继承
 */
class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sayHello() {
        console.log(`I am ${this.name}, ${this.age} years old.`);
    }
}


class Dog extends Animal {
    constructor(name, age, hobby) {
       super(name,age);
       this.hobby = hobby;
    }
}

const dog = new Dog('lucy', 18, 'eat');
dog.sayHello();