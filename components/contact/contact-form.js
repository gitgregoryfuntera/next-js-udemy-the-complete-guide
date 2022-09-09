import { useEffect, useState } from "react";
import classes from "./contact-form.styles.module.css";
import Notification from "../notification/notification";

const ContactForm = () => {
  const [submitBody, setSubmitBody] = useState({
    email: "",
    name: "",
    message: "",
  });
  const [requestStatus, setRequestStatus] = useState(null); // pending, success, error

  const [notificationStatus, setNotificationStatus] = useState({
    status: null,
    title: null,
    message: null,
  });

  useEffect(() => {
    if (requestStatus === "error" || requestStatus === "success") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const sendMessage = async () => {
    setRequestStatus("pending");
    setNotificationStatus({
      message: `Sending message`,
      title: "Please wait",
      status: "pending",
    });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(submitBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonRes = await response.json();

      if (jsonRes?.message === "success") {
        // do success
        setRequestStatus("success");
        setNotificationStatus({
          message: "Success",
          title: "Success",
          status: "success",
        });
        setSubmitBody({
          email: "",
          name: "",
          message: "",
        });
      } else {
        // do error
        setRequestStatus("error");
        setNotificationStatus({
          message: "Error sending message",
          title: "Error",
          status: "error",
        });
      }
      console.log(
        "🚀 ~ file: contact-form.js ~ line 23 ~ sendMessage ~ jsonRes",
        jsonRes
      );
    } catch (e) {
      console.log("🚀 ~ file: contact-form.js ~ line 23 ~ sendMessage ~ e", e);
      setRequestStatus("error");
      setNotificationStatus({
        message: `Error: ${e.message}`,
        title: "Error",
        status: "error",
      });
    }
  };
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    await sendMessage();
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
      {requestStatus && (
        <Notification
          status={notificationStatus.status}
          message={notificationStatus.message}
          title={notificationStatus.title}
        />
      )}
    </section>
  );
};
export default ContactForm;
