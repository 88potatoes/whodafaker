import { Link } from "react-router-dom";
import Rules from "../components/Rules";

function Home() {
    return (
        <div className="w-100 h-100 d-flex flex-column justify-content-center">
            <div className="m-4">
                <div className="container text-center d-flex flex-column justify-content-center align-items-center">
                    <div className="whitecontainer">
                        <div className="m-4">
                            <h1 className="">Who's the Faker?</h1>
                            <div className="m-2">
                                <Link to="/login">
                                    <button>Sign in</button>
                                </Link>
                            </div>
                            <div className="m-2">
                                <Link to="/signup">
                                    <button>Sign up</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Rules/>
        </div>
    );
}

export default Home;