### render-blocking-resources
- 렌더링을 차단하는 리소스
- FCP가 느려지게 만드는 요소이다.
- [참조자료](https://dongwookit.tistory.com/253)
---

##### 개선 방법
1. 렌더링 차단 URL을 파악하기 위해 Lighthouse에서 Performance Test 이후, FCP 차단하는 모든 URL 검출
    - 정적 리소스를 인라인으로 전달한다. 즉, CSS, JS 파일을 HTML 문서에 직접 포함시켜 인라인으로 전달한다.
        > <span style="color:red; margin-right: 10px">*주의점*</span>  HTML 문서 크기를 증가시키기 때문에, 불필요한 리소스 또는 거대한 리소스는 인라인으로 전달하지 말 것
    - 정적 리소스는 페이지 로딩 후에 지연시켜서 가져온다. 즉, CSS, JS, image 파일은 페이지 로딩이 완료된 후 지연시켜서 로딩 속도를 개선한다.
        > defer, async, promise 등을 사용하여 리소스를 동적으로 로딩하도록 구현
    - 사용하지 않는 리소스는 제거한다.

\<script> 태그:
    