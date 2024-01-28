import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface FramerButtonProps {
    link?: string,
    text: string,
    onClick?: () => void
}

/**
 * Button which wobbles using framer motion
 * @prop link?: string - link to go to on button press -
 * @prop text: string - text to display on the button
 * @prop onClick?: () => void - function to execute. will only execute if link is not supplied
 * @returns FramerButton component
 */
function FramerButton({ link, text, onClick }: FramerButtonProps) {
    const navigate = useNavigate();

    return (<motion.button
        onClick={() => {
            if (link) {
                navigate(link);
                return;
            }
            if (onClick) {
                onClick();
                return;
            }
         }}
        whileHover={{ rotate: `${Math.random()*6-3}deg`, scale: 1.1 }}
        whileTap={{ rotate: `${Math.random()*6-3}deg`, scale: 0.9 }}
    >
        {text}
    </motion.button>);
}

export default FramerButton;