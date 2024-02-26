### CSRF, XSS

- #### CSRF
  - (Cross-Site Request Forgery)는 신뢰할 수 있는 사용자를 사칭하여 웹사이트에 원치 않는 명령을 내리는 공격
  - 예를 들어, 아래와 같이 다른 곳으로 이동한다고 주장하는 링크 뒤에 있는 URL 에 악성 매개변수를 포함
  ```jsx
  <img src="https://www.example.com/index.php?action=delete&id=123" />
  ```

---
CSRF 공격을 막기 위해서는 서버에서 CSRF Token을 생성하여 세션에 저장하고, 프론트엔드에서 요청 시 해당 Token을 함께 전송하여 인증합니다. SameSite 속성을 쿠키에 설정하여 도메인이 다른 사이트에서는 쿠키를 사용할 수 없도록 제한하는 방법도 있습니다. XSS 공격을 막기 위해서는 입력 값들을 유효성 검증하고, 특수문자들을 제외하는 정규식을 통해서 제거합니다. 또, 서버에서 CSP(Content-Security-Policy)정책을 설정하여, 허용된 스크립트만 실행되도록 제한 할 수도 있습니다. 마지막으로, HTTP 대신에 신뢰할 수 있는 HTTPS를 사용하여 통신 프로토콜을 암호화할 수 있습니다.