# this

### javascript
- 전역 컨텍스트: 전역 실행 컨텍스트에서 this는 전역 객체를 가리킨다. 
브라우저에서는 window, Node.js에서는 global 객체이다.
- 함수 호출: 일반 함수로 호출할 때 this는 전역 객체를 가리키거나, 엄격 모드('use strict';)에서는 undefined
- 메서드 호출: 객체의 메서드로 호출할 때 this는 메서드를 호출한 객체를 가리킨다.
- 생성자 함수: new 키워드를 사용하여 생성자 함수를 호출하면, this는 새로 생성된 객체를 가리킨다.
- call, apply, bind 메소드: 이 메소드들을 사용하여 함수를 호출하면, this는 메소드의 첫 번째 인자로 명시적으로 설정된 객체를 가리킨다.

### NodeJS
- 전역 스코프: Node.js에서 전역 스코프의 this는 빈 객체를 가리키며, global 객체는 this를 통해 접근할 수 없다. global 객체 자체에 직접 접근해야 한다.
- 모듈 스코프: Node.js의 모듈에서 this는 현재 모듈을 가리키는 module.exports 객체를 참조한다. 이는 각 모듈이 별도의 스코프를 가지기 때문이다.

### 호출 방식에 따른 this 차이
- 직접 호출: 일반 함수로 this를 직접 호출하면, this는 전역 객체(브라우저) 또는 undefined(Node.js 엄격 모드)를 가리킨다.
- 메서드로 호출: 객체의 메서드로 함수를 호출하면, this는 그 메서드를 소유한 객체를 가리킨다.
- 화살표 함수: 화살표 함수에서 this는 함수가 생성된 시점의 this 컨텍스트를 "캡처"한다. 즉, 화살표 함수의 this는 정적으로 결정되며, 실행 시점에서 변경되지 않는다.


### 사용예시
#### 생성자 함수
```jsx
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.describe = function() {
    console.log(`이름: ${this.name}, 나이: ${this.age}`);
  };
}

const person1 = new Person('홍길동', 30);
person1.describe(); // "이름: 홍길동, 나이: 30" 출력
```
#### 직접 호출
```jsx
function showContext() {
  console.log(this);
}

showContext(); // 브라우저에서는 window를 출력, Node.js 엄격 모드에서는 undefined
```
#### 메서드로 호출
```jsx
const obj = {
  name: 'Grimoire',
  greet: function() {
    console.log(`Hello, ${this.name}!`);
  }
};

obj.greet(); // "Hello, Grimoire!" 출력
```
#### 화살표 함수 호출
```jsx
const obj = {
  name: 'Grimoire',
  greet: () => {
    console.log(`Hello, ${this.name}!`);
  }
};

obj.greet(); // 브라우저에서는 "Hello, undefined!" 출력 (화살표 함수의 this는 전역 객체 window를 가리키며, window.name은 일반적으로 정의되지 않음)
```
#### call, apply, bind 메소드
```jsx
function callGreet() {
  console.log(`안녕하세요, ${this.name}입니다.`);
}
function applyUpdate(age, occupation) {
  this.age = age;
  this.occupation = occupation;
}
function bindIntroduce() {
  console.log(`저는 ${this.name}이고, 직업은 ${this.occupation}입니다.`);
}

const callUser = { name: '이순신' };
callGreet.call(callUser); // "안녕하세요, 이순신입니다."

const applyPerson = { name: '장보고' };
applyUpdate.apply([applyPerson, '개발자']);
console.log(applyPerson); // { name: '장보고' }

const bindUser = { name: '유관순', occupation: '독립운동가' };
const bind = bindIntroduce.bind(bindUser);
bind(); // "저는 유관순이고, 직업은 독립운동가입니다."
```

---

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
  return (this.a || 0) + (this.b || 0) + c + d;
}  

function strictAdd(c, d) {
  'use strict';
  return (this.a || 0) + (this.b || 0) + c + d;
}

const obj = { a: 1, b: 3 };

// 첫 번째 인자는 'this'로 사용할 객체이고,
// 이어지는 인자들은 함수 호출에서 인수로 전달된다.
add.call(obj, 5, 7); // 16
strictAdd.call(obj, 5, 7) // 16


// 첫 번째 인자에 null을 넣으면 browser에서는 this가 window 객체를 호출한다.
// 엄격모드에서는 this가 null이므로 Cannot read properties를 발생시킨다.
add.call(null, 5, 7) // 12
strictAdd.call(null, 5, 7) // Uncaught TypeError: Cannot read properties of null (reading 'a')



// 첫 번째 인자는 'this'로 사용할 객체이고,
// 두 번째 인자는 함수 호출에서 인수로 사용될 멤버들이 위치한 배열이다.
add.apply(obj, [10, 20]); // 34

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

<br>

---

<br>

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
  console.log(this.transferLetObj); // undefined
  console.log(this.transferConstObj); // undefined
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


<br>

---

<br>

#### 화살표 함수에서의 this
*  화살표 함수를 call(), bind(), apply()를 사용해 호출할 때 this의 값을 정해주더라도 무시한다. 
사용할 매개변수를 정해주는 건 문제 없지만, 첫 번째 매개변수(thisArg)는 null을 지정해야 한다.
* 어떤 방법을 사용하든 하단 foo에서의 this는 생성 시점의 것으로 설정한다.(위 예시에서는 global 객체)
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

<br>

---

<br>

#### 객체의 프로토타입 체인에서의 this
- 함수를 어떤 객체의 메서드로 호출하면 this의 값은 그 객체를 사용

```javascript
var o = {
  f: function () {
    return this.a + this.b;
  },
};
var p = Object.create(o);
p.a = 1;
p.b = 4;

console.log(p.f()); // 5


var o = {
  d: {
      f: function () {
        return this.a + this.b + 5;
      },
  }
};

p.d.a = 1;
p.d.b = 2;
console.log(p.d.f()); // 8
```

<br>

---

<br>

#### 접근자와 설정자의 this
- 함수를 접근자와 설정자에서 호출하더라도 동일
- 접근자나 설정자로 사용하는 함수의 this는, 접근하거나 설정하는 속성을 가진 객체 취급

```javascript
function sum() {
  return this.a + this.b + this.c;
}

var o = {
  a: 1,
  b: 2,
  c: 3,
  get average() {
    return (this.a + this.b + this.c) / 3;
  },
};

Object.defineProperty(o, "sum", {
  get: sum,
  enumerable: true,
  configurable: true,
});

console.log(o.average, o.sum); // 2, 6

```

<br>

---

<br>

#### 생성자 this
- 함수를 new 키워드와 함께 생성자로 사용하면 this는 새로 생긴 객체 취급

```javascript
function C() {
  this.a = 37;
}

var o = new C();
console.log(o.a); // 37

function C2() {
  this.a = 37;
  return { a: 38 };
}

o = new C2();
console.log(o.a); // 38
```

<br>

---

<br>

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

<br>

---

<br>

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