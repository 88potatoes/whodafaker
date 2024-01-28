import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface setProps {
    word: string,
    setId: string
}

function SetCard(props: setProps) {
    const linkTo = `/createset/${props.setId}`;
    const navigate = useNavigate();
    return ( 
        <motion.div
        className="col-6 col-md-4 col-lg-3 d-flex flex-column justify-content-center align-items-center"
        whileHover={{ rotate: `${Math.random()*6-3}deg`, scale: 1.1 }}
        whileTap={{ rotate: `${Math.random()*6-3}deg`, scale: 0.9 }}
        >
            <div onClick={() => {
            navigate(linkTo)
            }} className="col-11 bg-primary rounded hoverablecard text-center my-2 py-5">
                <h2 className="text-light">{props.word}</h2>
            </div>
        </motion.div>    
     );
}

export default SetCard;