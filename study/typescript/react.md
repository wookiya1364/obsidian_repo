# React의 타입들

- JSX.Element
- React.ReactElement
- React.ReactChild (deprecated)
- React.ReactNode
- React.PropsWithChildren
- React.FC (미사용 권장)


- React.HTMLAttributes<T>
    - 모든 HTML 요소에 공통적으로 사용할 수 있는 속성들의 집합을 정의
    - T는 HTML 요소 타입

- React.DOMAttributes<T>
    - DOM 요소의 이벤트 처리기를 포함
    - onClick, onSubmit, onChange와 같은 이벤트 핸들러들이 정의
