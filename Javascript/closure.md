# 클로저(Closure) 에 대해 알아보자

클로저는 여러 함수형 프로그랭밍 언어에서 등장하는 보편적인 특성.

> 클로저는 함수와 그 함수가 선언될 당시의 lexical environment의 상호관계에 따른 현상 -MDN(Mozilla Developer Network)

클로저란, 어떤 함수에서 선언한 변수를 참조하는 내부함수에서만 발생하는 현상
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

**클로저란 어떤 함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우 A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상**
