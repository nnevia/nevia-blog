import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
