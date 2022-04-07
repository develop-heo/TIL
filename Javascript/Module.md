# 모듈
모듈이란, 독립적인 특성을 가진 기능단위의 부품
=> 프로그램의 기능을 독립적인 부품으로 분리한 것
=> 동시에 여러 다른 모듈과 함께 조합하여 재사용될 수 있다.

## CommonJS
```
const module = require('module')

module.exports = module
```
서버에서 동작하며, 동기적으로 동작한다.


## AMD (Asynchronous Module Definition)
모듈을 선언하면서 의존하고 있는 모듈을 함께 명시
비동기적으로 의존 모듈을 불러온다
```
define(['module'], function(module) {
    return function() {

    }
})
```
브라우저에서 동작하며 비동기적인 특성을 가지고있다.
(최근에 amd가 많이 사용되지는 않는다.)

## umd (Universal Module Definition)
AMD와 CommonJS 두 방식 모두 지원
클라이언트, 서버 어디에서나 작동
```
function (root, factory) {
    if(typeof exports === 'object' && module.exports) {
        //CommonJS
        module.exports = factory(require('module'))
    } else if (typeof 'define' === 'function' && define.amd) {
        define(['module'], function (module) {})
    } else {
        // 전역 공간
        root.global = factory(root.module)
    }
} (this, function (module) {
    // 실제 모듈
})
```

## es-module

```
// es-module-export-default.js
export default function hello() {
    return 'hello'
}

// es-module-import-default.js
import hello from './es-module-export-default';

console.log(hello()); // hello
```
