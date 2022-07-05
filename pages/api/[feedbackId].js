import { getData, getFilePath } from "./feedback";

const handler = (req, res) => {
  const {
    query: { feedbackId },
  } = req;
  const filePath = getFilePath();
  const data = getData(filePath);
  const feedbackData = data.find((value) => value.id === feedbackId);
  res.status(200).json({
    response: feedbackData,
  });
};

export default handler;
