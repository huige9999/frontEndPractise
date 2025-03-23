abstract class Person {
  abstract get name(): string;
  abstract set name(name:string);
  abstract sayHello(): void;
}

class Student extends Person{
  private _name:string
  get name(){
    return this._name;
  }
  set name(name) {
    this._name = name;
  }
  sayHello() {
    console.log(`I am ${this._name}`);
  }
}

const student = new Student();
student.name = 'lucy';
student.sayHello();