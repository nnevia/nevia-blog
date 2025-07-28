import Link from "next/link";
import classes from "./post-item.module.css";
import Image from "next/image";

export default function PostItem(props) {
  const { title, image, excerpt, date, slug, tags } = props.post;
  let formattedtags;
  if (tags) {
    const tagList = tags.includes(",") ? tags.split(",") : [tags];
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
    <li className={classes.post}>
      <Link href={linkPath}>
        <div className={classes.image}>
          <Image src={imagePath} alt={title} width={320} height={180} />
          {formattedtags ? <div className={classes.tags}>{formattedtags}</div> : null}
          <div className={classes.overlayContent}>
            {/* <time>{formattedDate}</time> */}
            <p>{excerpt}</p>
          </div>
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
        </div>
      </Link>
    </li>
  );
}
