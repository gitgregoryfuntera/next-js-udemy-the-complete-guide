import { useRef, useState } from "react";
import classes from "./auth-form.module.css";
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router';

function AuthForm() {
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const createUser = async (email, password) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const emailValue = emailRef?.current?.value;
    const passwordValue = passwordRef?.current?.value;
    try {
      if (isLogin) {
        // user is currently logged in
        const result = await signIn('credentials', {
          redirect: false, 
          email: emailValue,
          password: passwordValue
        });
        if (!result.error) {
          router.replace('/profile');
        }
      } else {
        const data = await createUser(emailValue, passwordValue);
        console.log("🚀 ~ file: auth-form.js ~ line 35 ~ handleOnSubmit ~ data", data);
      }
    } catch (e) {
      console.log("🚀 ~ file: auth-form.js ~ line 32 ~ submitLogin ~ e", e);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleOnSubmit}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef}/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
