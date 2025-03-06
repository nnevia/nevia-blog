---
title: "Yarn 설치 및 사용법"
date: "2024-11-26"
excerpt: Yarn의 설치 방법과 사용법을 알아보자.
image: 2.png
isFeatured: false
tags: "study"
---

## 개요

<img src="1.jpg" width="400" height="200" alt="yarn" />

[1차프로젝트](https://github.com/gooormmoon/algorithm-fighter-front) 때 npm을 쓰면서 여러가지 이유모를? 오류들이 종종 발생해서 꽤나 애를 먹었습니다. 예를들어, 팀원과 동일한 패키지 버전을 설치했는데도 팀원들과 환경이 달라지거나, 네트워크 문제로 패키지 설치가 중단되는 경우가 있었는데 그 때 Yarn으로 패키지를 바꾼 후 이런 문제들이 눈에 띄게 줄어들었습니다.
이번 글에선 Yarn의 설치 방법과 사용법을 공유하면서, npm에서의 문제들이 Yarn을 통해 어떻게 해결되었는지도 이야기 해보려고 합니다.

### npm을 사용하면서 겪었던 문제

- 의존성 충돌: npm은 `package-lock.json`을 사용해 의존성 버전을 관리하지만, 팀원들 간 환경 차이로 동일한 설정에서도 설치되는 모듈 버전이 달라지는 문제가 발생했습니다.
- 캐싱 기능 부족: 한 번 설치한 패키지도 다시 설치할 때마다 네트워크를 통해 내려받아야 했습니다.

이러한 문제들이

- 일관성 있는 의존성 관리: `yarn.lock` 파일을 통해 동일한 패키지와 버전을 유지할 수 있어, 팀 프로젝트 시 환경 차이로 인한 오류가 줄었습니다.
- 강력한 캐싱 기능: 이미 설치한 패키지는 오프라인에서도 재설치할 수 있어 네트워크 문제를 피해갈 수 있었습니다.

## Yarn 설치

Yarn은 다양한 운영 체제에서 설치할 수 있습니다.

### macOS

Homebrew를 사용한 설치 방법입니다.

```js
brew install yarn
```

NVM(Node Version Manager)과 같은 버전 관리 툴을 사용한다면 Node.js 설치를 제외할 수 있습니다.

```js
brew install yarn --without-node
```

### Windows

Windows에서는 Chocolatey 또는 Scoop을 사용하여 설치할 수 있습니다.

```js
# Chocolatey
choco install yarn

# Scoop
scoop install yarn
```

## npm을 사용한 설치

npm을 통해 Yarn을 설치할 수도 있습니다.

```js
npm install -g yarn
```

### 설치 확인

Yarn이 올바르게 설치되었는지 확인하려면 다음 명령어를 사용합니다.

```js
yarn --version
```

### 환경 변수 설정

전역 사용에 문제가 있다면 Path 설정을 추가해야 합니다. `.profile` `.bash_profile` `.bashrc` `.zshrc` 파일에 다음을 추가합니다.

```js
export PATH="$PATH:/opt/yarn-[version]/bin"
```

## Yarn 사용법

Yarn은 NPM을 사용해 본 경험이 있다면 쉽게 사용할 수 있습니다.

### 프로젝트 초기화

프로젝트를 시작할 때 `package.json`을 생성하려면 다음 명령어를 사용합니다.

```js
yarn init
```

### 의존성 모듈 설치

`package.json`으로부터 의존성 모듈을 설치할 때는 다음과 같이 명령어를 입력합니다.

```js
yarn

# 또는

yarn install
```

### 패키지 추가

의존성 모듈을 추가하려면 `yarn add` 명령어를 사용합니다.

```js
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```

다른 범주의 의존성을 추가할 수도 있습니다.

```js
# 개발용 의존성

yarn add [package] --dev

# Peer 의존성

yarn add [package] --peer

# 선택적 의존성

yarn add [package] --optional
```

### 패키지 업그레이드

패키지를 업그레이드하려면 다음 명령어를 사용합니다.

```js
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

패키지 제거

불필요한 패키지를 제거할 때는 다음과 같이 입력합니다.

```js
yarn remove [package]
```

### yarn.lock 파일

`yarn.lock` 파일은 설치된 모듈의 버전을 저장하여 어디서나 동일한 버전과 구조의 의존성을 유지할 수 있게 합니다. `yarn install` 명령어를 실행할 때 자동으로 생성되며, `package-lock.json`과 비슷한 역할을 합니다.

### 참고

https://yarnpkg.com/
