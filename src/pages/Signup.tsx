import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { FormEvent, useEffect } from "react";
import { auth } from "../main";
import { useNavigate } from "react-router-dom";

/**
 * Signup component - route="/signup"
 * @returns 
 */
function Signup() {
    const navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/dashboard")
            }
        })
    })

    function emailSignup(e: FormEvent) {
        e.preventDefault();

        const emailInput = document.getElementById('email') as HTMLInputElement;
        const passwordInput = document.getElementById('password') as HTMLInputElement;

        console.log(emailInput?.value, passwordInput.value)

        createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
            .then(cred => {
                const usernameElement = document.getElementById('username') as HTMLInputElement;
                return updateProfile(cred.user, {
                    displayName: usernameElement.value
                })
            })
            .then(() => {
                navigate("/dashboard")
            })
            .catch(error => {
                alert(error)
            })


    }

    return (
        <div className="whitecontainer">
            <div className="m-4">
                <div className="col d-flex flex-column justify-content-center text-center align-items-center">
                    <div>
                        <h1>Who's the Faker?</h1>
                        <h2>Sign up</h2>
                    </div>
                    <form onSubmit={emailSignup} className="d-flex flex-column col-6 justify-content-center align-items-center mb-2 w-100">
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

                    <div className="m-2">
                        <div id="HomeButton" className="hoverablecard" onClick={() => {
                            navigate("/")
                        }}><strong>Home</strong></div>
                    </div>
                    <div className="m-2">
                        <div id="HomeButton" className="hoverablecard" onClick={() => {
                            navigate("/login ")
                        }}><strong>Log in</strong></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;