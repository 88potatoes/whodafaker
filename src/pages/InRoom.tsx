import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

function InRoom() {
    const params = useParams();
    const [inGame, setInGame] = useState(false);
    const [revealed, setRevealed] = useState(false);
    const navigate = useNavigate();
    const [HiddenElement, setHiddenElement] = useState(<></>)
    const location = useLocation();

    console.log("location", location)
    const username = location.state;
    const roomCode = params.roomCode;

    useEffect(() => {
        console.log("hook running!")
        const socket = io("ws://localhost:9091");
        socket.on('connect', () => {
            console.log('Connected to the server!')
            socket.emit("join_room", {roomCode: roomCode, username: username})
        })

        socket.on("join_status", (data) => {
            if (data.status === "fail") {
                alert(`failed to join room ${roomCode}`)
                navigate("/join")
            }
        })

        socket.on("room_close", () => {
            alert("room has been closed");
            navigate("/join")
        })

        socket.on("start_game", (data) => {
            // data: {role: faker || good, word: string}
            setInGame(true);
            if (data.role == "faker") {
                setHiddenElement(<h3>You are the Faker</h3>)
            } else {
                setHiddenElement(<>
                    <h4>The word is</h4>
                    <h3>{data.word}</h3>
                </>)
            }
        })
        
        socket.on("end_game", () => {
            setInGame(false);
            setHiddenElement(<></>)
            setRevealed(false)
        })

        return () => {
            socket.disconnect();
        }
    }, [])

    function toggleReveal() {
        setRevealed(!revealed)
    }

    return ( <div className="container">
        <div className="row">
            <h2>You are {username}</h2>
        </div>
        <div className="row">
            <div className="col">
                {!inGame ?
                    <h1>Joined Room {roomCode} </h1> 
                :
                <>
                    <button onClick={toggleReveal}>{`Click to ${revealed ? "hide" : "reveal"}`}</button>
                    <div id="reveal" style={{ display: revealed ? "block" : "none"}}>
                        {HiddenElement}
                    </div>
                </>
                }
            </div>
        </div>
    </div> );
}

export default InRoom;

