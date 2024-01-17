import { GoogleAuthProvider, getRedirectResult, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { FormEvent, useEffect, useState } from "react";
import { auth } from "../main";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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
        setLoading(true);

        signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .then(cred => {
            console.log(cred)
            navigate("/dashboard")
        })
        .catch(error => {
            alert("login error please try again")
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
    <div className="whitecontainer">
        <div className="m-4">
                <div className="col d-flex flex-column justify-content-center text-center align-items-center">
                    <div>
                        <h1>Who's the Faker?</h1>
                        <h2>Login</h2>
                    </div>
                    { !loading ? 
                    <>
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
                            <input type="submit" value="Log in"/>
                        </div>
                    </form>
                    <div className="d-flex">
                        <div className="m-2"><p>No Account? 
                            <strong id="SignupButton" className="hoverablecard" onClick={() => {
                                navigate("/signup")
                            }}> Sign up</strong>
                            </p></div>
                    </div>
                    <div className="m-2">
                        <button id="GoogleSignIn" className="bg-white text-black" onClick={googleLogin}>Sign in with Google</button>
                    </div> </>: <div className="loading"></div>}
                    <div className="m-2">
                        <div id="HomeButton" className="hoverablecard" onClick={() => {
                            navigate("/")
                        }}><strong>Home</strong></div>
                    </div>
                </div>
        </div>
    </div> );
}

export default Login;