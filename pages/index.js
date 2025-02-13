import Head from "next/head";
import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getFeaturedPosts } from "../lib/post-util";
import { redirect } from "next";

export default function HomePage(props) {
  // return (
  //   <>
  //     <Head>
  //       <title>Nevia blog</title>
  //       <meta name='description' content="Nevia's blog - The blog of a creative, passionate, and inspiring blogger." />
  //     </Head>
  //     <Hero />
  //     <FeaturedPosts posts={props.posts} />
  //   </>
  // );
}
// export function getStaticProps() {
//   const featuredPosts = getFeaturedPosts();
//   return {
//     props: {
//       posts: featuredPosts,
//     },
//     revalidate: 600,
//   };

// }
export function getServerSideProps() {
  return {
    redirect: {
      destination: "/posts",
      permanent: true,
    },
  };
}
