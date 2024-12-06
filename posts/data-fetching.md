---
title: Next.js의 데이터 페칭
excerpt: nextjs의 정적생성과 동정생성에 대해
date: "2024-10-23"
tags: "next"
image: getstaticprops.jpg
isFeatured: true
---

## getStaticProps를 통한 정적 생성

우선 `getStaticProps`는 빌드 시점에 데이터를 미리 가져와 정적 페이지를 생성하는 함수입니다. 이 방식은 블로그 포스트나 제품 목록과 같이 자주 변경되지 않는 데이터를 다룰 때 특히 유용합니다.

**주요 특징**

- 빌드 타임에 실행되어 정적 HTML 생성
- 클라이언트 측에서 실행되지 않아 보안 크리덴셜 사용 가능
- 빠른 페이지 로딩 제공

```js
function HomePage({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  return {
    props: {
      products: [{ id: "p1", title: "제품 1" }],
    },
  };
}

export default HomePage;
```

동적 라우팅을 사용하는 페이지에서는 getStaticPaths를 통해 사전 생성할 경로들을 지정할 수 있습니다.

### fallback 옵션

**false**
정의되지 않은 경로는 404 반환

**true**
새로운 경로를 동적으로 생성

**blocking**
SSR과 유사하게 새 페이지 생성 후 응답

```js
export async function getStaticPaths() {
  return {
    paths: [{ params: { pid: "p1" } }, { params: { pid: "p2" } }],
    fallback: "blocking",
  };
}
```

## getServerSideProps를 통한 서버 사이드 렌더링

실시간 데이터가 필요한 페이지에서는 getServerSideProps를 사용하여 요청 시점에 데이터를 가져올 수 있습니다.

```js
export default function UserPage({ userData }) {
  return <div>{userData.name}</div>;
}

export async function getServerSideProps(context) {
  const { params } = context;

  return {
    props: {
      userData: {
        id: params.uid,
        name: "사용자 이름",
      },
    },
  };
}
```

## 메서드 비교

| 메서드             | 실행 시점 | 사용 사례     | 장점                |
| ------------------ | --------- | ------------- | ------------------- |
| getStaticProps     | 빌드 시   | 정적 콘텐츠   | 빠른 로딩, CDN 캐싱 |
| getStaticPaths     | 빌드 시   | 동적 라우트   | 효율적인 정적 생성  |
| getServerSideProps | 요청 시   | 실시간 데이터 | 최신 데이터 보장    |

### 사용 시 고려사항

- getStaticProps/getStaticPaths
  - 데이터가 자주 변경되지 않는 경우 적합
  - CDN 캐싱의 이점 활용 가능
  - 빌드 시간이 길어질 수 있음
- getServerSideProps
  - 실시간 데이터가 필요한 경우 사용
  - 매 요청마다 서버 리소스 사용
  - SEO가 중요한 동적 콘텐츠에 적합
