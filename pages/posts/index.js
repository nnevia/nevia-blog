import Head from "next/head";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/post-util";

export default function AllPostsPage(props) {
  return (
    <>
      <Head>
        <title>Nevia Blog - All Posts</title>
        <meta name='viewport' content='A list' />
      </Head>
      <AllPosts posts={props.posts} />;
    </>
  );
}

export function getStaticProps() {
  const allPosts = getAllPosts();
  return {
    props: {
      posts: allPosts,
    },
  };
}
