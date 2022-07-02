import { useRef, useState } from "react";

function HomePage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const emailRef = useRef();
  const feedbackRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    console.log("🚀 ~ file: index.js ~ line 9 ~ handleSubmit ~ email", email);
    const feedback = feedbackRef.current.value;
    console.log(
      "🚀 ~ file: index.js ~ line 11 ~ handleSubmit ~ feedback",
      feedback
    );
    const reqBody = {
      email,
      feedback,
    };

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: { "Content-Type": "application/json" },
      });
      console.log(
        "🚀 ~ file: index.js ~ line 24 ~ handleSubmit ~ response",
        response
      );

      const data = await response.json();
      console.log("🚀 ~ file: index.js ~ line 26 ~ handleSubmit ~ data", data);
    } catch (e) {
      console.log("🚀 ~ file: index.js ~ line 31 ~ handleSubmit ~ e", e);
    }
  };

  const getFeedbacks = async () => {
    try {
      const getResponse = await fetch("/api/feedback");
      const {
        response: { feedbacks },
      } = await getResponse.json();
      console.log(
        "🚀 ~ file: index.js ~ line 43 ~ getFeedbacks ~ feedbacks",
        feedbacks
      );
      setFeedbacks(feedbacks);
    } catch (e) {
      console.log("🚀 ~ file: index.js ~ line 46 ~ getFeedbacks ~ e", e);
    }
  };
  return (
    <div>
      <h1>The Home Page</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input name="email" ref={emailRef} />
          <label htmlFor="feedback">Feedback</label>
          <textarea rows="2" ref={feedbackRef}></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
      <hr />
      <button onClick={getFeedbacks}>load feedback</button>
      <ul>
        {feedbacks.map(({ id, feedback }) => (
          <li key={id}>{feedback}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
