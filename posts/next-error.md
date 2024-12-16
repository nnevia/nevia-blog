---
title: "next 에러 정리"
date: "2024-10-30"
excerpt: "블로그를 만들면서 있었던 nextjs 에러 정리"
image: "images.jpg"
tags: "next"

isFeatured: true
---

## 개요

블로그를 만들면서 있었던 오류 정리

## Error: failed to process byte index 6 is out of bounds of '\ude'

폴더 이름이 `ude...` 로 작성되어서 생긴 오류 \
폴더이름을 변경하니 해결 \
참조 https://jsgrow-dev.tistory.com/m/126

## Error: Module not found: Can't resolve 'fs'

클라이언트 측에서 `nodejs` 라이브러리를 사용하려고 할 때 발생하는 오류

### 해결방안

루트 디렉토리에 `next.config.js` 생성 후 아래와 같이 설정

**webpack4**

```js
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on 'fs' module
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },
};

module.exports = nextConfig;
```

**webpack5**

```js
const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};

module.exports = nextConfig;
```

참고링크
(https://cocoon1787.tistory.com/851)
