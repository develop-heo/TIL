# 프로토타입이란?

자바스크립트는 프로토타입 기반 언어이다. 내가 어떤 변수를 선언하든 (값을 만들던) 무조건 **proto**라는 값을 가지고 있다.

## consturctor (생성자 함수)

생성자는 모든 자바스크립트 함수 내부에 존재한다.
모든 객체와 값들은 생성자 함수를 가지고 있다.

## \_\_proto\_\_

getter, setter와 비슷한 역할을 한다고 보면 된다.
\_\_proto\_\_ 는 자바스크립트의 프로토타입에 직접 접근하는 것이 아니라
접근제어자로 접근하도록 도와주는 것.
하지만, 던더프로토는 사용하지 않는 것이 좋다.
대신에

```
Object.getPrototypeOf
Object.setPrototypeOf
```

메서드를 사용하는 것을 권장한다.

## 프로토타입 체인

```
const animal = {
  sayName() {
    return 'ANIMAL';
  }
};

const dog = Object.create(animal);
dog.sayName(); //ANIMAL
```

우리가 만드는 인스턴스는 내부에 프로토타입을 정의하지 않아도 프로토타입 관련
메서드들을 활용할 수 있는데, 이를 프로토타입 체이닝이라고 한다.

## 프로토타입 확장 (extends, 상속)

보통 부모와 자식으로 표현되는데, 상속보다는 확장이라는 개념으로 표현하는 것이 맞다.
확장되면 부모보다 자식이 더 많은것을 가질 수 있다.

아래 코드는 Animal이라는 생성자 함수를 확장해서 Friends 생성자 함수를 만들고
Friends로 Animal에 있는 메서드와 속성을 확장해서 사용하는 예제이다.

```
// Super Class
function Animal(name, sound) {
  this.name = name;
  this.sound = sound;
}

Animal.prototype.getInfo = function() {
  return (
    this.name + '가(이) ' + this.sound + ' 소리를 낸다.';
  );
};

// Sub Class
function Friends(name, sound) {
  Animal.call(this, name, sound);
};

Friends.prototype = Object.create(
  Animal.prototype;
);

Friends.prototype.constructor = Friends;

const dog = new Friends('개', '멍멍');
const cat = new Friends('고양이' '야옹');

dog.getInfo(); //개가(이) 멍멍 소리를 낸다.
cat.getInfo(); //고양이가(이) 야옹 소리를 낸다.

dog.constructor.name; // Friends
cat.constructor.name; // Friends

dog instanceof Friends // true
dog instanceof Animal // true
=> Animal에서 Friends가 확장이 되었고 Friends에서부터 dog 가 인스턴스화됨
```

위 코드는 너무 복잡한 과정이므로 Class 에서 다시 다루도록 한다.
