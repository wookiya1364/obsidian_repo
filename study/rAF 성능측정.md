링크: [https://support.google.com/webmasters/thread/140556413/performance-requestidlecallback-and-time-to-interactive-lighthouse?hl=en](https://support.google.com/webmasters/thread/140556413/performance-requestidlecallback-and-time-to-interactive-lighthouse?hl=en)

requestIdleCallback은 프레임이 끝날 때 유휴 시간이 있을 때 실행된다. 
이는 항상 모든 작업과 동일하지는 않으며 브라우저는 완전히 유휴 상태이다.

이를 사용하여 호출하는 함수는 여전히 TTI를 연장할 수 있다.

프레임에는 끝에 시간이 있다. => requestIdleCallback 실행 => 콜백 함수가 발생

호출하는 함수에 따라 함수 자체가 스레드를 사용하고 TTI가 길어질 수 있다.

TTI를 더 길게 만들 수 있다. 
TTI는 FCP가 트리거된 후 표시되는 페이지 요소의 이벤트 핸들러가 등록되고 
페이지가 <= 50ms 내에 응답하는 지점을 측정한 것이다. 

즉, 호출한 항목이 더 많은 핸들러 또는 요소를 추가하거나 브라우저를 사용하여 응답 시간이 50ms를 초과하는 경우 처음에 해당 스크립트 실행이 지연되었기 때문에 TTI가 전체적으로 길어진다.

절충점: TTI가 높아진다는 부작용에도 불구하고 전반적으로 사용자 경험이 더 부드럽고 덜 버벅거리는 경우가 있을 수 있으며 상황을 더욱 악화시킬 수도 있습니다.

그것은 단순한 수치로는 당신에게 줄 수 없는 것입니다.

타사 스크립트를 오프로드하는 다른 방법을 찾고 있다면 해당 스크립트를 메인 스레드에서 옮기는 것이 더 나은 만능 솔루션이 될 수 있습니다. 아마도 다음을 시도해 보세요:  [https://github.com/BuilderIO/partytown](https://github.com/BuilderIO/partytown)**