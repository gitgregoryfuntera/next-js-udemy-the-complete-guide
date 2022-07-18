import mongoDbClient from "../../../helpers/mongoDbClient";

const handler = async (req, res) => {
  const {
    method,
    query: { eventId },
  } = req;

  const client = await mongoDbClient("events");

  const db = await client.db();

  if (method === "POST") {
    const {
      body: { email, name, text },
    } = req;
    console.log("🚀 ~ file: index.js ~ line 6 ~ handler ~ text", text);
    console.log("🚀 ~ file: index.js ~ line 6 ~ handler ~ name", name);
    console.log("🚀 ~ file: index.js ~ line 6 ~ handler ~ email", email);

    const newComment = {
      eventId,
      email,
      name,
      text,
    };

    const result = await db.collection("comments").insertOne(newComment);

    res.status(201).json({
      message: "success",
      id: result.insertedId,
      ...newComment,
    });
  }

  if (method === "GET") {
    const events = await db
      .collection("comments")
      .find({ eventId: eventId })
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json(events);
  }
  client.close();
};

export default handler;
