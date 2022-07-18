import mongoDbClient from "../../../helpers/mongoDbClient";
const handle = async (req, res) => {
  const { method } = req;
  console.log("🚀 ~ file: index.js ~ line 6 ~ handle ~ method", method);
  if (method === "POST") {
    const {
      body: { email },
    } = req;
    console.log("🚀 ~ file: index.js ~ line 9 ~ handle ~ email", email);

    let client;

    try {
      client = await mongoDbClient("newsletter");
    } catch (e) {
      console.log("🚀 ~ file: index.js ~ line 16 ~ handle ~ e", e);
      res.status(500).json({
        message: "Error: Failed connecting to Database",
      });
      return;
    }

    try {
      const db = await client.db();

      await db.collection("emails").insertOne({ email });

      client.close();
    } catch (e) {
      console.log("🚀 ~ file: index.js ~ line 27 ~ handle ~ e", e);
      res.status(500).json({
        message: `Error: Failed to insert ${email} to collection emails`,
      });
      return;
    }

    res.status(201).json({
      email,
      message: "success",
    });
  }
};

export default handle;
