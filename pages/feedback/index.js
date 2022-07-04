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
