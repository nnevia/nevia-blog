import { useEffect, useState } from "react";
import classes from "./post-table.module.css";

export default function TOC({ content }) {
  const [activeId, setActiveId] = useState("");
  function getHeadings(source) {
    const regex = /<h([1-3])[^>]*id=["']?([^"'>]*)["']?[^>]*>(.*?)<\/h[1-3]>/gi;
    const matches = [];
    let match;
    while ((match = regex.exec(source)) !== null) {
      const text = match[3].replace(/<strong>(.*?)<\/strong>/g, "$1");
      const safeId = match[2]
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9가-힣-_]/g, "");
      matches.push({
        text,
        link: match[2],
        indent: parseInt(match[1]),
      });
    }
    return matches;
  }

  const HeadingArr = getHeadings(content.content);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -50% 10px", threshold: 1.0 }
    );

    HeadingArr.forEach((heading) => {
      const element = document.getElementById(heading.link);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [HeadingArr]);

  const handleLinkClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href").substring(1);
    const element = document.getElementById(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div>
      {HeadingArr.map((heading, index) => (
        <div
          key={index}
          className={classes.tocItem}
          style={{
            paddingLeft: `${heading.indent * 10}px`,
          }}
        >
          <a
            href={`#${heading.link}`}
            onClick={handleLinkClick}
            className={`${classes.tocLink} ${activeId === heading.link ? classes.active : ""}`}
          >
            {heading.text}
          </a>
        </div>
      ))}
    </div>
  );
}
