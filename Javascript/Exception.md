# 예외 처리
트랜잭션은 에러가 발생했을 때 에러를 되돌리는 형태를 뜻한다.
자바스크립트에서는 에러를 다루는 방법으로 예외처리가 있다.
예외처리는 에러를 처리하는 일종의 방법이다.

특정 코드를 실행했을 때 에러가 발생한다면 나머지 코드를 계속 실행하는 것은 의미가 없다.


## try-catch
기본적으로, 에러를 다루는 구문은 try-catch 이다.
아래 코드를 통해 확인해보자.
```
try {

} catch (e) {
    // try에서 에러가 발생할 경우 실행되는 구문

} finally {
    // 어떠한 상황에서도 실행
}

=> try문에서 에러가 발생하면 catch문의 매개변수인 e에 에러에 대한 정보가 담긴 객체가 담겨져 넘어온다.
```


## thorow - 에러 던지기
아래와 같이 throw문을 통해서 어떤 에러가 발생했는지 에러메시지를 지정하고 에러 발생 시 해당 메시지를 던져줄 수 있다.
```
function login (id, pw) {
    if(id == 'joy' && pw == 0000) {
        return true;
    }

    throw new Error('로그인 실패');
}

try {
    login('one', 1111);
} catch(e) {
    console.error(error);
    window.alert(error); //사용자에게 노출
} finally {
    console.info('로그인 시도 시간 : ' + new Date());
}
``` 


## 스택 - 추적
개발자에게 있어 가장 힘든 것 중 하나는 에러는 찾는 것일 텐데,
에러를 찾는 방법에는 디버깅을 하거나, 직접 코드를 실행시켜 찾아보는 등의 방법이 있다.
그중에서도 조금 쉽게 에러를 확인 할 수 있는 방법은, 
error.stack 을 통해 스택 형태로 쌓여서 기록된 에러를 확인하는 것이다.
```
try {

} catch (e) {
    console.error(e.stack);
}
```

## 커스텀 - 에러
프로그램이 거대해지고, 요구사항이 심화될 수록 에러 객체를 깊이 다뤄야 하는 경우가 있다.
에러객체에는 에러메시지, 스택, name, property 등 많은 정보들이 담겨져 있다.
심화된 에러를 다루는 방법 중 하나는 커스텀 Error 객체를 기본적인 Error 객체에서 확장한 형태로 만드는 것이다.
더욱 상세한 에러처리가 필요할 경우 계속해서 Error 객체를 확장해 커스텀 에러 클래스를 만들어 제어할 수 있다.
아래 예시를 통해 확인해보자.
```
/** 
* 커스텀 에러
** /
class LoginError extends Error() {
    constructor(message) {
        super(message);

        this.name = 'Login Error';
    }
}

function login (id, pw) {
    if (id != 'a') {
        throw new LoginError('아이디 불일치');
    }
}
