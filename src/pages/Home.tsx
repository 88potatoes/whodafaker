import { Link } from "react-router-dom";
import Rules from "../components/Rules";
import { motion } from "framer-motion";
import ScreenWindow from "../components/ScreenWindow";

function Home() {
    return (<>
        <ScreenWindow>
            <h1>Who's the Faker?</h1>
        </ScreenWindow>
        <div className="m-4">
            <div className="container text-center d-flex flex-column justify-content-center align-items-center">
                <div className="whitecontainer">
                    <div className="m-4">
                        <h1 className="">Who's the Faker?</h1>
                        <div className="m-2">
                            <Link to="/join">
                                <motion.button
                                    whileHover={{ rotate: '2deg', scale: 1.1 }}>
                                    Join a game
                                </motion.button>
                            </Link>
                        </div>
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

        <Rules />
    </>
    );
}

export default Home;