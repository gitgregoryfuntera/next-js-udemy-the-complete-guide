import { getSession } from "next-auth/client";
import { hashPassword, verifyPassword } from "../../../helper/auth";
import { mongoDbClient } from "../../../helper/db";

const handler = async (req, res) => {
  const { method, body } = req;
  console.log("🚀 ~ file: change-password.js:7 ~ handler ~ method", method);
  console.log("🚀 ~ file: change-password.js:7 ~ handler ~ body", body);

  if (method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated " });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = body.oldPassword;
  const newPassword = body.newPassword;

  const client = await mongoDbClient();
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
    client.close();
    return;
  }

  const currentPassword = user.password;
  const passwordAreEqual = await verifyPassword(oldPassword, currentPassword);
  if (!passwordAreEqual) {
    res.status(403).json({
      message: "Password are not equal",
    });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);
  await usersCollection.updateOne(
    {
      email: userEmail,
    },
    { $set: { password: hashedPassword } }
  );
  client.close();

  res.status(200).json({
    message: "password updated!",
  });
};

export default handler;
