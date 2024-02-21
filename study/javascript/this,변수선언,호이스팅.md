#### this가 가르키는 것 (this 바인딩)

|호출|참조객체(단순호출)|참조객체(엄격모드)|
|--|--|--|
|<span style="font-weight:bold;">javascript</span>|globalThis|호출하는 방식에 의해 동적으로 결정|
|<span style="font-weight:bold;">browser</span>|window|호출하는 방식에 의해 동적으로 결정|
|<span style="font-weight:bold;">Node.js</span>|global|호출하는 방식에 의해 동적으로 결정|
|<span style="font-weight:bold;">arrow function</span>|자신을 감싼 정적 범위|자신을 감싼 정적 범위|

```javascript 
단순호출 : window

function f1() {
  return this;
}

// 브라우저
f1() === window; // true

// Node.js
f1() === global; // true
```

```javascript 
엄격모드 : 호출하는 방식에 의해 동적으로 결정된다.

예시1

function f2() {
  "use strict"; // 엄격 모드 참고
  return this;
}

f2() === undefined; // true

window.f2() === window; // true

============================================

예시2
function add(c, d) {
  return this.a + this.b + c + d;
}

const o = { a: 1, b: 3 };

// 첫 번째 인자는 'this'로 사용할 객체이고,
// 이어지는 인자들은 함수 호출에서 인수로 전달된다.
add.call(o, 5, 7); // 16

// 첫 번째 인자는 'this'로 사용할 객체이고,
// 두 번째 인자는 함수 호출에서 인수로 사용될 멤버들이 위치한 배열이다.
add.apply(o, [10, 20]); // 34

============================================

예시3
function f() {
  return this.a;
}

const g = f.bind({ a: "첫번째 변경" });
console.log(g()); // 첫번째 변경

const h = g.bind({ a: "두번째 변경" }); // bind는 한 번만 동작함!
console.log(h()); // 첫번째 변경

const o = { a: 37, f: f, g: g, h: h };
console.log(o.a, o.f(), o.g(), o.h()); // 37, 37, 첫번째 변경, 첫번째 변경

```

<br><br>

#### this에 원하는 객체를 지정하려면 call, apply, bind를 사용하여 전달한다.

```javascript
// call 또는 apply의 첫 번째 인자로 객체가 전달될 수 있으며 this가 그 객체에 묶임
var obj = { transferObj: "var " };
let letObj = { transferObj: "let " };
const constObj = { transferObj: "const " };

// 변수를 선언하고 변수에 프로퍼티로 전역 window를 할당
var transferObj = "전역 var";
let transferLetObj = "전역 let";
const transferConstObj = "전역 const";

function getThis() {
  console.log(this.transferObj); // 함수 호출 방식에 따라 값이 달라짐
//   console.log(this.transferLetObj); // undefined
//   console.log(this.transferConstObj); // undefined
}

getThis(); // 전역 var. 함수 내에서 설정되지 않았으므로 global/window 객체로 초기값을 설정한다.

getThis.call(obj); // var
getThis.apply(obj); // var
const varBind = getThis.bind(obj);
varBind(); // var

getThis.call(letObj); // let
getThis.apply(letObj); // let
const letBind = getThis.bind(letObj);
const letBind2 = varBind.bind(letObj); 
letBind(); // let
letBind2(); // var (bind는 한 번만 동작함!)


getThis.call(constObj); // const 
getThis.apply(constObj); // const 
const constBind = getThis.bind(constObj);
const constBind2 = varBind.bind(constObj);
constBind(); // const
constBind2(); // var (bind는 한 번만 동작함!)
```


<br><br>

#### 화살표 함수에서의 this
*  화살표 함수를 call(), bind(), apply()를 사용해 호출할 때 this의 값을 정해주더라도 무시한다. 
사용할 매개변수를 정해주는 건 문제 없지만, 첫 번째 매개변수(thisArg)는 null을 지정해야 한다.
* 어떤 방법을 사용하든 foo의 this는 생성 시점의 것으로 설정한다.(위 예시에서는 global 객체)
다른 함수 내에서 생성된 화살표 함수에도 동일하게 적용한다. 
this는 싸여진 렉시컬 컨텍스트의 것으로 유지한다.

```javascript

arrow function에서 this는 자신을 감싼 정적 범위. 
전역 코드에서는 전역 객체를 가리킨다.


const globalObject = this;
const foo = () => this;
console.log(foo() === globalObject); // true


// 객체로서 메서드 호출
const obj = { func: foo };
console.log(obj.func() === globalObject); // true

// call을 사용한 this 설정 시도
console.log(foo.call(obj) === globalObject); // true

// apply를 사용한 this 설정 시도
console.log(foo.apply(obj) === globalObject); // true

// bind를 사용한 this 설정 시도
const fooBind = foo.bind(obj);
console.log(fooBind() === globalObject); // true
```


<br><br>

#### 변수 선언

|변수|호이스팅|변수 초기화|업데이트|재선언|개체속성 업데이트|범위|
|--|--|--|--|--|--|--|
|var|O|undefined|O|O|O|전역 또는 함수|
|let|O|X|O|X|O|블록 ( {} )|
|const|O|X|X|X|△|블록 ( {} )|

```javascript
호이스팅: 변수와 함수 선언이 맨 위로 이동되는 매커니즘
변수 초기화: var => undefined / let => X / const => X

//var 해석 전
console.log(obj);
var obj = { transferObj: "var " }; //undefined

//var 해석 후
var obj;
console.log(obj); //undefined
obj = { transferObj: "var " };

//let
console.log(letObj); //Uncaught ReferenceError: letObj is not defined
let letObj = { transferObj: "var " }; //Uncaught ReferenceError: letObj is not defined

//const
console.log(constObj); //Uncaught ReferenceError: constObj is not defined
const constObj = { transferObj: "var " }; //Uncaught ReferenceError: constObj is not defined
```

<br><br>

```javascript

개체속성 업데이트

var obj = { transferObj: "var " };
obj = { transferObj: "V A R" };
console.log(obj); //{transferObj: 'V A R'}

let letObj = { transferObj: "let " };
letObj = { transferObj: "L E T" };
console.log(letObj); //{transferObj: 'L E T'}

const constObj = { transferObj: "const " };
constObj.transferObj = "C O N S T";
console.log(constObj); //{transferObj: 'C O N S T'}
constObj = { transferObj: "C O N S T 2" };
console.log(constObj); //Uncaught TypeError: Assignment to constant variable.
```