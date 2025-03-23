class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    introduce() {
        console.log(`I am ${this.name}, ${this.age} years old.`);
    }
    static getClass() {
        return 'Person';
    }
}

const person = new Person('lucy', 18);
person.introduce();
console.log(Person.getClass());