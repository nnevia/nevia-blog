---
title: "clean code에 관해"
date: "2025-03-25"
excerpt: "직관적으로 느끼는 좋은 코드는 어떤 코드일까?"
image: 1.gif
isFeatured: false
tags: "study"
---

# Clean Code란 무엇일까?

개발을 하다보면 가끔 내가 쓴 코드인데도 이해가 안되는 경우가 가끔 있다. 특히 시간이 지나서 보면 더 심하다. 아마 시간이 지나면서 문법이 달라졌을 수도 있겠지만, 결국 좋은 코드란 내가 아니라 **다른 사람이 봐도 쉽게 이해할 수 있는 코드**가 아닐까?
그냥 단순히 코드를 작성하는 건 어렵지 않다. 하지만 좋은 코드를 작성하는 건 또 다른 문제다. 특히 협업을 하다 보면 후반부엔 시간이 촉박해서 클린코드를 작성 하지 못하는 경우가 대다수다. 클린 코드란 과연 무엇일까?

## Clean code 란?

클린 코드는 단순히 "잘 정리된 코드"가 아니다. 유지보수성이 높고, 가독성이 뛰어나며, 의도가 명확한 코드다. 로버트 C. 마틴(Robert C. Martin)의 책 Clean Code에서는 클린 코드에 대한 여러 가지 원칙을 제시하는데, 그중에서 몇 가지 핵심 요소를 살펴보자.

## 클린 코드의 기준

### 의미 있는 이름 짓기

변수, 함수, 클래스 이름은 그 목적과 역할을 명확하게 드러내야 한다. 이름만 보고도 대략적인 기능이 떠올라야 한다.

❌ 안 좋은 예시:

```js
int d;
```

이게 날짜인지, 거리인지, 무슨 값인지 전혀 알 수 없다.

✅ 좋은 예시:

```js
int elapsedTimeInDays;
```

이름만 봐도 '경과 시간(일 단위)'라는 걸 알 수 있다. 이렇게만 해도 코드 읽는 속도가 확 달라진다.

프로젝트 초기에 `tempData`, `obj` 같은 애매한 변수를 많이 사용했었다. 그런데 시간이 지나고 보니 이 변수들이 어떤 역할을 하는지 전혀 기억나지 않았다. 결국 나중에 유지보수를 하면서 모두 의미 있는 이름으로 바꾸는 작업을 해야 했다. 처음부터 명확한 이름을 짓는 게 시간 절약이다.

### 그릇된 정보 피하기

이름을 지을 때, 잘못된 정보가 들어가면 오히려 혼란을 준다. 예를 들어 `accountList`라는 변수가 리스트가 아니라면?

❌ 안 좋은 예시:

```js
int accountList;
```

이름에 `List`가 들어가 있어서 배열이나 컬렉션 같은 느낌인데, 실제로는 `int` 형이다. 이러면 헷갈릴 수밖에 없다.

✅ 좋은 예시:

```js
int accountCount;
```

이렇게 정확한 의미를 전달하는 이름을 사용해야 한다.

### 함수는 한 가지 일만 하도록

하나의 함수가 여러 가지 일을 하면, 어디서 버그가 나는지도 파악하기 어렵다.

❌ 안 좋은 예시:

```js
public void processOrder(Order order) {
validateOrder(order);
calculateTotal(order);
applyDiscount(order);
saveToDatabase(order);
sendEmailConfirmation(order);
}
```

이 함수는 검증, 계산, 저장, 이메일 전송까지 전부 다 하고 있다. 만약 문제가 생긴다면 어디서 터진 건지 찾기도 어렵다.

✅ 좋은 예시:

```js
public void processOrder(Order order) {
if (!isValid(order)) {
throw new InvalidOrderException();
}
double total = calculateTotal(order);
double discountedTotal = applyDiscount(total);
saveOrder(order, discountedTotal);
sendConfirmationEmail(order);
}
```

각 작업을 따로 함수로 빼면 가독성이 좋아지고, 디버깅도 훨씬 쉬워진다.

유지보수하면서 가장 힘들었던 부분이 "이 함수가 대체 뭘 하는 거지?"였다. 함수가 너무 많은 역할을 하다 보니, 특정 기능만 수정하고 싶어도 부작용이 발생하는 경우가 많았다. 결국 함수는 작게 나누고, 한 가지 역할만 하도록 만들어야 한다는 걸 깨달았다.

