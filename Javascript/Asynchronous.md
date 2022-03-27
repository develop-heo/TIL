# 동기와 비동기 (Synchronous & Asynchronous)

스레드 : 프로그램의 실행 단위 </br>
자바스크립트는 싱글스레드 언어이기 한번에 하나의 작업만 가능하다. 
그렇기 때문에 비동기 적으로 실행되는 작업 (ex.버튼클릭) 실행 시 순서대로 실행되는 동기처럼 맞춰주기 위헤서는 비동기 개념을 알아야한다! </br>
<img src="../imgs/async.png" width="500px"  />


아래는 일반적인 순차적으로 실행되는 동기 코드이다.
```
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);

```
아래는 비동기에 해당하는 코드이다.
```
const btn = document.querySelector('button');

// 사용가 버튼을 클릭할 때 마다 함수를 실행시킴 => 비동기
// 코드가 순차적으로 실행되다가 사용자가 버튼을 클릭할 때, 특정 코드를 실행시킨다는것이 비동기의 개념이라고 볼 수 있다.
// addEventListener라는 Web API 부터 동기가 아니다.
btn.addEventListener('click', () => {
  alert('You clicked me!');

  let pElem = document.createElement('p');
  pElem.textContent = 'This is a newly-added paragraph.';
  document.body.appendChild(pElem);
});
```

## 콜백(Callback)

비동기로 처리되는 순서를 원래대로 제어하기 위해 콜백함수를 사용할 수 있다.
콜백에는 다양한 종류가 있는데, 기본적으로 콜백 패턴은 함수의 사용권을 **위임**을 하는 것이다.

아래와 같이 콜백 함수를 이용하여 순서를 임의적으로 제어할 수 있다.

```
console.log('1');

setTimeout(() => {
  console.log('2');
}, 1000);

console.log('3');
```
```
console.log('1');

function setTimeoutWithCallback(callbackFunc) {
    setTimeout(() => {
      console.log('2');
      callbackFunc();
    }, 1000);
}

setTimeoutWithCallbakc(() => console.log('3'))
```


## Promise
Promises는 객체로 이루어져 있고, 비동기 작업을 도와준다. 또한 비동기 연산이 종료된 이후 완료/실패로 결과값을 나타낸다. 
Promise는 미래에 성공하거나 실패할 만한 값을 가지는 비동기 연산을 돕는 객체. 이 Promise 객체는 성공/실패를 상태로 가진다.
아래는 Promise.then()을 설명한는 코드다.
```
const promise1 = new Promise((resolve, reject) => {
  resolve('Success!');
});

promise1.then((value) => {
  console.log(value);
  // expected output: "Success!"
});
=> promise1 이라는 객체에 .으로 then을 연결하는 것을 then chaining(체이닝)이라고 한다.
then의 매개변수 value는 Promise객체의 첫번째 인자인 resolve이다. 
```

아래는 Promise.catch()를 설명하는 코드다. 
```
const promise1 = new Promise((resolve, reject) => {
  throw 'Uh-oh!';
});

promise1.catch((error) => {
  console.error(error); 
});
```
즉, 비동기 연산이 성공했을 경우 Promise.then() 메서드 (then 체이닝)으로 이어지고, 실패했을 경우 Promise.catch()로 이어진다.

위의 setTimeout 콜백함수를 사용한 코드를 Promise를 사용한 코드로 변경해보자.
```
const one = Promise.resolve('1');
const two = Promise.resolve('2');
const three = Promise.resolve('3');

one
  .then((oneRes) => {
    console.log(oneRes);

    return two;
  })
  .then((towRes) => {
    console.log(towRes);

    return three;
  })
  .then((threeRes) => {
    console.log(threeRes);
  })
  .finally(() => console.log('END'));
```


## async & await
async는 함수에 선언할 수 있는 일종의 키워드임. 함수 앞에 prefix로 사용할 수 있고, async 함수 내부에 await 키워드를 사용할 수 있다. (await는 then을 대체)
아래 예제 코드를 통해 확인해보자.
```
async function foo() {
  return 1
}
위 코드는 아래와 같다.
function foo() {
  return Promise.resolve(1)
  // return Promise.resolve(1).then(() => undefined)
}
=> async함수는 Promise객체를 반환하기 때문
```
await 연산자는 Promise를 기다리기 위해 사용된다. 연산자는 async function 내부에서만 사용할 수 있다. 
Promise와 비교했을 때, Promise는 then을 계속 return 해서(then 체이닝) scope를 유지시켜야 하지만 async&await는 함수 내부에서 자유롭게 scope를 사용할 수 있다. 