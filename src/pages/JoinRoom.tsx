import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

function JoinRoom() {
    const navigate = useNavigate();
    function JoinRoom(e: FormEvent) {
        e.preventDefault();
        const roomCodeElement = document.getElementById('roomcode') as HTMLInputElement;
        const roomCode = roomCodeElement.value.toUpperCase();
        const usernameElement = document.getElementById('username') as HTMLInputElement;
        const username = usernameElement.value;

        console.log(roomCode)

        const queryString = new URLSearchParams({ username: username }).toString();
        console.log(queryString);

        fetch(`http://localhost:9000/join/${roomCode}?${queryString}`)
            .then(res => res.json())
            .then(body => {
                const { status } = body;
                if (status == "good") {
                    navigate(`/joined/${roomCode}`, { state: username })
                } else if (status == "noRoomCode") {
                    alert("No room with that code exists")
                }
            })

    }

    return (<div className="whitecontainer">
        <div className="m-4">
            <div className="row">
                <div className="col">
                    <h1>Join Room</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <form onSubmit={JoinRoom}>
                        <div>
                            <label htmlFor="username">Display name</label>
                            <input type="text" id="username" required />
                        </div>
                        <div>
                            <label htmlFor="roomcode">Room code</label>
                            <input type="text" id="roomcode" required />
                        </div>
                        <input type="submit" value="Join Room" />
                    </form>
                </div>
            </div>
        </div>
    </div>);
}

export default JoinRoom;