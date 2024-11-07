import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { message, email, name } = req.body;

    if (!email || !email.includes("@") || !name || name.trim() === "" || !message || message.trim() === "") {
      res.status(422).json({ message: "입력이 잘못되었습니다." });
      return;
    }

    const newMessage = {
      id: new Date().toISOString(),
      email,
      name,
      message,
    };

    res.status(201).json({ message: newMessage });
  }
}
