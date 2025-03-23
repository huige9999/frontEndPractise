/**
 * 早期组合模式实现继承
 */

function Animal(name, age) {
    this.name = name;
    this.age = age;
}

Animal.prototype.sayHello = function() {
    console.log(`I am ${this.name}, ${this.age} years old.`);
}


Dog.prototype = new Animal();

function Dog(name,age,hobby) {
    Animal.apply(this, [name, age]);
    this.hobby = hobby;
}

const dog = new Dog('lucy', 18, 'eat');
dog.sayHello();