import Link from "next/link";
import classes from "./post-item.module.css";
import Image from "next/image";

export default function PostItem(props) {
  const { title, image, excerpt, date, slug, tags } = props.post;
  let formattedtags;
  if (tags) {
    const tagList = tags.split(",");
    formattedtags = tagList.map((tag) => (
      <span key={tag} className={classes.tag}>
        {tag}
      </span>
    ));
  }
  const formattedDate = new Date(date).toLocaleDateString("ko-KR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;

  return (
    <li className={`${classes.post}`}>
      <Link href={linkPath}>
        <div className={classes.image}>
          <Image src={imagePath} alt={title} width={300} height={200} layout='responsive' />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <time>{formattedDate}</time>
          {formattedtags ? <h4>{formattedtags}</h4> : null}
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
}
