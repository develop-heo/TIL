function Person(name, age) {
    this.name = name;
    this.age = age;
}

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

// 클래스가 바벨로 트랜스파일링 되었을 때 내부적인 코드는 프로토타입으로 되어있음


// 클래스와 인스턴스
class Person {
    constructor(name, age, location) {
        this.name = name;
        this.age = age;
        this.location = location;
    }

    getName() {
        return this.name + '입니다.';
    }
}

const me = new Person('heo', 28, 'Korea');
const you = new Person('kim', 28, 'England');

console.log(me.getName());
console.log(you.getName());