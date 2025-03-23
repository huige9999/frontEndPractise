interface IPerson {
    name:string;
    age:number;
    introduce():void;
}

interface IPlay {
    play():void;
}


class Student implements IPerson, IPlay {
    private _name:string;
    private _age:number;
    constructor(name,age) {
        this.name = name;
        this.age = age;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get age() {
        return this._age;
    }
    set age(age) {
        this._age = age;
    }
    introduce() {
        console.log(`I am ${this._name}, ${this._age} years old.`);
    }
    play() {
        console.log('play');
    }
}