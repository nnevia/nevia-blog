import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";

const postDirectory = path.join(process.cwd(), "posts");

export function getpostFiles() {
  return fs.readdirSync(postDirectory); // 폴더 내 모든 파일과 서브폴더 이름을 배열로 반환
}

export function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, ""); // 파일명에서 .md 확장자를 제거
  const filePath = path.join(postDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { data, content } = matter(fileContent); // 마크다운 텍스트를 문자열로 반환
  const postData = {
    slug: postSlug,
    ...data,
    content,
  };
  return postData;
}

export function getAllPosts() {
  const postFiles = getpostFiles();
  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}

// export async function addIdsToHeaders(markdownData) {
//   const processedContent = await remark()
//     .use(remarkHtml, {
//       sanitize: false, // HTML 태그 허용
//       allowDangerousHtml: true,
//     }) // Markdown -> HTML
//     .use(slug) // 각 헤더에 id(slug) 추가
//     .use(autolinkHeadings, { behavior: "wrap" }) // (선택) 헤더에 링크 추가
//     .process(markdownData.content);

//   console.log(processedContent.toString());

//   // 기존 데이터에 변환된 content를 덮어씌움
//   return {
//     ...markdownData, // 기존 키-값 데이터 유지
//     content: processedContent.toString(), // HTML 변환된 내용
//   };
// }

// MarkdownIt으로 수정 버전
export async function addIdsToHeaders(markdownData) {
  const md = new MarkdownIt({
    html: true, // HTML 태그도 렌더링 가능
    xhtmlOut: false, // XHTML 형식으로 출력하지 않음
    breaks: true, // 줄바꿈을 제대로 처리하도록 설정
    linkify: true, // 링크 자동 변환
  }).use(anchor, {
    slugify: (s) =>
      String(s)
        .trim()
        .toLowerCase()
        .replace(/[^가-힣a-z0-9]+/gi, "-")
        .replace(/^-+|-+$/g, ""),
    permalink: false,
    level: [1, 2, 3],
    tabIndex: false,
  });

  const content = md.render(markdownData.content);

  return {
    ...markdownData,
    content,
  };
}
