import { getSession } from "next-auth/client";

const handler = async (req, res) => {
  const { method } = req;
  if (method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated " });
    return;
  }
};

export default handler;
