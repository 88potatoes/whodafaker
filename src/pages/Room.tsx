import { useParams } from "react-router-dom";
import CardGrid from "../CardGrid";

function Room() {
    const params = useParams();
    const roomCode = params.roomCode;
    console.log(roomCode);

    return ( 
    <div>
        <div className="row">
            <h1>Room {roomCode}</h1>
        </div>
        <div className="row">
            <h2>Players</h2>
        </div>
        <div>
            <h2>Set</h2>
            
        </div>

    </div> );
}

export default Room;