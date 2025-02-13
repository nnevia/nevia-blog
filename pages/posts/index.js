import Head from "next/head";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts, getAllTags } from "../../lib/post-util";

export default function AllPostsPage(props) {
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
  };
}
