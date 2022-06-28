const handler = (req, res) => {
  res.status(200).json({
    message: "hello world",
  });
};

export default handler;
