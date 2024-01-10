interface setProps {
    word: string
}

function SetCard(props: setProps) {
    return ( 
        <div className="col-3">
            <div className="col-10 bg-warning">
                <h2>{props.word}</h2>
            </div>
        </div>
     );
}

export default SetCard;