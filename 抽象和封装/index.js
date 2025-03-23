// 早期的JavaScript通过函数来模拟类
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.introduce = function() {
    console.log(`I am ${this.name}, ${this.age} years old.`);
}

const person = new Person('lucy', 18);
person.introduce();