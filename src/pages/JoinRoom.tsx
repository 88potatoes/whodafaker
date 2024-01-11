import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

function JoinRoom() {
    const navigate = useNavigate();
    function JoinRoom(e: FormEvent) {
        e.preventDefault();
        const roomCodeElement = document.getElementById('roomcode') as HTMLInputElement;
        const roomCode = roomCodeElement.value.toUpperCase();

        console.log(roomCode)

        fetch(`http://localhost:9000/join/${roomCode}`)
        .then(res => res.json())
        .then(body => {
            const { status } = body;
            if (status == "good") {
                navigate(`/joined/${roomCode}`)
            } else if (status == "noRoomCode") {
                alert("No room with that code exists")
            }
        })

    }

    return ( <div className="container">
        <div className="row">
            <div className="col">
                <h1>Join Room</h1>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <form onSubmit={JoinRoom}>
                    <label htmlFor="roomcode">Room code</label>
                    <input type="text" id="roomcode"/>
                    <input type="submit" value="Join Room" />
                </form>
            </div>
        </div>
    </div> );
}

export default JoinRoom;