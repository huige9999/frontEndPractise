class Person {
    private _name:string;
    private static _instance: Person;

    private constructor(name) {
        this._name = name;
    }

    get name() {
     return this._name;
    }

    static getInstance() {
        if(!Person._instance) {
            Person._instance = new Person('John Doe');
        }
        return Person._instance;
    }

}

const person = Person.getInstance();
console.log(person.name); // Output: John Doe