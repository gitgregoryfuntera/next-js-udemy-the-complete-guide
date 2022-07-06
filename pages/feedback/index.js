import { useState } from "react";
import { getData, getFilePath } from "../api/feedback";

const Feedback = (props) => {
  const { feedbacks } = props;
  const [feedbackItem, setFeedbackItem] = useState(null);

  const showFeedback = async (id) => {
    const data = await fetch(`/api/feedback/${id}`);
    const { response } = await data.json();
    console.log(
      "🚀 ~ file: index.js ~ line 9 ~ showFeedback ~ response",
      response
    );
    setFeedbackItem(response);
  };
  return (
    <>
      {feedbackItem && feedbackItem.email}
      <ul>
        {feedbacks.map(({ id, feedback }) => (
          <li key={id} onClick={showFeedback.bind(null, id)}>
            {feedback}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Feedback;

export const getStaticProps = () => {
  // avoid using fetch function in getStatic props if calling own api
  // instead use a helper function to extract the data
  const filePath = getFilePath();
  const data = getData(filePath);
  return {
    props: {
      feedbacks: data,
    },
  };
};
