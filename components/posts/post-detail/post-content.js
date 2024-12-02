import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import TOC from "./post-table";
import dynamic from "next/dynamic";
SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("tsx", tsx);

const Markdown = dynamic(() => import("markdown-to-jsx"), { ssr: false });

export default function PostContent(props) {
  const { post, content } = props;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers = {
    img: ({ alt, src }) => (
      <div className={classes.image}>
        <Image src={`/images/posts/${post.slug}/${src}`} alt={alt} width={600} height={300} />
      </div>
    ),
    code: ({ children, className }) => {
      if (!className) {
        return <code>{children}</code>;
      }
      const codeString = Array.isArray(children) ? children.join("\n") : children.toString();
      const language = className.replace("language-", "");

      return (
        <SyntaxHighlighter style={atomDark} language={language || "text"}>
          {codeString}
        </SyntaxHighlighter>
      );
    },
    Callout: ({ children, type }) => {
      return (
        <div className={classes.callout} data-type={type}>
          <div className={classes.calloutContent}>{children}</div>
        </div>
      );
    },
  };

  return (
    <div className={classes.container}>
      <article className={classes.content}>
        <PostHeader title={post.title} image={imagePath} />
        {/* 이미지 스켈레톤 추가 자리 */}
        <div className={classes.contents}>
          <Markdown
            options={{
              overrides: customRenderers,
              forceBlock: true,
            }}
          >
            {post.content}
          </Markdown>
        </div>
      </article>
      <div className={classes.tocWrapper}>
        <TOC content={content} />
      </div>
    </div>
  );
}