### 명령과 조회를 분리하기

함수는 '무언가를 변경하는 명령'과 '값을 조회하는 기능'을 따로 나눠야 한다. 두 가지를 섞어버리면 코드가 예상과 다르게 동작할 수 있다.

❌ 안 좋은 예시:

```js
public boolean set(String attribute, String value) {
    // 설정 로직
}
if (set("username", "newUser")) {
    // 설정을 한 건지, 값을 조회한 건지 알 수 없음
}
```

✅ 좋은 예시:

```js
public void setAttribute(String attribute, String value) {
    // 설정 로직
}
public boolean isAttributeSet(String attribute) {
    // 조회 로직
}
```

이렇게 명령과 조회를 분리하면 코드의 의도가 훨씬 명확해진다.

### 코드 스타일 통일하기

코드 스타일이 들쭉날쭉하면 협업이 어려워진다. 카멜케이스(camelCase), 파스칼케이스(PascalCase), 스네이크케이스(snake_case) 등 일관된 네이밍 규칙을 유지해야 한다.

- **카멜케이스 (camelCase)**: 변수명, 함수명 (getUserData)

- **파스칼케이스 (PascalCase)**: 클래스명 (UserController)

- **스네이크케이스 (snake_case)**: 상수명 (MAX_CONNECTIONS)

### 불필요한 주석 줄이기

❌ 안 좋은 예시:

```js
// 사용자의 이름을 가져옴
String n = u.getNm();
```

✅ 좋은 예시:

```js
String userName = user.getName();
```

사실 이것저것 배우고 있기도 하고, 따로 주석이 없을 때 이해하기 힘든 부분이 확실히 있다고 생각하기 때문에 개인적으론 주석을 많이 다는 편이다.
다른 글들을 참고해보면 실행속도보단 읽어오는데서 오는 속도차이가 날 수 있다곤 하는데 간단한 프로그램에 주석을 **1.1mb** 달아서 테스트 해보면 **0.000011**초 정도 차이가 난다고 한다.
미미한 수준이지만 대규모 프로젝트로 갈수록 신경을 쓸 여지가 있다고 생각한다.

### 코드의 _*나쁜 냄새*_ 를 감지하고 제거하자

클린 코드를 유지하기 위해서는 _코드의 나쁜 냄새(Code Smell)_ 를 감지하고 수정하는 것이 중요하다. 대표적인 나쁜 냄새로는 아래와 같은 것들이 있다.

- 중복 코드: 같은 기능을 하는 코드가 여러 곳에서 반복되는 경우

- 긴 함수: 한 함수가 너무 많은 일을 하는 경우

- 의미 없는 변수명: 변수가 어떤 역할을 하는지 명확하지 않은 경우

- 과도한 주석: 주석이 없으면 이해하기 어려운 경우(주석 없이도 이해할 수 있도록 네이밍과 구조를 개선하는 것이 중요)

## 마무리하며

클린 코드는 단순히 **깔끔한 코드**가 아니라 **함께 일하기 좋은 코드**라고 생각한다. 유지보수가 어렵고 이해하기 힘든 코드는 결국 팀 전체의 생산성을 낮춘다.

내가 짠 코드가 나중에도 이해하기 쉽고 유지보수하기 좋다면, 그게 바로 좋은 코드가 아닐까?

아직도 클린 코드에 대해 배워가는 중이지만, 앞으로 더 좋은 코드를 짜기 위해 계속 고민해볼 생각이다. 개발자로서 성장하면서 클린 코드의 기준도 더 명확해질 거라고 믿는다.

## 관련 자료

https://www.samsungsds.com/kr/insights/cleancode-0823.html?referrer=https://talkwithcode.tistory.com/73
https://medium.com/naver-cloud-platform/%EB%84%A4%EC%9D%B4%EB%B2%84%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%8A%A4%ED%86%A0%EB%A6%AC-%EC%A2%8B%EC%9D%80-%EC%BD%94%EB%93%9C%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%BC%EA%B9%8C-%ED%81%B4%EB%A6%B0%EC%BD%94%EB%93%9C-%EC%9D%B4%EC%95%BC%EA%B8%B0-c7811f73a46b
