import { useParams } from "react-router-dom";
import CardGrid from "../CardGrid";
import { useEffect, useState } from "react";
import { XSocketClient } from "phonesocket/xclient";
import { ws_send } from "phonesocket";

function Room() {
    const params = useParams();
    const players = useState<number[]>([])
    const roomCode = params.roomCode;
    console.log(roomCode);

    useEffect(() => {
        const xsc = new XSocketClient('phone', "ws://localhost:9090");

        xsc.onopen = () => {
            ws_send(xsc, "join_room_host", {roomCode: roomCode})
            console.log("opened")
        }
        
        // xsc.register_event("create_room", {});
    });

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