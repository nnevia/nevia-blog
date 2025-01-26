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
import React from "react";
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
      if (className) {
        const language = className.replace("language-", "");
        const codeString = Array.isArray(children)
          ? children.map((child) => (child.props ? child.props.children : child)).join("\n")
          : children.toString();
        return (
          <div>
            <div className={classes.codeHeader}>
              <span className={classes.language}>{language}</span>
            </div>
            <SyntaxHighlighter
              style={atomDark}
              language={language || "text"}
              showLineNumbers={true}
              wrapLines={true}
              lineNumberStyle={{
                minWidth: "2.5em",
                paddingRight: "1em",
                color: "#666",
                borderRight: "1px solid #333",
                marginRight: "1em",
              }}
            >
              {codeString.trim()}
            </SyntaxHighlighter>
          </div>
        );
      } else {
        return <span className={classes.inlineCode}>{children}</span>;
      }
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
