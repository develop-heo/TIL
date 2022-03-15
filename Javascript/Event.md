# 이벤트란?

javascript 가 화면에 동적 요소를 추가해주는 것
dom node는 이벤트 객체를 가지고 있다.

```
const resetButton = document.querySelector(.reset');

resetButton.addEventListener('click', function(e) {
  console.log(e);
});

resetButton.removeEventListener('click', function(e) {
  console.log(e);
});
```

event는 절대 html 코드에서 inline으로 넣으면 안됨 (코드에 그대로 노출되기 때문)
스크립트에서 addEventListener를 이용해 이벤트를 추가하도록 한다.
자세한 내용은 DOM에서 알아보자.
