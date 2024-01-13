import { Link, useNavigate } from "react-router-dom";

interface setProps {
    word: string,
    setId: string
}

function SetCard(props: setProps) {
    const linkTo = `/createset/${props.setId}`;
    const navigate = useNavigate();
    return ( 
        <div onClick={() => {
            navigate(linkTo)
        }} 
        className="col-3 d-flex flex-column justify-content-center align-items-center p-1 m-1 bg-primary rounded hoverablecard">
            <div>
                <h2 className="text-black">{props.word}</h2>
            </div>
        </div>    
     );
}

export default SetCard;