
interface CardProps {
    word: string, 
    deletable: boolean,
    delete: (a0: string) => void;
}

function Card(props: CardProps) {
    // col-sm-3 col-md-2
    return (
    <div className="col-4 col-sm-3 col-md-2 text-center py-3 border-1 border-black d-flex justify-content-center align-items-center">
        <div className="col-10 bg-primary py-3 px-2 d-flex align-items-center rounded position-relative text-center justify-content-center text-white">
            <div style={{textOverflow: "ellipsis", overflow: "hidden"}}><strong>{props.word}</strong></div>
            { props.deletable &&
                <div className="hoverablecard position-absolute float-right px-1" style={{top: 0, left: 0}} onClick={() => {props.delete(props.word)}}>X</div>
            }  
        </div>
    </div>
    );
}

export default Card;