const handle = (req, res) => {
  const { method } = req;
  console.log("🚀 ~ file: index.js ~ line 6 ~ handle ~ method", method);
  if (method === "POST") {
    const {
      body: { email },
    } = req;
    console.log("🚀 ~ file: index.js ~ line 9 ~ handle ~ email", email);

    res.json({
      email,
      message: "success",
    });
  }
};

export default handle;
