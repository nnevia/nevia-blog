import PostContent from "../../components/posts/post-detail/post-content";
import { addIdsToHeaders, getPostData, getpostFiles } from "../../lib/post-util";
import Head from "next/head";
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

export default function PostDetailPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{props.post.title}</title>
        <meta name='description' content={props.post.excerpt} />
      </Head>
      <PostContent post={props.content} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  const postFileNames = getpostFiles();
  const paths = postFileNames.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ""),
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const { slug } = params as { slug: string };
  const postData = getPostData(slug);
  const content = await addIdsToHeaders(postData);
  return {
    props: {
      post: postData,
      content,
    },
    revalidate: 600,
  } as const;
};
