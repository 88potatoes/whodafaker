import { Link } from "react-router-dom";
import paperbg from "../assets/randobackground.png"

function Home() {
    return ( 
    <div className="w-100 h-100 d-flex">
        <div className="container text-center d-flex flex-column justify-content-center align-items-center">
            <div className="whitecontainer">
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
    );
}

export default Home;