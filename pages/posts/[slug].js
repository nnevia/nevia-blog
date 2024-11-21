import { useRouter } from "next/router";
import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getpostFiles } from "../../lib/post-util";
import Head from "next/head";
import PostTable from "../../components/posts/post-detail/post-table";

export default function PostDetailPage(props) {
  // const router = useRouter();
  // const { slug } = router.query;

  return (
    <>
      <Head>
        <title>{props.post.title}</title>
        <meta name='description' content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
      <PostTable />
    </>
  );
}

export function getStaticPaths() {
  const postFileNames = getpostFiles();
  const paths = postFileNames.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;
  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}
