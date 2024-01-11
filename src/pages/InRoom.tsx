import { XSocketClient } from "phonesocket/xclient";
import { ws_send } from "phonesocket";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function InRoom() {
    const params = useParams();
    const roomCode = params.roomCode;

    useEffect(() => {
        const xsc = new XSocketClient('phone', "ws://localhost:9090");

        xsc.onopen = () => {
            ws_send(xsc, "join_room", {roomCode: roomCode})
        }
    }, [])

    return ( <div className="container">
        <div className="row">
            <div className="col">
                <h1>Joined Room {roomCode} </h1>
            </div>
        </div>
    </div> );
}

export default InRoom;
