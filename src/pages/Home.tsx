import { motion } from "framer-motion";
import Faker from "../assets/images/faker.png";
import Villager from "../assets/images/goodguy.png";
import CenteredFlex from "../components/CenteredFlex";
import FramerButton from "../components/FramerButton";
import Rules from "../components/Rules";
import ScreenWindow from "../components/ScreenWindow";

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
    hidden: { opacity: 0 },
    show: {
        opacity: 1
    }
}

/**
 * Homepage component - route="/"
 * @returns 
 */
function Home() {
    return (<>
        <ScreenWindow>
            <CenteredFlex>
                <motion.div
                    className="w-100 h-75 d-flex flex-column justify-content-center align-items-center"
                >
                    <div className="text-center">
                        <motion.h1 className="main-title display-1"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.7, type: "spring" }}
                        >Who's the Faker?</motion.h1>

                    </div>

                    <motion.img src={Villager} alt="villager" width={150} height={150}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: "-5deg", left: "90px", bottom: "120px", opacity: 0.5 }}
                        transition={{ duration: 0.7, type: "spring", delay: 0.1 }}
                        className="position-absolute rounded roleimage z-n1"
                    />
                    <motion.img src={Faker} alt="faker" width={150} height={150}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: "4deg", right: "100px", top: "70px", opacity: 0.3 }}
                        transition={{ duration: 0.7, type: "spring", delay: 0.1 }}
                        className="position-absolute rounded roleimage z-n1 whitecover"
                    />

                    <motion.ul variants={list} initial="hidden" animate="show" className="d-flex flex-column justify-content-center align-items-center">
                        <motion.li variants={item} className="mt-2">
                            <FramerButton link="/join" text="Join Game" />
                        </motion.li>
                        <motion.li variants={item} className="mt-2">
                            <FramerButton link="/login" text="Sign in" />
                        </motion.li>
                        <motion.li variants={item} className="mt-2">
                            <FramerButton link="/signup" text="Sign up" />
                        </motion.li>
                    </motion.ul>
                </motion.div>
            </CenteredFlex>
        </ScreenWindow>
        <Rules />
    </>
    );
}

export default Home;