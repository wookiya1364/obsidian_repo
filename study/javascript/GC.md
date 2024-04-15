### GC

[참조자료](https://velog.io/@surim014/Experiments-with-the-JavaScript-Garbage-Collector)
[참조자료2](https://2ality.com/2014/01/eval.html)
[참조자료3](https://hacks.mozilla.org/2017/06/a-crash-course-in-memory-management/)
[참조자료4](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)

---

##### FinalizationRegistry
- javascript 객체가 GC에 수집되는 시점을 알아낼 수 있는 생성자

```jsx
const GC = new FinalizationRegistry(message => console.log(message));
let count = 0;
GC.register({}, ' has been collected');

function func() { 
    Array.from({ length: 50000 }, () => () => {});
	if (count > 5000) return;
	count++;
	func();
}

func();
```

