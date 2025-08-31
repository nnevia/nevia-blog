import Head from "next/head";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts, getAllTags } from "../../lib/post-util";
import type { InferGetStaticPropsType } from "next";

export default function AllPostsPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Nevia Blog - All Posts</title>
        <meta name='viewport' content='A list' />
      </Head>
      <AllPosts posts={props.posts} tags={props.tags} />
    </>
  );
}

export function getStaticProps() {
  const allPosts = getAllPosts();
  const allTags = getAllTags();
  return {
    props: {
      posts: allPosts,
      tags: allTags,
    },
  } as const;
}
