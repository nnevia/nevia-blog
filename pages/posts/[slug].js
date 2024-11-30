import PostContent from "../../components/posts/post-detail/post-content";
import { addIdsToHeaders, getPostData, getpostFiles } from "../../lib/post-util";
import Head from "next/head";

export default function PostDetailPage(props) {
  return (
    <>
      <Head>
        <title>{props.post.title}</title>
        <meta name='description' content={props.post.excerpt} />
      </Head>
      <PostContent post={props.content} content={props.content} />
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

export async function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;
  const postData = getPostData(slug);
  const content = await addIdsToHeaders(postData);
  return {
    props: {
      post: postData,
      content,
    },
    revalidate: 600,
  };
}
