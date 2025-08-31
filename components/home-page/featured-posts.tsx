import PostsGrid from "../posts/posts-grid";
import classes from "./featured-posts.module.css";

export default function FeaturedPosts(props: { posts: any[] }) {
  return (
    <section className={classes.latest}>
      <h2>Featured Post</h2>
      <PostsGrid posts={props.posts} />
    </section>
  );
}
