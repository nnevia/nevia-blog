import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import TOC from "./post-table";
import rehypeRaw from "rehype-raw";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("python", python);

export default function PostContent(props) {
  const { post, content } = props;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  const customRenderers = {
    // img(image) {
    //   return <Image src={`/images/posts/${post.slug}/${image.src}`} alt={image.alt} width={600} height={300} />;
    // },
    p(paragraph) {
      const { node } = paragraph;
      if (node.children && node.children[0] && node.children[0].tagName === "img") {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      if (node.children && node.children[0] && node.children[0].tagName === "code") {
        return <>{paragraph.children}</>; // <code>를 감싸지 않도록 처리
      }

      return <p>{paragraph.children}</p>;
    },

    code(code) {
      const { className, children } = code;
      const language = className.split("-")[1];
      return <SyntaxHighlighter style={atomDark} language={language} children={children} />;
    },
  };

  return (
    <>
      <article className={`${classes.content}`}>
        <PostHeader title={post.title} image={imagePath} />
        {/* 이미지 스켈레톤 추가 자리 */}
        <ReactMarkdown components={customRenderers} rehypePlugins={[rehypeRaw]}>
          {post.content}
        </ReactMarkdown>
      </article>
      <TOC content={content} />
    </>
  );
}
