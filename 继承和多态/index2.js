/**
 * 圣杯模式
 */
function Animal(name, age) {
    this.name = name;
    this.age = age;
}

Animal.prototype.sayHello = function() {
    console.log(`I am ${this.name}, ${this.age} years old.`);
}



function Dog(name, age, hobby) {
    Animal.apply(this, [name, age]);
    this.hobby = hobby;
}


function inherit(cur,target) {
  function F(){};
  F.prototype = target.prototype;
  cur.prototype = new F();
  cur.prototype.constructor = cur;
}

inherit(Dog, Animal);

const dog = new Dog('lucy', 18, 'eat');
dog.sayHello();