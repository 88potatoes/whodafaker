
interface CardProps {
    word: string,
    deletable: boolean,
    delete: (a0: string) => void;
}

function Card(props: CardProps) {
    // col-sm-3 col-md-2
    return (
        <div className="col-2 d-flex justify-content-center align-items-center g-1">
            <div className="col"></div>
            <div className="col-11 text-center bg-primary p-3 rounded text-white position-relative"
                style={{ textOverflow: "ellipsis", overflow: "hidden" }} // for overflow
            >
                {props.word}

                {props.deletable &&
                    <div className="hoverablecard position-absolute float-right px-1" style={{ top: 0, left: 0 }} onClick={() => { props.delete(props.word) }}>X</div>
                }
            </div>
            <div className="col"></div>

            {/* <div className=" bg-primary rounded text-white">
                <div style={{ textOverflow: "ellipsis", overflow: "hidden" }}><strong>{props.word}</strong></div>
            </div> */}
        </div>
    );
}

export default Card;