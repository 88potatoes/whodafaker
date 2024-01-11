import { useParams } from "react-router-dom";

function InRoom() {
    const params = useParams();
    const roomCode = params.roomCode;
    return ( <div className="container">
        <div className="row">
            <div className="col">
                <h1>Joined Room {roomCode} </h1>
            </div>
        </div>
    </div> );
}

export default InRoom;