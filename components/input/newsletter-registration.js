import { useContext, useRef } from "react";
import NotificationContext from "../../store/notification-context";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  async function registrationHandler(event) {
    event.preventDefault();
    // fetch user input (state or refs)
    const {
      current: { value },
    } = emailRef;
    console.log(
      "🚀 ~ file: newsletter-registration.js ~ line 12 ~ registrationHandler ~ value",
      value
    );

    notificationCtx.showNotification({
      title: "Registration",
      message: "Registering new email",
      status: "pending",
    });
    // optional: validate input
    // send valid data to API
    try {
      const reqBody = {
        email: value,
      };
      const data = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: { "Content-Type": "application/json" },
      });
      const responseStatus = await data.status;
      const response = await data.json();

      if (responseStatus !== 201) {
        throw new Error(`${response.message}`);
      }

      console.log(
        "🚀 ~ file: newsletter-registration.js ~ line 20 ~ registrationHandler ~ response",
        response
      );

      notificationCtx.showNotification({
        title: "Registration",
        message: "Registration success",
        status: "success",
      });
    } catch (e) {
      console.log(
        "🚀 ~ file: newsletter-registration.js ~ line 21 ~ registrationHandler ~ e",
        e
      );
      notificationCtx.showNotification({
        title: "Registration",
        message: `Error: s${e.message}`,
        status: "error",
      });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
