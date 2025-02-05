import classes from "./all-posts.module.css";
import PostsGrid from "./posts-grid";

export default function AllPosts(props) {
  return (
    <section className={classes.posts}>
      <br />
      <PostsGrid posts={props.posts} />
    </section>
  );
}
