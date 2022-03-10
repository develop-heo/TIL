# 클로저(Closure) 에 대해 알아보자

**클로저**는 함수와 함수가 선언된 어휘적 환경의 조합이다.
클로저하려면 자바스크립트가 어떻게 변수의 유효범위를 지정하는지 (Lexical scoping)을 먼저 이해해야 한다.
클로저는 여러 함수형 프로그랭밍 언어에서 등장하는 보편적인 특성.

> 클로저는 함수와 그 함수가 선언될 당시의 lexical environment의 상호관계에 따른 현상
> -MDN(Mozilla Developer Network)

클로저란, 어떤 함수에서 선언한 변수를 참조하는 내부함수에서만 발생하는 현상이다.
코드로 살펴보자.

```
var outer = function() {
  var a = 1;
  var inner = function() {
    console.log(++a);
  };

  inner();
};

outer();
```

```
function sum(num1) {
  return function (num2) {
    return num1 + num2;
  };
}

const sum5 = sum(5);
//sum5에는 sum함수 내부에서 5라는 숫자가 num1 에 바인딩 되어 있다
sum5(10); // 15
sum5(20); // 25
```

**클로저란 어떤 함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우 A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상**

## 은닉화

함수안에 값을 숨기고 싶을 때 클로저를 활용할 수 있다.

```
function a() {
  let temp = 'a';

  return tmep;
}

const result = a.temp // X
const result = a(); // O
console.log(temp); // temp is not defined
// 여기서, a함수 내부에 선언된 tmep 변수에는 어떻게 해도 접근할 수 없다.
// a함수 내부의 값을 확인하기 위해서는 a함수를 호출해야만 한다.
const result = a();
```

카운터 앱을 사용해 클로저에 대해 더 알아보자
아래와 같이 카운터 앱을 생성한다.

```
function CounterApp(initValue) {
  let countValue = initValue ?? 0;

  return {
    value: function () {
      return countValue;
    },
    increment: function () {
      countValue++;
    },
    decrement: function () {}
    countValue--;
  };
}

const counter1 = CounterApp(1);
const counter2 = CounterApp(2);

counter1.value(); // 1
counter2.value(); // 2

counter1.increment();
counter1.increment();
counter1.increment();
counter1.increment();

counter1.value(); // 5
counter2.value(); // 2
```

=> 동일한 함수로 각자 다른 counter를 만들었고 this도 없는데
초기값을 기억해놓고 캡처할 수 있는 함수를 만들고 클로저로 활용한 사례 </br>
counter1,2 에 대한 scope 값이 각각 그대로 유지가 된다. </br>
뿌리가 같은 함수에서 생성되었지만 값에 대한 변화는 완전히 다름 </br>
이것을 클로저를 활용한 은닉화라고 볼 수 있다.
