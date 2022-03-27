# 이벤트 다루기
javascript 이벤트는 전파된다.
전파에는 capturing과 bubbling 두가지 단계가 있다.


## 이벤트 버블링 (Event Bubbling)
이벤트가 하위 요소로부터 상위 요소로 전파가 된다.


## 이벤트 캡처링 (Event Capturing)
이벤트가 상위 요소에서 하위 요소로 전파가 된다.

## 이벤트 위임
이벤트 위임을 사용해서 여러개의 요소에 일일이 이벤트를 등록하지 않고 한 단계 위의 상위 요소에 이벤트를 한 번만 등록하고
재활용할 수 있는 방법.

## debounce
javascript에서 이벤트를 다룰 때 자원을 아껴야 되는 경우가 있음
아래 예제 코드를 통해 확인해보자.
```
let i = 0;

document.querySelector('input').addEventListener('keyup', () => {
    i = i + 1;
    console.log(i);
})
```
위와같이 클릭할 때 마다 이벤트를 발생시킬 경우, 아래와 같이 debounce 함수를 만들어 
마지막 호출 이후 일정 밀리세컨드 이후로 지연된 호출을 하도록 제어할 수 있다.
```
/**
* 실행시킬 함수, 지연시킬 밀리세컨드
**/
function debounce(callback, wait) {
    let timeout;

    // 함수가 호출될 때 마다 반환됨 
    return function (...args) {
        const context = this;

        // 타이머를 취소시켜준다.
        cleatTimeout(timeout);
        timeout = setTimeout(() => callback.apply(context, args), wait);
    }
};

document.querySelector('input').addEventListener('keyup', debounce(() => {
        i = i + 1;
        console.log(i);
    }, 1000)
);
```
**정리!** debounce 함수는 이벤트 발생이 많을 때 가장 마지막 이벤트만을 실행시킨다. (가장 마지막 이벤트를 실행시킬 시점은 매개변수로 넘겨주는 말리세컨드)

## throttle
throttle은 이벤트 발생이 많을 때 특정 밀리세컨드 동안 이벤트를 차단하고 단 한번만 실행시킨다.
debounce 함수와 비슷한데 아래 예제 코드를 통해 확인해보자.
```
/**
* 실행시킬 함수, 차단시킬 밀리세컨드
**/
function throttle(callback, wait) {
    let timeout = null;

    return function(...args) {
        const context = this;

        if(!timeout) {
            timeout = setTimeout(() => {
                callback.apply(this, args);
                timeout = null;
            }, wait);
        }
    }
};

window.addEventListener('scroll', throttle(() => {
        i = i + 1;
        console.log(i);
    }, 1000)
);
```

debounce, throttle 코드 익숙해질 때까지 코드 많이 보고 어떤 상황일 때 debounce와 throttle을 쓰는지 구분 할 수 있어야 함.