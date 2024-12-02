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
    html: false,
    xhtmlOut: false,
    breaks: false,
    linkify: true,
  }).use(anchor, {
    slugify: (s) =>
      String(s)
        .trim()
        .toLowerCase() // 소문자로 변환
        .replace(/[^가-힣a-z0-9]+/gi, "-") // 영숫자가 아닌 모든 문자를 하이픈으로 변환
        .replace(/^-+|-+$/g, ""), // 시작과 끝의 하이픈 제거
    permalink: false,
    level: [1, 2, 3],
    tabIndex: false,
  });

  const content = md.render(markdownData.content);
  console.log(content);
  return {
    ...markdownData,
    content: content,
  };
}
