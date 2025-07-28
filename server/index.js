const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const sentimentRouter = require("./routes/sentiment");
app.use("/api/sentiment", sentimentRouter);

const fullRouter = require("./routes/full");
app.use("/api/full", fullRouter);

// 기본 라우터
app.get("/", (req, res) => {
  res.send("🎧 Hello from the Emotion Music API!");
});

app.post("/api/recommend", (req, res) => {
  const { sentiment, user } = req.body;

  if (typeof sentiment !== "number" || !user) {
    return res.status(400).json({ error: "user and sentiment are required" });
  }

  if (sentiment < 1 || sentiment > 5) {
    return res.status(400).json({ error: "sentiment must be between 1 and 5" });
  }

  const list = {
    1: ["Fix You", "Someone Like You", "Lost Stars"],
    2: ["Breakeven", "Let Her Go", "Say Something"],
    3: ["Let It Be", "Imagine", "Yellow"],
    4: ["Happy", "Walking on Sunshine", "Good Life"],
    5: ["Can't Stop the Feeling", "Uptown Funk", "On Top of the World"],
  };

  const feeling = {
    1: "매우 부정 감정",
    2: "부정 감정",
    3: "중립 감정",
    4: "긍정 감정",
    5: "매우 긍정 감정",
  };
  console.log(`[${user}]님에게 ${feeling[sentiment]}(${sentiment})에 대한 음악 추천 전송`);

  res.status(200).json({ recommendations: list[sentiment], user });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
