### [React Strict Mode](https://react.dev/reference/react/StrictMode)

- javascript는 'use strict' 구문으로 코드를 엄격하게 검사할 수 있는 엄격모드가 있다.
- React에서는 \<StrictMode>\<root/>\</StrictMode>와 같이 필요한 컴포넌트에 선별적으로 선언적 컴포넌트로 엄격모드를 사용할 수 있다.
- Next.js에서는 next.config파일에 "reactStrictMode: true" 옵션으로 엄격모드를 사용할 수 있다.

---

##### Strict Mode 역할
- 추가적인 렌더링을 실행하여 렌더링 관련 버그를 식별한다.
- useEffect를 두 번 실행하여 clean up 함수 누락과 같은 버그를 찾는다.
- deprecated API 사용을 감지한다.

---

##### 사용하는 이유
- React는 함수형 프로그래밍을 활용하여 컴포넌트를 구성하기 때문에, 모든 요소가 순수 함수라고 가정한다.
    > 즉, 동일한 입력 값에 대해 항상 동일한 JSX를 반환해야한다.
- Strict Mode는 순수하지 않은 코드, 함수를 식별하기 위해 일부 함수를 두 번 호출한다.
    > 1. 컴포넌트 함수 본문 (최상위 로직만 해당하므로, 이벤트 핸들러 내부의 코드는 포함X)
    > 2. useState, setfunction(setState), useMemo또는 useReducer에 전달하는 함수
    > 3. constructor, render, shouldComponentUpdate와 같은 일부 클래스 구성 요소 메서드