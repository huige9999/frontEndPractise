class Person {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    public introduce() {
        console.log(`I am ${this.name}, ${this.age} years old.`);
    }
    static getClassName() {
        return 'Person';
    }
}

const person = new Person('lucy', 18);
person.introduce();
console.log(Person.getClassName());