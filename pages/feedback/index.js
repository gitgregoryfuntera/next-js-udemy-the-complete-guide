import { getData, getFilePath } from "../api/feedback";

const Feedback = (props) => {
  const { feedbacks } = props;

  return (
    <ul>
      {feedbacks.map(({ id, feedback }) => (
        <li key={id}>{feedback}</li>
      ))}
    </ul>
  );
};

export default Feedback;

export const getStaticProps = () => {
  const filePath = getFilePath();
  const data = getData(filePath);
  return {
    props: {
      feedbacks: data,
    },
  };
};
