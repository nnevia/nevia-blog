---
title: "Next.js 번들 사이즈 최적화"
date: "2025-01-05"
excerpt: Next의 번들 사이즈를 최적화 하는 방법을 알아보자
image: image.webp
isFeatured: false
tags: "next"
---

## 개요

Next.js 애플리케이션의 번들 사이즈가 커지면 성능 저하와 로딩 속도 문제를 초래할 수 있습니다. \
따라서 번들 크기를 최소화하는 것은 사용자 경험을 향상시키는 중요한 요소입니다. \
이 글에서는 Next.js에서 번들 사이즈를 줄이는 다양한 방법을 소개합니다.

## 번들 사이즈 확인하기

Next.js는 빌드 시 next build 명령어를 실행하면 각 페이지의 번들 사이즈를 분석하여 제공합니다.

빌드가 완료되면 터미널에서 각 페이지의 번들 크기를 확인할 수 있습니다. 특히 First Load JS 크기를 줄이는 것이 중요합니다.

또한, @next/bundle-analyzer 패키지를 사용하여 시각적으로 번들 내용을 분석할 수도 있습니다.

```js
npm install @next/bundle-analyzer
```

next.config.js 파일을 수정하여 분석 기능을 활성화할 수 있습니다.

```js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({});
```

\
\
이제 다음 명령어를 실행하면 번들 분석 페이지를 확인할 수 있습니다.

```js

ANALYZE=true next build
```

## 불필요한 패키지 제거 및 경량화

불필요한 패키지를 제거하고 가벼운 대체 패키지를 사용하는 것도 효과적인 방법입니다.

### Moment.js 대체

moment.js는 매우 크므로 date-fns 또는 dayjs 같은 가벼운 라이브러리로 교체하는 것이 좋습니다.

`npm install date-fns`

```js
import { format } from "date-fns";

const date = new Date();
console.log(format(date, "yyyy-MM-dd"));
```

### Lodash 최적화

lodash를 사용할 경우 필요한 기능만 개별적으로 임포트하면 번들 크기를 줄일 수 있습니다.

```js
import debounce from "lodash/debounce";
```

## 코드 스플리팅 활용하기

Next.js는 기본적으로 코드 스플리팅을 지원하지만, 아래 방법을 추가하면 더욱 최적화할 수 있습니다.

### 동적 로딩 (next/dynamic)

next/dynamic을 사용하면 특정 컴포넌트를 필요할 때만 로드할 수 있습니다.

```js
const HeavyComponent = dynamic(() => import("../components/HeavyComponent"), {
  ssr: false,
});

export default function Page() {
  return <HeavyComponent />;
}
```

**ssr: false 옵션을 사용하면 클라이언트 사이드에서만 로드됩니다.**

### Webpack Chunking 활용

Next.js 12부터 Webpack 5가 기본 적용되며, splitChunks 설정을 통해 번들을 최적화할 수 있습니다. next.config.js에서 설정을 조정할 수 있습니다.

```js
module.exports = {
  webpack(config) {
    config.optimization.splitChunks = {
      chunks: "all",
    };

    return config;
  },
};
```

## 이미지 및 폰트 최적화

### next/image 사용

Next.js의 next/image 컴포넌트를 사용하면 이미지 최적화가 가능합니다.

```js
import Image from "next/image";

<Image src='/example.jpg' width={500} height={300} alt='Example' />;
```

### 폰트 최적화

웹 폰트를 직접 로드하면 번들 크기가 증가할 수 있습니다. next/font를 활용하여 폰트를 최적화할 수 있습니다.

```js
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
```

## 환경 변수 및 설정 최적화

### production 모드에서 개발 코드 제거

*process.env.NODE_ENV*를 활용하여 개발용 코드가 프로덕션 번들에 포함되지 않도록 할 수 있습니다.

```js
if (process.env.NODE_ENV === "development") {
  console.log("이 코드는 개발 환경에서만 실행됩니다.");
}
```

### Tree Shaking 활성화

ESM(ES Modules)을 지원하는 라이브러리를 사용하면 Tree Shaking이 활성화됩니다. *package.json*에서 *sideEffects: false*를 추가하면 불필요한 코드가 제거됩니다.

```js
{
"sideEffects": false
}
```

## 마무리

Next.js에서 번들 사이즈를 줄이는 방법은 여러 가지가 있으며, 이를 통해 성능을 향상시키고 사용자 경험을 개선할 수 있습니다.

번들 크기 분석 (@next/bundle-analyzer 활용)

불필요한 패키지 제거 및 경량화 (moment.js 대체, Lodash 최적화)

코드 스플리팅 (next/dynamic 활용, Webpack 최적화)

이미지 및 폰트 최적화 (next/image, next/font 활용)

환경 변수 및 설정 최적화 (production 모드, Tree Shaking 활성화)
