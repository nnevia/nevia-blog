import { useEffect, useState } from "react";

export default function TOC({ content }) {
  const [activeId, setActiveId] = useState(""); // 현재 활성화된 섹션 ID

  function getHeadings(source) {
    const regex = /<h([1-3])[^>]*id=["']?([^"'>]*)["']?[^>]*>(.*?)<\/h[1-3]>/gi;
    const matches = [];
    let match;
    while ((match = regex.exec(source)) !== null) {
      matches.push({
        text: match[3], // 헤더 텍스트
        link: match[2], // id 값
        indent: parseInt(match[1]), // 헤더 레벨
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
            setActiveId(entry.target.id); // 활성화된 섹션의 ID 설정
          }
        });
      },
      { rootMargin: "0px 0px -50% 0px", threshold: 1.0 } // 섹션의 중앙 근처에 도달했을 때 활성화
    );

    // 각 헤더를 Observer에 등록
    HeadingArr.forEach((heading) => {
      const element = document.getElementById(heading.link);
      if (element) {
        observer.observe(element);
      }
    });

    // Observer 정리
    return () => {
      observer.disconnect();
    };
  }, [HeadingArr]);

  return (
    <div>
      <h2>목차</h2>
      {HeadingArr.map((heading, index) => (
        <div
          key={index}
          style={{
            paddingLeft: `${(heading.indent - 1) * 10}px`,
            fontWeight: activeId === heading.link ? "bold" : "normal", // 활성화된 항목 강조
            color: activeId === heading.link ? "blue" : "black",
          }}
        >
          <a href={`#${heading.link}`} style={{ textDecoration: "none" }}>
            {heading.text}
          </a>
        </div>
      ))}
    </div>
  );
}
