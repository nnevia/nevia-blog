---
title: "이미지 최적화로 성능 개선해보기"
date: "2025-03-05"
excerpt: "블로그에 이미지 사이즈를 최적화 해보자."
image: lighthouse.gif
isFeatured: false
tags: "next"
---

![image](nextjs-image2.webp)

# 개요

웹사이트 성능을 높이는 방법은 많지만, 가장 쉬우면서도 효과적인 방법 중 하나가 이미지 최적화입니다.
처음 Next.js를 사용하여 블로그를 만들 때는 이미지 최적화에 대해 깊게 생각하지 않았는데, 번들이나 다른 최적화를 알아보면서 next의 이미지 최적화에 대해 알아본 것을 정리하고자 합니다.
\
_+_ 추가적으로 lighthouse 성능도 체크해보았습니다.

# 왜 이미지 최적화를 해야 할까?

웹페이지에서 이미지가 차지하는 비중은 매우 큽니다. 특히, 사용자가 웹사이트를 방문할 때 가장 먼저 로드되는 요소 중 하나가 이미지이기 때문에, 이미지 최적화 여부가 페이지 속도와 사용자 경험에 직접적인 영향을 미칩니다.
페이지 로딩 속도가 느려지면 사용자는 쉽게 이탈하고, 이는 곧바로 SEO(검색 엔진 최적화)에도 영향을 미칩니다.
또한, Google Lighthouse에서는 이미지 최적화를 중요한 요소로 평가하며, 최적화되지 않으면 성능 점수가 낮아집니다.

이런 여러 이유도 있지만, 가장 중요한 것은 **사용자의 경험을 최적화**하는 것입니다.
로딩 속도가 빠르고, 데이터 사용량이 적으며, 선명한 이미지가 제공되는 환경은 결국 웹사이트의 성공과 직결되기 때문입니다. 그래서 Next.js를 사용할 때 이미지 최적화는 가장 먼저 고려해야 할 요소입니다.

## Next.js의 기본 이미지 최적화 기능

Next.js에는 `next/image`라는 강력한 이미지 최적화 컴포넌트가 있습니다.  
이걸 사용하면 자동으로 _웹 최적화된 포맷(WebP 등)으로 변환_, _지연 로딩(Lazy Loading) 지원_, _반응형 이미지 제공_ 같은 기능을 활용할 수 있습니다.

### ✅ 기존 `<img>` 태그 vs `next/image`

```js
// 일반 img 태그 사용
<img src='/images/sample.jpg' alt='일반 이미지' width={600} height={400} />;

// Next.js의 next/image 사용
import Image from "next/image";

<Image src='/images/sample.jpg' alt='최적화된 이미지' width={600} height={400} />;
```

기본 `<img>` 태그를 사용하면 브라우저가 직접 이미지를 처리하지만,
`next/image`는 자동으로 최적화를 적용해 줍니다.

### `next.config.js` 설정

```js
// 기존 config 파일에 images 설정 추가
const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        ///
      },
      webpack: (config) => {
        config.resolve.fallback = { fs: false };
        return config;
      },
      images: {
        formats: ["image/avif", "image/webp"],
      },
    };
  }
};
```

기존 이미지들은 `avif` 파일로 변환, `avif`를 지원하지 않는 파일은 `webp`로 설정하였습니다.
\
_기존 이미지 크기_
![image](11.jpg)
\
\
_`avif` 변경 후 이미지 크기_
![image](22.jpg)

## Lighthouse에서 이미지 최적화 효과 확인하기

### 1) 이미지 최적화 적용 전 Lighthouse 점수

![image](33.jpg)

프로젝트에서 `<img>` 태그를 사용하고 Lighthouse로 성능을 측정하면
보통 Performance 항목에서 "Properly size images", "Serve images in next-gen formats" 같은 경고가 뜹니다.
제 경우에는 Performance 점수가 60점대로 나왔습니다.

### 2) next/image 적용 후 Lighthouse 점수

![image](44.jpg)

next/image로 변경한 후 다시 측정해 보니, Performance 점수가 90점 이상으로 올랐습니다.
특히 "Serve images in next-gen formats" 관련 경고가 사라졌고, LCP(최대 콘텐츠 표시, Largest Contentful Paint) 시간이 단축되었습니다.
_페이지 내부 사진이 몇 개 없어서 점수가 비약적으로 오른 것도 있습니다._

### 포스트 글에서 HTML의 동적 img 파일을 next/image로 변환할 때의 문제점

이 블로그는 썸네일 이미지의 경우 위 같은 방식으로 헤더 image 컴포넌트만 따로 `next/image`로 변환 할 수 있지만 포스트 내부의 이미지는 따로 `next/image` 로 바꾸는게 오히려 더 부담일 수 있다고 합니다. 찾아보니
_블로그 글의 내용이 Markdown이나 CMS에서 동적으로 가져오는 경우, `next/image`는 정적 최적화를 적용할 수 없어 오히려 SSR(Server-Side Rendering) 비용이 증가할 수 있습니다. 또한, `next/image`는 내부적으로 width와 height가 필요하지만 블로그 내부의 이미지들은 크기가 동적으로 결정되는 경우가 많아 이를 적용하기 어려운 경우가 많습니다. 추가적으로, `next/image`는 기본적으로 클라이언트 측 JavaScript 처리가 필요하므로, 단순한 블로그 콘텐츠라면 오히려 기본 `<img>`태그가 더 빠를 수 있다는 점도 고려해야 합니다. 따라서 정적 파일이나 특정한 이미지 최적화가 필요한 경우에는`next/image`를 사용하는 것이 좋지만, 블로그 글 내부의 `<img>` 태그는 그대로 두는 것이 더 나을 수 있습니다._
라고 합니다. 요약을 해보면,

- 단순한 블로그 내부 md파일은 이래저래 `<img>` 태그가 더 빠를 수 있다.
- `next/image`가 빌드 시 최적화된 이미지를 생성하는 방식이다.

라고 정리 할 수 있을 거 같습니다.

## 결론

전체 `<img>`파일을 `next/image` 로 바꾸진 못했지만, Lighthouse 점수 개선에 즉각적인 효과가 있는 것을 확인했습니다.
다른 폰트 최적화나 정적 리소스 최적화 등 다른 최적화도 이후 시도해 볼 예정입니다.
