const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { user, text } = req.body;

  if (!user || !text) {
    return res.status(400).json({ error: "user and text are required" });
  }

  try {
    const sentimentRes = await axios.post("http://localhost:4000/api/sentiment", { text });
    const sentiment = sentimentRes.data.sentiment;

    const recommendRes = await axios.post("http://localhost:4000/api/recommend", { sentiment, user });
    const recommendations = recommendRes.data.recommendations;

    res.json({ user, sentiment, recommendations });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", detail: err.message });
  }
});

module.exports = router;
