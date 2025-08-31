import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { message, email, name } = req.body as { message?: string; email?: string; name?: string };

    if (!email || !email.includes("@") || !name || name.trim() === "" || !message || message.trim() === "") {
      res.status(422).json({ message: "입력이 잘못되었습니다." });
      return;
    }

    const newMessage: { email: string; name: string; message: string } = {
      email,
      name,
      message,
    };

    let client: MongoClient | undefined;
    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.4tzpr.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: "데이터베이스 연결 실패" });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      const created = { ...newMessage, _id: String(result.insertedId) };
      client.close();
      return res.status(201).json({ message: created });
    } catch (error) {
      client.close();
      res.status(500).json({ message: "메시지 저장 실패" });
      return;
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
