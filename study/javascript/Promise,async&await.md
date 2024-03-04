#### Promise, async&await

---

- ##### 비동기 작업을 수행하는 방법

|명칭|정의|
|--|--|
|Promise|1. <span style="font-weight:bold; color: blue;">ES6에서 도입했다.</span><br>2. 결과를 나타내는 상태값(state)으로 pending, fulfilled, rejected가 있다.<br>3. Promise는 resolve, reject를 호출하지 않으면 상태값이 pending이다.<br>4. resolve, reject에는 인수를 보내지 않거나 하나만 보낼 수 있다.<br>5. resolve에 인수를 보내면 상태값을 fulfilled로 변경하고, 인수를 반환한다.<br>6. reject에 인수를 보내면 상태값을 rejected로 변경하고, 인수를 반환한다.<br>7. resolve, reject를 호출해서 상태를 변경하면, 이후에 resolve나 reject를 호출해도 무시한다.|
|async, await|1. <span style="font-weight:bold; color: red;">ES7에서 도입했다.</span><br>2. async를 붙이면 해당 함수는 Promise를 반환한다.<br>3. Promise가 아닌 값을 반환해도 resolved Promise로 감싸서 Promise가 반환하도록 한다.|


- ##### Promise method chaning
|명칭|특징|
|--|--|
|Promise.then|1. 첫 번째 인수는 Promise 상태값이 fulfilled일 때 실행하는 함수이며, 실행 결과를 받는다.<br>2. 두 번째 인수는 Promise 상태값이 rejected일 때 실행하는 함수이며, 에러를 결과로 받는다.|
|Promise.catch|에러가 발생한 경우만 다루고 싶다면 사용한다. <br>then에 두 번째 인수를 전달한 것과 동일하게 동작한다.|
|Promise.finally|resolve, reject를 호출해서 상태값이 fulfilled이거나 rejected일 때만 실행한다. 성공이나 실패여부는 알 수 없다. method chaining에서 순서를 보장하기 때문에 아래와 같은 사용법도 가능하다.<br>1. finally...then...finally<br>2. then...catch...finally<br>3. finally...then...catch...finally|


|Promise 메소드|공통점|특징|
|--|--|--|
|Promise.all|순회 가능한 Promise 배열을 보낸다.|프라미스 배열 중에서 하나가 reject 될 경우, 다른 Promise도 같은 이유로 reject 한다.|
|Promise.allSettled|순회 가능한 Promise 배열을 보낸다.|프라미스 배열은 각각의 resolve, reject를 가질 수 있다.|
|Promise.race|순회 가능한 Promise 배열을 보낸다.|프라미스 배열 중에서 가장 먼저 resolve 하는 결과를 return|


```jsx
// Promise all, allSettled, race 예제

function func1(a, b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = a + b;
            resolve(`[func1] ${result}`);
        }, 2000);
    });
}
function func2(a) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = a * 2;
            resolve(`[func2] ${result}`);
        }, 500);
    });
}
function func3(a) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = a * 2;
            resolve(`[func3] ${result}`);
        }, 1500);
    });
}
function func4(a) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = a * 2;
            resolve(`[func4] ${result}`);
        }, 300);
    });
}
function func5(a) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = a * 2;
            reject(`[func5] ${result}`);
        }, 700);
    });
}

const allSettled = await Promise.allSettled(
    [
        func1(3, 2),
        func2(5),
        func3(5),
        func4(1),
        func5(6),
    ]
);
console.log(allSettled); 
/*
0:{status: 'fulfilled', value: '[func1] 5'}
1:{status: 'fulfilled', value: '[func2] 10'}
2:{status: 'fulfilled', value: '[func3] 10'}
3:{status: 'fulfilled', value: '[func4] 2'}
4:{status: 'rejected', reason: '[func5] 12'}
*/

const race = await Promise.race(
    [
        func1(3, 2),
        func2(5),
        func3(5),
        func4(1),
        func5(6),
    ]
);
console.log(race); // [func4] 2

const all = await Promise.all(
    [
        func1(3, 2),
        func2(5),
        func3(5),
        func4(1),
        func5(6),
    ]
);
console.log(all); // Uncaught [func5] 12
```


async/await는 비동기적인 작업을 처리할 수 있는 ES2017 문법 입니다. async 함수를 정의하면 함수 내부에서 await 키워드를 이용하여 비동기적으로 처리되는 작업이 완료될 때까지 기다린 후, 결과값을 반환하는 처리를 할 수 있습니다. async/await는 Promise를 기반으로 하며, 코드를 보다 간결하고 직관적으로 작성할 수 있도록 해줍니다. async 함수는 항상 Promise 객체를 반환하며, await 키워드를 이용하여 비동기 처리 결과를 기다립니다.





