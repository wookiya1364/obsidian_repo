const KeybyObject = (object) => ({ target: object });
const InspectObjectType = (value) => {
  // 원시 타입 처리
  if (
    value === null ||
    (typeof value !== "object" && typeof value !== "function")
  ) {
    return value;
  }

  // 함수 처리
  if (typeof value === "function") {
    return `Function: ${value.name || "anonymous"}`;
  }

  // 배열 처리
  if (Array.isArray(value)) {
    const elements = value.slice(0, 10).map(InspectObjectType); // 성능을 위해 처음 10개 요소만 처리
    return JSON.stringify(elements);
  }

  // 객체 처리
  const entries = Object.entries(value).slice(0, 10); // 성능을 위해 처음 10개 키-값 쌍만 처리
  const props = entries.map(
    ([target, val]) => `${target}: ${InspectObjectType(val)}`
  );
  return `{${props.join(", ")}}`;
};

// 객체 추적기를 생성하는 함수
const Chaser = () => {
  const weakCache = new WeakMap();
  const finalReg = new FinalizationRegistry((object) => {
    const message = `${JSON.stringify(object).replaceAll('\\', '')} has been collected by the G.C`;
    console.info(message);
    return message;
  });

  return (object) => {
    const identifier = InspectObjectType(object);
    if (!weakCache.has(object)) {
      // 데이터를 WeakMap에 저장
      weakCache.set(KeybyObject(identifier), identifier);
      // finalReg에 객체를 등록. 여기서 객체가 수집될 때 콜백으로 전달할 이름을 지정합니다.
      finalReg.register(KeybyObject(identifier), KeybyObject(identifier));
    }
  };
};

// Chaser 인스턴스 생성
let chaser = Chaser();

// 예시 객체
let tt = {
  type: "string222",
  data: "TEST312312",
};

let rr = tt;

// 배열을 추적하려면 배열의 참조를 유지해야 합니다.
let myArray = ["example"];

// 추적기에 객체 등록
// chaser(tt);
// chaser(myArray);
chaser([1, 2, 3, 4, 5, 6, 7, console, console.log]);
chaser(1);
chaser([1, 2, 3, 4, 5, 6, 7, console.warn, console.log]);
chaser(["DDD"]);
chaser(myArray);

let counter = 0;
// 메모리 할당을 유발하여 가비지 컬렉션을 자극하는 함수
(function allocateMemory() {
  // Allocate a large number of functions — a lot of memory!
  Array.from({ length: 5_000 }, () => () => {});
  if (counter > 10_000) return;
  counter++;
  setTimeout(allocateMemory);
})();
