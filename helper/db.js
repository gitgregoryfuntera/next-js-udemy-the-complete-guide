import MongoClient from "mongodb/lib/mongo_client";

export const mongoDbClient = async () => {
  return MongoClient.connect(
    `mongodb+srv://dbUser:dbUser@cluster0.yqxng70.mongodb.net/auth-demo?retryWrites=true&w=majority`
  );
};
