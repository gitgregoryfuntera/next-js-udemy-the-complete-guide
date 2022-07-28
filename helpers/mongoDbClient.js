import { MongoClient } from "mongodb";

/**
 *
 * @param {string} collectionName
 */
const mongoDbClient = async (collectionName) => {
  const URI = `mongodb+srv://dbUser:${"1234"}@cluster0.yqxng70.mongodb.net/${collectionName}?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(URI);

  return client;
};

export default mongoDbClient;
