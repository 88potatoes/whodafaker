import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import goodguy from "../assets/images/goodguy.png";
import faker from "../assets/images/faker.png";

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
        if (username == null) {
            alert("error: no username")
            navigate("/join")
        }
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
                setHiddenElement(
                <>
                    <img src={faker} alt="faker" width={150} height={150} className="mb-3 rounded roleimage"/>
                    <h3>You are the Faker</h3>
                </>)
            } else {
                setHiddenElement(<>
                    <img src={goodguy} alt="goodguy" width={150} height={150} className="mb-3 rounded roleimage"/>
                    <h4>The word is:</h4>
                    <h2>{data.word}</h2>
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
        console.log(revealed)
        setRevealed(!revealed)
    }

    return ( <div className="whitecontainer">
        <div className="m-4">
            <div className="row mb-3">
                <h1>In room: {roomCode} </h1> 
                <h2>You are {username}</h2>
            </div>
            <div className="row">
                <div className="col">
                    {!inGame ?
                        <h4 className="text-center">Waiting for host...</h4>
                    : 
                    <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                        <button onClick={toggleReveal} className="m-4">{`Click to ${revealed ? "hide" : "reveal"}`}</button>
                        <div id="reveal" style={{ display: revealed ? "flex" : "none"}} className="text-center flex-column justify-content-center align-items-center">
                            {HiddenElement}
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    </div> );
}

export default InRoom;

