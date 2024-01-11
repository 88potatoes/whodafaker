import { Link } from "react-router-dom";

interface setProps {
    word: string,
    setId: string
}

function SetCard(props: setProps) {
    const linkTo = `/createset/${props.setId}`
    return ( 
        <Link to={linkTo}>
            <div className="col-3">
                <div className="col-10 bg-warning">
                    <h2>{props.word}</h2>
                </div>
            </div>    
        </Link>
     );
}

export default SetCard;