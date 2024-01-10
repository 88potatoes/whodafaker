import { createUserWithEmailAndPassword } from "firebase/auth";
import { FormEvent } from "react";
import { auth } from "../main";
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();

    function emailSignup(e: FormEvent) {
        e.preventDefault();
        
        const emailInput = document.getElementById('email') as HTMLInputElement;
        const passwordInput = document.getElementById('password') as HTMLInputElement;

        console.log(emailInput?.value, passwordInput.value)

        createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .then(cred => {
            console.log(cred);
            navigate("/dashboard")
        })
        .catch(error => {
            console.log(error)
        })


    }

    return ( <div className="container">
        <div className="row">
            <div className="col d-flex flex-column justify-content-center text-center align-items-center">
                <h1>Signup</h1>
                <form onSubmit={emailSignup} className="d-flex flex-column col-6 justify-content-center align-items-center mb-5">
                    <div className="d-flex flex-column align-items-start">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" required/>
                    </div>
                    <div className="d-flex flex-column align-items-start">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" required/>
                    </div>
                    <div className="m-2">
                        <input type="submit" value="Sign Up"/>
                    </div>
                </form>
            </div>
        </div>
    </div> );
}

export default Signup;