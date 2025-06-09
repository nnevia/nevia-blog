import { useState } from "react";
import classes from "./music-play.module.css";

export default function MusicPlay() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("텍스트를 입력해주세요.");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("/api/emotion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error("오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder='감정을 분석할 글을 입력하세요'
        className={classes.textarea}
      />

      <button onClick={handleSubmit} disabled={loading} className={classes.button}>
        {loading ? "분석 중..." : "감정 분석"}
      </button>

      {result && (
        <div className={classes.result}>
          <p>
            <strong>감정:</strong> {result.text}
          </p>
          <div className={classes.iframeWrapper}>
            <iframe
              src={result.youtube}
              className={classes.iframe}
              title='추천 음악'
              allow='autoplay; encrypted-media'
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
