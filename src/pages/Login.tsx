import { GoogleAuthProvider, getRedirectResult, onAuthStateChanged, signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import { FormEvent, useEffect } from "react";
import { auth } from "../main";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/dashboard")
            }
        })
    })

    function emailLogin(e: FormEvent) {
        e.preventDefault();
        console.log('email login')

        const emailInput = document.getElementById('email') as HTMLInputElement;
        const passwordInput = document.getElementById('password') as HTMLInputElement;

        console.log(emailInput?.value, passwordInput.value)

        signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .then(cred => {
            console.log(cred)
            navigate("/dashboard")
        })
        .catch(error => {
            console.log(error)
        })
    }

    function googleLogin() {
        const googleProvider = new GoogleAuthProvider();
        signInWithRedirect(auth, googleProvider)
        
        getRedirectResult(auth)
        .then(cred => {
            console.log(cred.user)
        })
    }

    return ( 
    <div>
        <div className="row whitecontainer">
            <div className="col d-flex flex-column justify-content-center text-center align-items-center">
                <div>
                    <h1>Who's the Faker?</h1>
                    <h2>Login</h2>
                </div>
                <form onSubmit={emailLogin} className="d-flex flex-column col-6 justify-content-center align-items-center mb-2 w-100">
                    <div className="d-flex flex-column align-items-start">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" required/>
                    </div>
                    <div className="d-flex flex-column align-items-start">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" required/>
                    </div>
                    <div className="m-2">
                        <input type="submit" />
                    </div>
                </form>

                <div className="m-2">
                    <button id="GoogleSignIn" onClick={googleLogin}>Sign in with Google</button>
                </div>
                <div className="m-2">
                    <Link to="/">
                        <button id="HomeButton">Home</button>
                    </Link>
                </div>
                <div className="d-flex">
                    <div className="m-2"><p>No Account?</p></div>

                        <Link to="/signup">
                            <button id="SignupButton">Sign up</button>
                        </Link>

                </div>
            </div>
        </div>
    </div> );
}

export default Login;