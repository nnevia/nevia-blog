import { useRouter } from "next/router";
import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getpostFiles } from "../../lib/post-util";

export default function PostDetailPage(props) {
  // const router = useRouter();
  // const { slug } = router.query;

  return <PostContent post={props.post} />;
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
