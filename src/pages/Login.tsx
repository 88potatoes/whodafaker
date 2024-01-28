import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import FramerButton from "../components/FramerButton";
import { usePopup } from "../components/PassiveLayout";
import ScreenWindow from "../components/ScreenWindow";
import useRequireAuth from "../components/useRequireAuth";
import { auth } from "../main";


/**
 * Login component - route="/login"
 * @returns 
 */
function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { setPopup } = usePopup();

    // will redirect to dashboard if already logged in
    useRequireAuth(false, true)

    function emailLogin(e: FormEvent) {
        e.preventDefault();
        console.log('email login')

        const emailInput = document.getElementById('email') as HTMLInputElement;
        const passwordInput = document.getElementById('password') as HTMLInputElement;

        console.log(emailInput?.value, passwordInput.value)
        setLoading(true);

        signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
            .then(cred => {
                console.log(cred)
                navigate("/dashboard")
            })
            .catch(error => {
                setPopup("Login error please try again")
                console.log(error)
                setLoading(false);
            })
    }

    function googleLogin() {
        console.log("set spinner")
        setLoading(true);
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
            .then(cred => {
                console.log(cred.user)
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
    }

    return (
        <ScreenWindow>
            <div className="offset-6 col-6 d-flex flex-column justify-content-center text-center align-items-center secondarysection h-100">
                <div>
                    <h1>Who's the Faker?</h1>
                    <h2>Login</h2>
                </div>
                {!loading ?
                    <>
                        <form onSubmit={emailLogin} className="d-flex flex-column col-6 justify-content-center align-items-center mb-2 w-100">
                            <div className="d-flex flex-column align-items-start">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" required />
                            </div>
                            <div className="d-flex flex-column align-items-start">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" required />
                            </div>
                            <div className="m-2">
                                <input type="submit" value="Log in" />
                            </div>
                        </form>
                        <div className="d-flex">
                            <div className="m-2"><p>No Account?
                                <FramerButton link="/signup" text="Sign up"/>
                            </p></div>
                        </div>
                        <div className="m-2">
                            <button className="bg-white text-black" onClick={googleLogin}>Sign in with Google</button>
                        </div> </> : <div className="loading"></div>}
                <FramerButton link="/" text="Home" />
            </div>
        </ScreenWindow>);
}

export default Login;