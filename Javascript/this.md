# this란?

Javascript 에서 함수의 this는 다른 언어와는 다르게 동작한다. (다른 대부분의 객체지향 언어에서 this == 클래스로 생성한 인스턴스 객체, 클래스에서만 사용가능)
Javascript에서 this는 어디서든 사용할 수 있고, 함수와 객체(메서드)의 구분이 느슨한 js에서 this는 이 둘을 구분하는 유일한 기능이다.
또한 strict mode와 strict mode 가 아닐 때에도 일부 차이가 있다.

### Strict Mode?

파일의 최상단에 'use strict'; 를 사용해서 정의되지 않은 변수에 값이 할당되지 않도록 해야한다.

```
'use strict';

function foo() {
  x = 10; // ReferenceError: x is not defined
}
foo();
```

'use strict' 는 scope에 국한시킬 수 있다.
하지만 코드의 최상단에 사용하지 않으면 제대로 동작하지 않기 때문에
항상 코드의 최상단에 입력해주도록 한다.

2020년에 도입된 ES2020(ES11) 에서는 globalThis가 도입되었다.
globalThis는 어디서든 접근할 수 있는 전역 객체이다.
(= self, frames)

## This

this는 자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 힌다
this는 scope와 관계가 있다. (scope는 다음 챕터에서 알아보자)

```
const circle = {
  // 프로퍼티: 객체 고유의 상태 데이터
  radius: 5,
  // 메서드: 상태 데이터를 참조하고 조작하는 동작
  getDiameter() {
    // 이 메서드가 자신이 속한 객체의 프로퍼티나 다른 메서드를 참조하려면
    // 자신이 속한 객체인 circle을 참조할 수 있어야 한다.
    return 2 * this.radius;
  }
};
console.log(circle.getDiameter()); // 10
```

javascript 에서 함수, 배열, 일반적인 객체 모두 객체에 속한다.
때문에 this는 객체에도 큰 영향을 줄 수 있다.
그래서 이 this가 어디에 묶어있는지 (바인딩 되어 있는지)에 따라
코드를 작성하는 시점과 동작하는 시점에서 차이가 있을 수 있다.

자바스크립트에서 this는 실행컨텍스트가 생성될 때 함께 결정됨.
대부분의 경우 **this의 값은 함수를 호출한 방법에 의해 동적으로 결정된다.**

this가 어떻게 달라지는지 아래 상황들로 알아보자.
기본적으로 this에는 호출한 주체에 대한 정보가 담긴다.

1. 전역공간에서의 this
   전역공간에서 this는 전역 객체를 가리킴.
   전역 컨텍스트를 생성하는 주체가 전역 객체이기 때문.
   브라우저 환경에서 전역객체는 window.
2. 메서드로서 호출할 때 메서드 내부에서의 this
   this에는 호출한 주체에 대한 정보가 담기는데, 어떤 함수를 메서드로서 호출하는 경우 호출 주체는 바로 함수명(프로퍼티명) 앞의 객체, 즉 호출되는 대상의 객체를 가리킨다. 점 표기법의 경우 마지막 점 앞 명시된 객체가 곧 this가 되는 것.
   (여기서 메서드는 객체의 키의 값으로 함수를 가지고 있는 경우)
   (method 앞에 점이 있으면 메서드로 호출한 것, 점이 없으면 함수로 호출한것)
3. 함수로 호출할 때 함수 내부의 this
   어떤 함수를 함수로서 호출할 경우에는 this가 지정되지 않는다.
   즉 함수에서의 this는 window를 가리킨다. (함수에서의 this는 전역공간을 가리킨다.)
   왜냐하면 함수로서 호출한느 것은 호출 주체를 명시하지 않고 개발자가 코드에 직접 관여해서 실행한 것이기 때문에 호출 주체의 정보를 알수 없는 것. 실행 컨텍스트를 활성화할 당시 this가 지정되지 않는 경우 this는 전역객체를 바라본다.

ES5는 함수를 어떻게 호출했는지 상관하지 않고 this값을 설정할 수 있는 bind 메서드를 도입했고,
ES2015 (ES6)는 스스로의 this 바인딩을 제공하지 않는 화살표 함수를 추가했다.

상황에 따른 this 바인딩 - 암시적인 this 바인딩

앞서 얘기한것 처럼, javascript의 this가 암시적이라서 예측하기 어렵고 scope와 실행되는 시점 등에 의해 많은것들이 바뀜
그렇다면, 암시적인 바인딩을 명시적인 바인딩으로 바꿔줘야 함
이를 위해서는 아래 함수의 내장 메서드들을 사용해야 한다.

- Function.prototype.apply()
- Function.prototype.bind()
- Function.prototype.call()

Javascirpt에 var 키워드를 사용하면 window객체에 생성이 되기 때문에 매우 위험하다.
전역객체에 속하기 때문에 누구든 수정이 가능해서 불안정함.

```
const person = {
  name: '준희',
  sayName: function() {
    return this.name + '입니다';
  }
};

const zero = {
  name: '베이스',
  sayName: function() {
    return this.name + '입니다';
  }
};

function sayFullName(firstName) {
  return firstName + this.sayName()
}

cosnt result = sayFullName.call(person, '허')
cosnt result2 = sayFullName.call(zero, 'Heo')
cosnt result3 = sayFullName.apply(person, ['허', 'Heo'])
const result4 = sayFullName.bind(zero, ['허', 'Heo'])
console.log(result);
```

call 메서드 사용 시 sayFullName의 첫번째 인자로 명시적으로 조작하고싶은 this의 대상,
두번째 인자로는 원본의 함수를 넣으면 된다.
즉, call 에 첫번째로 넣는 인자로 this가 명시적으로 바인딩 되는 것

apply 메서드는 call과 동일하지만 배열을 인자로 받을 수 있다.
두번째 인자로 들어오는 원본 함수가 배열일 때 사용할 수 있다.

bind 메서드는 말그대로 묶어놓는 것. bind 함수의 인자가 되는 원본 함수의 this를
내가 정의한 함수에 bind 할 수 있다.

콜백함수 내부의 this에는 전역 객체가 바인딩되는데 여기서 명시적 바인딩을 이용해
this를 지정해 줄 수 있다.

```
var value = 1;

const obj = {
  value: 100,
  foo() {
    console.log("foo's this: ", this); // {value: 100, foo: f}
    // 콜백 함수 내부의 this에는 전역 객체가 바인딩된다.
    setTimeout(function () {
      console.log("callback's this: ", this); // window
      console.log("callback's this.value: ", this.value); // 1
    })
  }
};

=> 여기서 setTimeout 함수에 명시적으로 obj를 binding 해주면 this는 obj가 됨
setTimeout(function () {
  console.log("callback's this: ", this); // {value: 100, foo: f}
  console.log("callback's this.value: ", this.value); // 100
}.bind(obj), 100);

obj.foo();
```
