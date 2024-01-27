import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface FramerButtonProps {
    link: string,
    text: string
}

function FramerButton({ link, text }: FramerButtonProps) {
    const navigate = useNavigate();

    return (<motion.button
        className="m-2"
        onClick={() => { navigate(link) }}
        whileHover={{ rotate: `${Math.random()*6-3}deg`, scale: 1.1 }}
        whileTap={{ rotate: `${Math.random()*6-3}deg`, scale: 0.9 }}
    >
        {text}
    </motion.button>);
}

export default FramerButton;