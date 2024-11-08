import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message, email, name } = req.body;

    if (!email || !email.includes("@") || !name || name.trim() === "" || !message || message.trim() === "") {
      res.status(422).json({ message: "입력이 잘못되었습니다." });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;
    try {
      client = await MongoClient.connect(
        "mongodb+srv://hntn32:mV9IMeX5zgi4fxzT@cluster0.4tzpr.mongodb.net/nevia-blog?retryWrites=true&w=majority&appName=Cluster0"
      );
    } catch (error) {
      res.status(500).json({ message: "데이터베이스 연결 실패" });
      return;
    }

    const db = client.db("nevia-blog");

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage._id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "메시지 저장 실패" });
      return;
    }

    client.close();
    res.status(201).json({ message: newMessage });
  }
}
