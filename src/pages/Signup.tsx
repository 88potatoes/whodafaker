import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import useRequireAuth from "../components/useRequireAuth";
import { auth } from "../main";
import FramerButton from "../components/FramerButton";
import ScreenWindow from "../components/ScreenWindow";

/**
 * Signup component - route="/signup" \ 
 * Signup page
 * @returns
 */
function Signup() {
  const navigate = useNavigate();

  // will redirect to dashboard if user is already logged in
  useRequireAuth(false, true);

  /**
   * Attempt to sign up with email
   * @param e
   */
  function emailSignup(e: FormEvent) {
    e.preventDefault();

    // get credentials
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;

    console.log(emailInput?.value, passwordInput.value);

    // firebase email sign up
    createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
      .then((cred) => {
        const usernameElement = document.getElementById(
          "username"
        ) as HTMLInputElement;
        return updateProfile(cred.user, {
          displayName: usernameElement.value,
        });
      })
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <ScreenWindow>
      <div className="col d-flex flex-column justify-content-center text-center align-items-center">
        <div>
          <h1>Who's the Faker?</h1>
          <h2>Sign up</h2>
        </div>
        {/** Form element */}
        <form
          onSubmit={emailSignup}
          className="d-flex flex-column col-6 justify-content-center align-items-center mb-2 w-100"
        >
          <div className="d-flex flex-column align-items-start">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required />
          </div>
          <div className="d-flex flex-column align-items-start">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div className="d-flex flex-column align-items-start">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
          </div>
          <div className="m-2">
            <input type="submit" value="Sign up" />
          </div>
        </form>
        {/** Navigation buttons */}
        <FramerButton link="/" text="Home" />
        <FramerButton link="/login" text="Log in" />
      </div>
    </ScreenWindow>
  );
}

export default Signup;
