import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";

const postDirectory = path.join(process.cwd(), "posts");

export function getpostFiles() {
  return fs.readdirSync(postDirectory);
}

export type PostFrontMatter = {
  title: string;
  date: string;
  excerpt?: string;
  isFeatured?: boolean;
  tags?: string;
  [key: string]: any;
};

export function getPostData(postIdentifier: string) {
  const postSlug = postIdentifier.replace(/\.md$/, "");
  const filePath = path.join(postDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { data, content } = matter(fileContent);
  const postData: PostFrontMatter & { slug: string; content: string } = {
    slug: postSlug,
    ...(data as PostFrontMatter),
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

export function getAllTags() {
  const allPosts = getAllPosts();
  const allTags = allPosts
    .map((item) => item.tags)
    .filter((tag): tag is string => Boolean(tag))
    .filter((tag, index, arr) => arr.indexOf(tag) === index);
  return allTags;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((post) => post.isFeatured);
  return featuredPosts;
}

export async function addIdsToHeaders(markdownData: { content: string }) {
  const md = new MarkdownIt({
    html: true,
    xhtmlOut: false,
    breaks: true,
    linkify: true,
  }).use(anchor, {
    slugify: (s: string) =>
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
