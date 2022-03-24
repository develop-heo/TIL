# 동기와 비동기 (Synchronous & Asynchronous)

<img src="../imgs/async.png" width="500px"  />

스레드 : 프로그램의 실행 단위
자바스크립트는 싱글스레드 언어이기 때문에 비동기 개념을 알아야한다!

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

```
[1,2,3].filter(function(el) {

})
```
