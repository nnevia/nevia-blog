---
title: "next 트러블 슈팅"
date: "2024-10-30"
excerpt: "next 프로젝트를 하면서 있었던 에러 정리"
image: "images.jpg"
tags: "next"

isFeatured: true
---

## 개요

next 프로젝트를 하면서 있었던 에러 정리

## 오류 목록

### Failed to process byte index 6 is out of bounds of '\ude'

**원인**
udemy 프로젝트를 하는 중, 프로젝트 폴더 이름이 `ude...` 로 작성되어서 생긴 오류

**해결 방안**
프로젝트의 폴더 이름을 바꾸거나 `ude`로 시작하지 않는 다른 경로로 이동

**참조**

https://stackoverflow.com/questions/77278303/next-js-13-error-byte-index-out-of-bounds-on-npm-run-dev

### Module not found: Can't resolve 'fs'

**원인**
클라이언트 측에서 `nodejs` 라이브러리를 사용하려고 할 때 발생하는 오류

**해결 방안**
루트 디렉토리에 `next.config.js` 생성 후 아래와 같이 설정

_webpack4_

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

_webpack5_

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

**참조**

https://cocoon1787.tistory.com/851
