import fs from "fs";
import path from "path";

const handler = (req, res) => {
  if (req.method === "POST") {
    const {
      body: { email, feedback },
    } = req;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      feedback,
    };

    const filePath = getFilePath();
    const data = getData(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({
      message: "success",
      response: newFeedback,
    });
  } else {
    const filePath = getFilePath();
    const data = getData(filePath)
    res.status(200).json({
      response: {
        feedbacks: data,
      }
    });
  }
};

const getFilePath = () => {
  return path.join(process.cwd(), "data", "feedback.json");
};

const getData = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
};

export default handler;
