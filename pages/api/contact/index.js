import { MongoClient } from "mongodb";
const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    if (
      !email.includes("@") ||
      email.trim() === "" ||
      !email ||
      name.trim() === "" ||
      !name ||
      message.trim() === "" ||
      !message
    ) {
      res.status(422).json({
        message: "Invalid Input",
      });

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
        `mongodb+srv://dbUser:${"rGlbGaMetb1RykIO"}@cluster0.yqxng70.mongodb.net/my-site?retryWrites=true&w=majority`
      );

      console.log(
        "🚀 ~ file: index.js ~ line 26 ~ handler ~ newMessage",
        newMessage
      );
    } catch (e) {
      res.status(500).json({
        message: "could not connect to DB",
      });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (e) {
      res.status(500).json({
        message: "error inserting newMessage to DB",
      });
      return;
    }

    client.close();

    res.status(201).json({
      response: newMessage,
      message: "success",
    });
  }
};

export default handler;
