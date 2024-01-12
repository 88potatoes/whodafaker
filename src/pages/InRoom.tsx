import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

function InRoom() {
    const params = useParams();
    const roomCode = params.roomCode;

    useEffect(() => {
        console.log("hook running!")
        const socket = io("http://localhost:9090");
        socket.on('connect', () => {
            console.log('Connected to the server!')
        })
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
