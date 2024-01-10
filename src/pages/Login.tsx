import { FormEvent } from "react";

function Login() {

    function emailLogin(e: FormEvent) {
        e.preventDefault();
        console.log('email login')
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
                        <input type="email" required/>
                    </div>
                    <div className="d-flex flex-column align-items-start">
                        <label htmlFor="password">Password</label>
                        <input type="password" required/>
                    </div>
                    <div className="m-2">
                        <input type="submit" />
                    </div>
                </form>

                <div>
                    <button id="GoogleSignIn">Sign in with Google</button>
                </div>
            </div>
        </div>
    </div> );
}

export default Login;