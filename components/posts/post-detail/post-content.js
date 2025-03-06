import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import React, { useEffect } from "react";
import sanitizeHtml from "sanitize-html";
import TOC from "./post-table";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

export default function PostContent({ post }) {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const cleanHtml = sanitizeHtml(post.content, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "img", "pre", "code"],
    allowedAttributes: {
      a: ["href", "name", "target"],
      img: ["src"],
      li: ["class"],
      code: ["class"],
    },
    transformTags: {
      img: (tagName, attribs) => {
        return {
          tagName: "img",
          attribs: {
            src: `/images/posts/${post.slug}/${attribs.src}`,
            alt: attribs.alt || "",
            width: "600",
            height: "300",
          },
        };
      },
      pre: (tagName, attribs) => {
        return {
          tagName: "pre",
          attribs: { class: "hljs" },
        };
      },
    },
  });

  useEffect(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [cleanHtml]);
  return (
    <div className={classes.container}>
      <article className={classes.content}>
        <PostHeader title={post.title} image={imagePath} />
        <div className={classes.contents}>
          <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
        </div>
      </article>
    </div>
  );
}
