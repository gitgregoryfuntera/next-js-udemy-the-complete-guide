import { MongoClient } from "mongodb";
const handle = async (req, res) => {
  const { method } = req;
  console.log("🚀 ~ file: index.js ~ line 6 ~ handle ~ method", method);
  if (method === "POST") {
    const {
      body: { email },
    } = req;
    console.log("🚀 ~ file: index.js ~ line 9 ~ handle ~ email", email);

    const client = await MongoClient.connect(
      `mongodb+srv://dbUser:${"1234"}@cluster0.yqxng70.mongodb.net/newsletter?retryWrites=true&w=majority`
    );

    const db = await client.db();

    await db.collection('emails').insertOne({ email });

    client.close();

    res.json({
      email,
      message: "success",
    });
  }
};

export default handle;
