const handler = (req, res) => {
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
        message
    };

    console.log("🚀 ~ file: index.js ~ line 26 ~ handler ~ newMessage", newMessage);

    res.status(201).json({
        message: 'success'
    });
  }
};

export default handler;
