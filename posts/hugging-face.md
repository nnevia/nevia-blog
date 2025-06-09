---
title: "Hugging Face 찍먹해보기"
date: "2025-06-09"
excerpt: "텍스트 기반 감정 분석으로 음악 추천기 만들어보기"
image: "1.png"
isFeatured: false
tags: "project"
---

# 💡 왜 시작했나?

최근 취준 떄문에 기업들을 찾아보고 있는데, 기업들의 AI, 특히 딥러닝과 머신러닝 기술을 적극 활용하는 흐름을 보면서, 나도 간단하게나마 관련 기술을 체험해보고 싶었다. 학습 데이터를 수집하고 모델을 학습시키는 풀사이클을 바로 하기보다는, 이미 잘 만들어진 모델을 활용해보는 방식이 적절하다고 판단했고, 그래서 선택한 것이 바로 Hugging Face였다. 모델 검색도 간편하고, API 문서도 깔끔하게 정리되어 있어 입문용으로 적절했다.
**텍스트 감정 분석 → 감정에 맞는 음악 추천**
이라는 주제를 정하고, 프론트엔드에서 이 기능을 실제로 구현해보는 작업을 진행했다.

## 🔧 사용 기술

- Hugging Face Inference API
- CSS Module을 활용한 UI 구성
- 음악 추천: 감정 분류에 따른 YouTube 링크 매핑
- Multilingual Sentiment Analysis 모델: `nlptown/bert-base-multilingual-uncased-sentiment`
  -> 해당 모델은 텍스트의 감정을 1~5점으로 분류해준다. 숫자가 높을수록 긍정적인 감정이다.

## 🎯 목표

- 텍스트 입력을 받아 감정을 분석한다.
- 분석된 감정에 맞는 음악을 추천해준다.
- 프론트엔드 UI는 Next로 구현하고, 추후 다양한 기능을 탭으로 확장할 수 있도록 구조화한다.

### Hugging Face 모델 고르기

처음에는 한국어 감정 분석 모델을 찾았지만, 실제 API로 사용할 수 있는 모델은 대부분 영어 위주였다.
그래서 한국어 문장을 영어로 번역한 뒤, 영어 감정 분석 모델인
👉 [nlptown/bert-base-multilingual-uncased-sentiment](https://huggingface.co/nlptown/bert-base-multilingual-uncased-sentiment)
를 사용하기로 결정했다.
\
-감정 점수: 1–5단계 -응답 정확도: 영어 정확도 67%, ±1단계 95%
_~~영어 베이스 모델~~_ _한국어 일부 추가_
![2.png](2.jpg)

### 감정 결과 해석하기

응답 형태

```js
[
  [
    { label: "1 star", score: 0.05 },
    { label: "2 stars", score: 0.1 },
    { label: "3 stars", score: 0.15 },
    { label: "4 stars", score: 0.3 },
    { label: "5 stars", score: 0.4 },
  ],
];
```

응답은 2차원 배열 형태이며, `result[0]`은 각 감정 점수와 그 확률이다.

가장 높은 `score`를 가진 `label`이 최종 감정이다.

가장 높은 점수 뽑기

```js
const topLabel = result[0].reduce((a, b) => (b.score > a.score ? b : a), result[0][0]);
const score = parseInt(topLabel.label); // "5 stars" → 5
```

### 감정에 따른 음악 추천

감정 점수를 기준으로 음악을 추천하도록 구성했다.

```js
const musicMap = {
  5: {
    text: "😄 매우 긍정적인 감정 (기쁨, 사랑, 희망)",
    youtube: [
      ...
    ],
  },
  // 나머지 점수도 구성됨...
};
```

### 결과

![5.gif](5.gif)
평균 응답 지연: 약 600–800 ms (초당 1회 요청 기준)
최대 입력 길이: 512 tokens (대략 300~400자)

## 🐛 겪었던 이슈

- Hugging Face 모델 중 Inference API 비활성 상태인 경우가 많음
- 한국어 기반 모델 대부분 API 호출 불가 또는 느린 응답
- `.env`에 API 키를 넣어도 `process.env`가 클라이언트에서는 노출 안 되는 문제 → `NEXT PUBLIC prefix`로 해결
  결국 영어 기반 모델로 우회하면서 위 문제를 해결할 수 있었다. 모델 선택 시에는 Hugging Face 모델 페이지 상단의 `Inference API` 활성 여부 확인이 중요하다는 점을 알게 되었다.

## 마무리

이번 프로젝트는 기존 모델을 불러와서 프론트엔드에서 사용하는 방식에 대한 감을 익히기 위한 목적이 컸다.
직접 모델을 학습시키거나, 텍스트 전처리부터 fine-tuning까지 해보진 않았지만, 확실히 Hugging Face API를 통해 AI 활용의 입문 경험을 할 수 있었다.

다음에는 직접 데이터를 수집하고, 전처리와 학습, 모델 배포까지 이어지는 머신러닝/딥러닝 프로젝트에 도전해보고 싶다. 예를 들어 한국어 감정 분류 모델을 fine-tuning해서 음악 추천 정확도를 높이거나, PyTorch나 TensorFlow를 활용한 딥러닝 모델을 직접 구현해보는 것도 도전해보고 싶다.

향후에는 텍스트 요약, 이미지 생성, 챗봇 등의 기능도 작업실 탭에 하나씩 추가해볼 계획이다.
