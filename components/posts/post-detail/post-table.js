import { useEffect, useState } from "react";
import classes from "./post-table.module.css";

export default function TOC({ content }) {
  const [activeId, setActiveId] = useState("");

  function getHeadings(source) {
    const regex = /<(h[2-3])[^>]*>(.*?)<\/\1>/gi;
    const matches = [];
    let match;
    while ((match = regex.exec(source)) !== null) {
      const text = match[2].replace(/<strong>(.*?)<\/strong>/g, "$1");
      const tag = match[1];
      const safeId = text
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w가-힣-]/g, "");

      matches.push({
        text,
        link: safeId,
        tag,
      });
    }
    return matches;
  }

  const HeadingArr = getHeadings(content);

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
            paddingLeft: `${(parseInt(heading.tag[1]) - 1) * 10}px`,
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
