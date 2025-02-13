import { useState } from "react";
import classes from "./all-posts.module.css";
import CategoryFilter from "./category-filter";
import PostsGrid from "./posts-grid";

export default function AllPosts(props) {
  const [selectedTag, setSelectedTag] = useState("all");
  const filteredPosts =
    selectedTag === "all" ? props.posts : props.posts.filter((post) => post.tags.includes(selectedTag));

  return (
    <section className={classes.posts}>
      <br />
      <CategoryFilter tags={props.tags} onSelectTag={setSelectedTag} selectedTag={selectedTag} />
      <br />
      <PostsGrid posts={filteredPosts} />
    </section>
  );
}
