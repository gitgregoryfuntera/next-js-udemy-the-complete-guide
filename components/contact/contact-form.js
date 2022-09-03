import { useState } from "react";
import classes from "./contact-form.styles.module.css";

const ContactForm = () => {
  const [submitBody, setSubmitBody] = useState({
    email: "",
    name: "",
    message: "",
  });
  const sendMessageHandler = (e) => {
    e.preventDefault();
    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(submitBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const onChangeHandler = (e) => {
    const {
      target: { value, id },
    } = e;

    setSubmitBody((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={submitBody.email}
              onChange={onChangeHandler}
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={submitBody.name}
              onChange={onChangeHandler}
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="message">Your Message</label>
            <textarea
              rows="5"
              type="text"
              id="message"
              value={submitBody.message}
              onChange={onChangeHandler}
            ></textarea>
          </div>

          <div className={classes.actions}>
            <button>Send Message</button>
          </div>
        </div>
      </form>
    </section>
  );
};
export default ContactForm;
