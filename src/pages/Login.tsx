import { signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent } from "react";
import { auth } from "../main";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

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

    return ( 
    <div className="container">
        <div className="row">
            <div className="col d-flex flex-column justify-content-center text-center align-items-center">
                <div>
                    <h1>Login</h1>
                </div>
                <form onSubmit={emailLogin} className="d-flex flex-column col-6 justify-content-center align-items-center mb-5">
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
                    <button id="GoogleSignIn">Sign in with Google</button>
                </div>
                <div className="m-2">
                    <Link to="/">
                        <button id="HomeButton">Home</button>
                    </Link>
                </div>
                <div className="m-2">No Account?

                    <Link to="/signup">
                        <button id="SignupButton">Sign up</button>
                    </Link>
                </div>
            </div>
        </div>
    </div> );
}

export default Login;