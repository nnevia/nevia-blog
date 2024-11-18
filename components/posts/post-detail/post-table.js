// components/TableOfContents.js
import React, { useEffect, useState } from "react";

export default function PostTable() {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    // 모든 h2와 h3 요소 가져오기
    const elements = Array.from(document.querySelectorAll("h2, h3"));
    const headingsData = elements.map((el) => ({
      id: el.innerText, // 제목의 id
      text: el.innerText, // 제목 텍스트
      level: el.tagName === "H2" ? 2 : 3, // 제목 레벨
    }));
    setHeadings(headingsData);
  }, []);
  console.log(headings);

  return (
    <nav aria-label='Table of contents' style={{ padding: "1rem", border: "1px solid #ddd" }}>
      <ul>
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{
              marginLeft: heading.level === 3 ? "1rem" : "0",
              fontSize: heading.level === 3 ? "0.9rem" : "1rem",
            }}
          >
            <a href={`#${heading.id}`} style={{ textDecoration: "none", color: "#0070f3" }}>
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
