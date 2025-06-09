export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { text } = req.body;
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/nlptown/bert-base-multilingual-uncased-sentiment",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    // 응답 코드 실패 처리 (4xx, 5xx)
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API 요청 실패: ${response.status} ${response.statusText}\n${errorText}`);
    }

    const result = await response.json();
    const topLabel = result[0].reduce((a, b) => (b.score > a.score ? b : a), result[0][0]).label[0];

    // 감정에 따른 음악 매핑
    const musicMap = {
      5: {
        text: "😄 매우 긍정적인 감정 (기쁨, 사랑, 희망)",
        youtube: [
          "https://www.youtube.com/embed/ZbZSe6N_BXs",
          "https://www.youtube.com/embed/dQw4w9WgXcQ",
          "https://www.youtube.com/embed/09R8_2nJtjg",
        ],
      },
      4: {
        text: "🙂 긍정적인 감정 (기대, 여유, 안정)",
        youtube: [
          "https://www.youtube.com/embed/ho9rZjlsyYY",
          "https://www.youtube.com/embed/JGwWNGJdvx8",
          "https://www.youtube.com/embed/OPf0YbXqDm0",
        ],
      },
      3: {
        text: "😐 중립적인 감정 (평범함, 차분함)",
        youtube: [
          "https://www.youtube.com/embed/hTWKbfoikeg",
          "https://www.youtube.com/embed/3tmd-ClpJxA",
          "https://www.youtube.com/embed/1-0eZytv6Qk",
        ],
      },
      2: {
        text: "🙁 부정적인 감정 (우울, 불만, 피곤함)",
        youtube: [
          "https://www.youtube.com/embed/eVTXPUF4Oz4",
          "https://www.youtube.com/embed/3JWTaaS7LdU",
          "https://www.youtube.com/embed/8UVNT4wvIGY",
        ],
      },
      1: {
        text: "😢 매우 부정적인 감정 (슬픔, 실망, 분노)",
        youtube: [
          "https://www.youtube.com/embed/eVTXPUF4Oz4",
          "https://www.youtube.com/embed/1-0eZytv6Qk",
          "https://www.youtube.com/embed/3JWTaaS7LdU",
        ],
      },
    };

    const selectedMusic = musicMap[topLabel] || {
      text: 3,
      youtube: ["https://www.youtube.com/embed/2Vv-BfVoq4g"],
    };

    // 랜덤으로 유튜브 링크 선택
    const randomYoutube = selectedMusic.youtube[Math.floor(Math.random() * selectedMusic.youtube.length)];

    res.status(200).json({
      result: {
        text: selectedMusic.text,
        youtube: randomYoutube,
      },
    });
  } catch (error) {
    console.error("API 오류:", error.message);
    res.status(500).json({ error: "서버 오류" });
  }
}
