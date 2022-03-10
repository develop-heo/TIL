# Scope 에 대해..

Scope를 직역하자면, 보통 **범위**를 뜻한다.
scope 는 왜! 중요할까? </br>
Javasciprt 에서 scope는 "변수의 유효범위" 라고 할 수 있다.

우선, 변수를 선언하는 방법에는 var, let, const가 있다.
var는 태초의 javascript에서부터 있었고,
let, const 는 ES6(ES2015)에서 도입되었는데
이 둘의 유효범위는 조금 차이가 있다.

- var varVal = '함수단위'
- const constVal = '블럭단위'

그렇다면 이 차이를 아래 코드를 통해 확인해보자.

```

console.log(num); // test() 내에 있는 num이라는 변수는 함수 바깥에서 사용할 수 없다

function test() {
  var num = 123;

  return num;
}

console.log(test()); // 123 => 함수를 실행한 결과로서 test() 내에 있는 num 변수 사용가능
```

결론적으로, 함수든 블록이든
내부 -> 외부는 접근이 가능하지만
외부 -> 내부는 접근이 불가능

## +블럭 scope 에 대해서도 알아보자

```
for (var i = 0; i < 3; i++) {

}
=> for문의 바깥에서도 i에 접근이 가능하다

for (let i = 0; i < 3; i++) {

}
=> i는 for문이 내에서만 유효하다
```
