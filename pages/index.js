import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
const DUMMY_POSTS = [
  {
    slug: "getting-started1",
    title: "Getting-startied-with-js",
    image: "getting-started-nextjs.png",
    excerpt: "gogo",
    date: "2024-11-05",
  },
  {
    slug: "getting-started2",
    title: "Getting-startied-with-js",
    image: "getting-started-nextjs.png",
    excerpt: "gogo",
    date: "2024-11-05",
  },
  {
    slug: "getting-started3",
    title: "Getting-startied-with-js",
    image: "getting-started-nextjs.png",
    excerpt: "gogo",
    date: "2024-11-05",
  },
  {
    slug: "getting-started4",
    title: "Getting-startied-with-js",
    image: "getting-started-nextjs.png",
    excerpt: "gogo",
    date: "2024-11-05",
  },
];
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </>
  );
}

// 1 hero 페이지 생성 (자기소개)
// 2 더미 콘텐츠 생성
