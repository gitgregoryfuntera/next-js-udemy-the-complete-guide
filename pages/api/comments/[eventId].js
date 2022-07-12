const handler = (req, res) => {
  const {
    method,
    query: { eventId },
  } = req;
  if (method === "POST") {
    const {
      body: { email, name, text },
    } = req;
    console.log("🚀 ~ file: index.js ~ line 6 ~ handler ~ text", text);
    console.log("🚀 ~ file: index.js ~ line 6 ~ handler ~ name", name);
    console.log("🚀 ~ file: index.js ~ line 6 ~ handler ~ email", email);

    res.status(201).json({
      id: new Date().toISOString(),
      message: "success",
      email,
      name,
      text,
    });
  }

  if (method === "GET") {
    const dummyList = [
      { id: "c1", name: "Greg", text: "A first comment" },
      { id: "c2", name: "Greg", text: "A second comment" },
    ];

    res.status(200).json(dummyList);
  }
};

export default handler;
