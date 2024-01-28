import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface SetCardProps {
    text: string,
    setId?: string,
    onClick?: () => void
}

function SetCard({ setId, text, onClick }: SetCardProps) {
    const linkTo = `/createset/${setId}`;
    const navigate = useNavigate();
    return (
        <div
            className="col col-md-6 col-xl-4 d-flex flex-column justify-content-center align-items-center"
        >
            <motion.button onClick={() => {
                if (setId) {
                    navigate(linkTo)
                } else if (onClick){
                    onClick();
                }
            }} className="col-11 bg-primary rounded hoverablecard text-center my-2 py-5"
                whileHover={{ rotate: `${Math.random() * 6 - 3}deg`, scale: 1.1 }}
                whileTap={{ rotate: `${Math.random() * 6 - 3}deg`, scale: 0.9 }}>
                <h2 className="text-light">{text}</h2>
            </motion.button>
        </div>
    );
}

export default SetCard;