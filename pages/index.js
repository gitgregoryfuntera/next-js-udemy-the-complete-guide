import { useRef } from "react";

function HomePage() {
  const emailRef = useRef();
  const feedbackRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    console.log("🚀 ~ file: index.js ~ line 9 ~ handleSubmit ~ email", email);
    const feedback = feedbackRef.current.value;
    console.log(
      "🚀 ~ file: index.js ~ line 11 ~ handleSubmit ~ feedback",
      feedback
    );
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
    </div>
  );
}

export default HomePage;
