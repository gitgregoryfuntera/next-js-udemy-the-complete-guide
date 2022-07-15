import mongoDbClient from "../../../helpers/mongoDbClient";

const handler = async (req, res) => {
  const {
    method,
    query: { eventId },
  } = req;

  const client = await mongoDbClient("events");

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
    const db = await client.db();

    const result = await db.collection("comments").insertOne(newComment);

    res.status(201).json({
      message: 'success',
      id: result.insertedId,
      ...newComment
    });
  }

  if (method === "GET") {
    const dummyList = [
      { id: "c1", name: "Greg", text: "A first comment" },
      { id: "c2", name: "Greg", text: "A second comment" },
    ];

    res.status(200).json(dummyList);
  }
  client.close();
};

export default handler;
