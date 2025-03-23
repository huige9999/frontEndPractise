function getSingle(tClass) {
    let instance = null;
    return function(...args) {
        if(!instance) {
            instance = new tClass(...args);
        }
        return instance;
    }
}

class Person {
    constructor(name) {
        this.name = name;
    }
}

const SinglePerson = getSingle(Person);

const person1 = new SinglePerson('jacky');
const person2 = new SinglePerson('lucky');

console.log(person1 === person2);

console.log(person1.name);