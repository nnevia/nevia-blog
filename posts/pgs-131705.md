---
title: "algorithm-삼총사"
date: "2024-03-21"
excerpt: 알고리즘 풀이
image: thumbnail.png
isFeatured: false
tags: "algorithm"
---

## 문제 설명

한국중학교에 다니는 학생들은 각자 정수 번호를 갖고 있습니다. 이 학교 학생 3명의 정수 번호를 더했을 때 0이 되면 3명의 학생은 삼총사라고 합니다. 예를 들어, 5명의 학생이 있고, 각각의 정수 번호가 순서대로 -2, 3, 0, 2, -5일 때, 첫 번째, 세 번째, 네 번째 학생의 정수 번호를 더하면 0이므로 세 학생은 삼총사입니다. 또한, 두 번째, 네 번째, 다섯 번째 학생의 정수 번호를 더해도 0이므로 세 학생도 삼총사입니다. 따라서 이 경우 한국중학교에서는 두 가지 방법으로 삼총사를 만들 수 있습니다.

한국중학교 학생들의 번호를 나타내는 정수 배열 number가 매개변수로 주어질 때, 학생들 중 삼총사를 만들 수 있는 방법의 수를 return 하도록 solution 함수를 완성하세요.

## 제한사항

- 3 ≤ number의 길이 ≤ 13
- 1,000 ≤ number의 각 원소 ≤ 1,000
- 서로 다른 학생의 정수 번호가 같을 수 있습니다.

## 입출력 예

<img src="ex.png" width="400" height="200" alt="ex" />

## 입출력 예 설명

- 입출력 예 #1
  문제 예시와 같습니다.
- 입출력 예 #2
  학생들의 정수 번호 쌍 (-3, 0, 3), (-2, 0, 2), (-1, 0, 1), (-2, -1, 3), (-3, 1, 2) 이 삼총사가 될 수 있으므로, 5를 return 합니다.
- 입출력 예 #3
  삼총사가 될 수 있는 방법이 없습니다.

### 나의 풀이

```jsx
function solution(number) {
  let answer = 0;
  for (let i = 0; i < number.length - 2; i++) {
    for (let j = i + 1; j < number.length - 1; j++) {
      for (let k = j + 1; k < number.length; k++) {
        if (number[i] + number[j] + number[k] === 0) {
          answer++;
        }
      }
    }
  }
  return answer;
}
```

### 2차 풀이 (구글)

```jsx
const NUM = 3;

function solution(number) {
  let ans = 0;
  const tmp = [];
  const backtrack = (cur) => {
    if (tmp.length === NUM) {
      ans += tmp.reduce((a, b) => a + b) ? 0 : 1;
      return;
    }

    for (let i = cur; i < number.length; i++) {
      tmp.push(number[i]);
      backtrack(i + 1);
      tmp.pop();
    }
  };

  backtrack(0);
  return ans;
}
```

중복을 허용해 r개 뽑는 경우 (순서 상관 X) (조합)

- 탐색 중인 인덱스(cur)를 인자로 설정하고, **다음 탐색에 i + 1을** 넘긴다.
- 현재 값 이후의 값만 선택하도록 해 중복을 제거한다.
