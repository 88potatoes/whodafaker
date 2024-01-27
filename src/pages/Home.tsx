import { Link } from "react-router-dom";
import Rules from "../components/Rules";
import { motion } from "framer-motion";
import ScreenWindow from "../components/ScreenWindow";
import CenteredFlex from "../components/CenteredFlex";
import Villager from "../assets/images/goodguy.png"
import Faker from "../assets/images/faker.png"

const list = {
    hidden: {},
    show: {
        transition: {
            delayChildren: 0.5,
            staggerChildren: 0.1
        }
    }
};
const item = {
    hidden: { opacity: 0},
    show: {
        opacity: 1
    }
}

function Home() {
    return (<>
        <ScreenWindow>
            <CenteredFlex>
                <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: 0.8 }}
                    transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                    className="w-100 h-75 d-flex flex-column justify-content-center align-items-center"
                >
                    <motion.h1 className="main-title display-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.7, type: "spring" }}
                    >Who's the Faker?</motion.h1>

                    <motion.img src={Villager} alt="villager" width={150} height={150}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: "-5deg", left: "90px", bottom: "90px" }}
                        transition={{ duration: 0.7, type: "spring", delay: 0.1 }}
                        className="position-absolute rounded roleimage z-n1"
                    />
                    <motion.img src={Faker} alt="faker" width={150} height={150}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: "4deg", right: "100px", top: "110px" }}
                        transition={{ duration: 0.7, type: "spring", delay: 0.1 }}
                        className="position-absolute rounded roleimage z-n1"
                    />

                </motion.div>
                <motion.ul variants={list} initial="hidden" animate="show">
                    <motion.li variants={item}>
                        <motion.button
                            // whileHover={{ rotate: '2deg', scale: 1.1 }}
                            // whileTap={{ rotate: '-1deg', scale: 0.9 }}
                        >
                            Join a game
                        </motion.button>
                    </motion.li>
                    <motion.li variants={item}>
                        <motion.button
                            // whileHover={{ rotate: '2deg', scale: 1.1 }}
                            // whileTap={{ rotate: '-1deg', scale: 0.9 }}
                        >
                            Join a game
                        </motion.button>
                    </motion.li>
                    <motion.li variants={item}>
                        <motion.button
                            // whileHover={{ rotate: '2deg', scale: 1.1 }}
                            // whileTap={{ rotate: '-1deg', scale: 0.9 }}
                        >
                            Join a game
                        </motion.button>
                    </motion.li>
                </motion.ul>
            </CenteredFlex>
        </ScreenWindow>
        <div className="m-4">
            <div className="container text-center d-flex flex-column justify-content-center align-items-center">
                <div className="whitecontainer">
                    <div className="m-4">
                        <h1 className="">Who's the Faker?</h1>
                        <div className="m-2">
                            <Link to="/join">
                                <motion.button
                                    whileHover={{ rotate: '2deg', scale: 1.1 }}
                                    whileTap={{ rotate: '-1deg', scale: 0.9 }}
                                >
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