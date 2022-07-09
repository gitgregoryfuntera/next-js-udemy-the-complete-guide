import { useRef } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailRef = useRef();
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
      const response = await data.json();

      console.log(
        "🚀 ~ file: newsletter-registration.js ~ line 20 ~ registrationHandler ~ response",
        response
      );
    } catch (e) {
      console.log(
        "🚀 ~ file: newsletter-registration.js ~ line 21 ~ registrationHandler ~ e",
        e
      );
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
