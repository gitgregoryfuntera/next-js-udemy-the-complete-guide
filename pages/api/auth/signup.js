import { hashPassword } from "../../../helper/auth";
import { mongoDbClient } from "../../../helper/db";

const handler = async (req, res) => {
  const { body: data, method } = req;
  if (method !== 'POST') {
    return;
  }

  const { email, password } = data;
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: "Invalid Input",
    });
    return;
  }

  const client = await mongoDbClient();
  const hashedPassword = await hashPassword(password);
  const db = client.db();
  const existingUser = await db.collection('users').findOne({
    email
  })

  if (existingUser) {
    res.status(400).json({
      message: 'User already exists',
    });
    client.close();
    return;
  }
  db.collection("users").insertOne({
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "successfully created user",
  });
};

export default handler;
