const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "text is required and must be a string" });
  }

  const lower = text.toLowerCase();
  let sentiment = 3; // 중립

  if (lower.includes("happy") || lower.includes("joy") || lower.includes("great")) {
    sentiment = 5;
  } else if (lower.includes("sad") || lower.includes("bad") || lower.includes("depressed")) {
    sentiment = 1;
  }

  res.json({ sentiment });
});

module.exports = router;
