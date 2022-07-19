import mongoDbClient from "../../../helpers/mongoDbClient";

const handler = async (req, res) => {
  const {
    method,
    query: { eventId },
  } = req;

  let client;

  try {
    client = await mongoDbClient("events");
  } catch (e) {
    res.status(500).json({
      message: `Error: Connecting to mongoDB Client, ${e.message}`,
    });
    return
  }

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

    try {
      const result = await db.collection("comments").insertOne(newComment);

      res.status(201).json({
        message: "success",
        id: result.insertedId,
        ...newComment,
      });
    } catch (e) {
      res.status(500).json({
        message: `Error: Inserting new comment: ${e.message}`,
      });
    }
  }

  if (method === "GET") {
    try {
      const events = await db
        .collection("comments")
        .find({ eventId: eventId })
        .sort({ _id: -1 })
        .toArray();

      res.status(200).json(events);
    } catch (e) {
      res.status(500).json({
        message: `Error: error at fetching comments ${e.message}`,
      });
    }
  }
  client.close();
};

export default handler;
