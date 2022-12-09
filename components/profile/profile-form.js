import { useRef } from "react";
import classes from "./profile-form.module.css";

function ProfileForm() {
  const newPasswordRef = useRef();
  const oldPasswordRef = useRef();

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const newPasswordVal = newPasswordRef?.current?.value;
    const oldPasswordVal = oldPasswordRef?.current?.value;
    const changePassArgs = {
      oldPassword: oldPasswordVal,
      newPassword: newPasswordVal,
    };
    console.log("🚀 ~ file: profile-form.js:16 ~ onHandleSubmit ~ changePassArgs", changePassArgs);
    const result = await changePassword(changePassArgs);
    console.log(
      "🚀 ~ file: profile-form.js:17 ~ onHandleSubmit ~ result",
      result
    );
  };

  const changePassword = async (changePassArgs) => {
    console.log(JSON.stringify(changePassArgs));
    try {
      const response = await fetch(`/api/user/change-password`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(changePassArgs),
      });
      const result = await response.json();
      return result;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className={classes.form} onSubmit={onHandleSubmit}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
