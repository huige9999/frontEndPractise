/**
 * ts实现一个抽象类
 */

abstract class Hero {
    abstract move():void;

    birth() {
        console.log('I am born');
    }
}

class Libai extends Hero {
    move() {
        console.log('面试')
    }
}

const libai = new Libai();
libai.move();
libai.birth();