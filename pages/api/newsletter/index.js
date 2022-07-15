import mongoDbClient from "../../../helpers/mongoDbClient";
const handle = async (req, res) => {
  const { method } = req;
  console.log("🚀 ~ file: index.js ~ line 6 ~ handle ~ method", method);
  if (method === "POST") {
    const {
      body: { email },
    } = req;
    console.log("🚀 ~ file: index.js ~ line 9 ~ handle ~ email", email);

    const client = await mongoDbClient("newsletter");

    const db = await client.db();

    await db.collection("emails").insertOne({ email });

    client.close();

    res.json({
      email,
      message: "success",
    });
  }
};

export default handle;
