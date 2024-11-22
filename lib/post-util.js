import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import slug from "remark-slug";
import autolinkHeadings from "rehype-autolink-headings";

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

export async function addIdsToHeaders(markdownData) {
  // 기존 content를 HTML로 변환하며 헤더에 id 추가
  const processedContent = await remark()
    .use(html) // Markdown -> HTML
    .use(slug) // 각 헤더에 id(slug) 추가
    .use(autolinkHeadings, { behavior: "wrap" }) // (선택) 헤더에 링크 추가
    .process(markdownData.content);

  // 기존 데이터에 변환된 content를 덮어씌움
  return {
    ...markdownData, // 기존 키-값 데이터 유지
    content: processedContent.toString(), // HTML 변환된 내용
  };
}
