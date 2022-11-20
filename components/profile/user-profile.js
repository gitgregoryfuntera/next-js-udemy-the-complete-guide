// import { getSession } from "next-auth/client";
// import { useEffect, useState } from "react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  // Redirect away if NOT auth
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   fetchSession();
  // }, []);

  // const fetchSession = async () => {
  //   const session = await getSession();
  //   if (!session) {
  //     window.location.href = "/"
  //   } else {
  //     setIsLoading(false);
  //   }
  // };

  // if (isLoading) {
  //   return <>Loading...</>
  // }
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
