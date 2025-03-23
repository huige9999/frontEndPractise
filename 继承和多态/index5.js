/**
 * javascript天生就有多态性
 */



const dog = {
    sayHello() {
        console.log('I am a dog');
    }
}

const cat = {
    sayHello() {
        console.log('I am a cat');
    }
}

const obj = {
    sayHello() {
        console.log('I am a object');
    }
}



/**
 * animal是一个拥有sayHello方法的对象
 */
function playSound(animal) {
    animal.sayHello();
}

playSound(dog);
playSound(cat);
playSound(obj);