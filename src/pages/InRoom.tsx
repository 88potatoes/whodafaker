import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

function InRoom() {
    const params = useParams();
    const navigate = useNavigate();
    const roomCode = params.roomCode;

    useEffect(() => {
        console.log("hook running!")
        const socket = io("ws://localhost:9091");
        socket.on('connect', () => {
            console.log('Connected to the server!')
            socket.emit("join_room", {roomCode: roomCode})
        })

        socket.on("join_status", (data) => {
            if (data.status === "fail") {
                alert(`failed to join room ${roomCode}`)
                navigate("/join")
            }
        })

        return () => {
            socket.disconnect();
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
