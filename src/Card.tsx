import { isButtonElement } from "react-router-dom/dist/dom";

interface CardProps {
    word: string, 
    deletable: boolean,
    delete: Function
}

function Card(props: CardProps) {
    return <div className="col-4 col-sm-3 col-md-2 text-center py-3 border-1 border-black">
        <div className="col bg-info py-3 d-flex justify-content-around align-items-center">
            <div>{props.word}</div>
            { props.deletable &&
                <button className="m-2" onClick={() => {props.delete(props.word)}}>X</button>
            }  
        </div>
    </div>
}

export default Card;