import { Link } from "react-router-dom";

function Home() {
    return ( <div className="container text-center">
        <h1>Who's the Faker?</h1>
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
    </div> );
}

export default Home;