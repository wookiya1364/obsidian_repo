링크: [https://support.google.com/webmasters/thread/140556413/performance-requestidlecallback-and-time-to-interactive-lighthouse?hl=en](https://support.google.com/webmasters/thread/140556413/performance-requestidlecallback-and-time-to-interactive-lighthouse?hl=en)

*개요* 
- requestIdleCallback은 프레임이 끝날 때 유휴 시간이 있을 때 실행된다. 항상 모든 작업과 동일하지는 않으며 브라우저는 완전히 유휴 상태이다.
- requestIdleCallback 실행 => 콜백 함수가 발생
- 호출하는 함수에 따라 함수 자체가 스레드를 사용하고 TTI가 길어질 수 있다.
- TTI를 더 길게 만들 수 있다. TTI는 FCP가 트리거된 후 표시되는 페이지 요소의 이벤트 핸들러가 등록되고  페이지가 <= 50ms 내에 응답하는 지점을 측정한 것이다.
- 호출한 항목이 더 많은 핸들러 또는 요소를 추가하거나 브라우저를 사용하여 응답 시간이 50ms를 초과하는 경우 처음에 해당 스크립트 실행이 지연되었기 때문에 TTI가 전체적으로 길어진다.
- requestAnimationFrame 함수는 시스템이 프레임을 그릴 준비가 되면 애니메이션 프레임을 호출하여 애니메이션 웹페이지를 보다 원활하고 효율적으로 생성할 수 있도록 해준다. 실제 화면이 갱신되어 표시되는 주기에 따라 함수를 호출해주기 때문에 자바스크립트가 프레임 시작 시 실행되도록 보장해주어 위와 같은 밀림 현상을 방지해준다.

아래 이미지는 requestAnimationFrame 를 통해 애니메이션을 구현할 때, 각 프레임이 브라우저의 프레임 주기에 맞추어 일정한 시간 간격으로 렌더링됨을 보여준다. requestAnimationFrame 함수가 실행되면 브라우저는 다음 프레임이 그려지기 전에 함수를 실행하도록 예약하기 때문에 각 프레임이 정확히 16.6ms 간격으로 렌더링되게 되게 된다.

requestAnimationFrame(rAF) 함수도 setTimeout 이나 여타 이벤트 핸들러와 같이 "애니메이션 프레임"을 그리기 위한 콜백 함수를 등록하고 비동기 task로 분류하여 처리된다. 이때 중요한 특징은 rAF는 일반적인 task queue가 아니라 animation frame이라는 별개의 queue에서 처리된다는 점이다.

Animation frames 은 브라우저의 렌더링 엔진이 다음 프레임을 그리기 전에 실행해야 하는 rAF에 등록한 콜백 함수들을 담는 큐이다. 별도의 큐에서 적재되어 이벤트 루프에 의해 꺼내지기 때문에 실행이 뒤쳐지거나 하는 현상을 감소할수가 있다. 단, requestAnimationFrame도 브라우저의 CPU나 GPU 사용량 여부 등에 따라 콜백 함수 실행이 밀릴 수도 있다.

*절충점* 
- TTI가 높아진다는 부작용에도 불구하고 전반적으로 사용자 경험이 더 부드럽고 덜 버벅거리는 경우가 있을 수 있으며 상황을 더욱 악화시킬 수  있다.
- 그것은 단순한 수치로는 알 수 없다. (당신의 서비스에 직접적인 영향을 주는지 고려하라)
	- 타사 스크립트를 오프로드하는 다른 방법을 찾고 있다면 해당 스크립트를 메인 스레드에서 옮기는 것이 더 나은 만능 솔루션이 될 수 있다. 참고 링크: ** [https://github.com/BuilderIO/partytown](https://github.com/BuilderIO/partytown)**



**![](https://lh7-us.googleusercontent.com/w_WYlB3N1FXpoaCjP41XX5id8aRsDq16YhPElYYaD0GgZwrm59WA12cggkssMxfoyzQbKL51xaSRkOg84qKs7FNAbJUazJuUk7EdOiQTo1DJu8Gb2zppUw_sqUqsvDwe1UEQdomccD8b2bYWeEyJzDw)**
