import { Link, useNavigate } from "react-router-dom";

interface setProps {
    word: string,
    setId: string
}

function SetCard(props: setProps) {
    const linkTo = `/createset/${props.setId}`;
    const navigate = useNavigate();
    return ( 
        <div
        className="col-3 d-flex flex-column justify-content-center align-items-center">
            <div onClick={() => {
            navigate(linkTo)
            }} className="col-11 bg-primary rounded hoverablecard text-center my-2">
                <h2 className="text-black">{props.word}</h2>
            </div>
        </div>    
     );
}

export default SetCard;