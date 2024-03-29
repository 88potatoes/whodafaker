import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { JOIN_API_URL } from "../../setup.json";
import { usePopup } from "../components/PassiveLayout";

/**
 * JoinRoom component - route="/join" \
 * Page to put in room code to join room
 * @returns
 */
function JoinRoom() {
  const navigate = useNavigate();

  // attempt to join a particular room
  function joinRoom(e: FormEvent) {
    e.preventDefault();
    const roomCodeElement = document.getElementById(
      "roomcode"
    ) as HTMLInputElement;
    const roomCode = roomCodeElement.value.trim().toUpperCase();
    const usernameElement = document.getElementById(
      "username"
    ) as HTMLInputElement;
    const username = usernameElement.value.trim();

    const { setPopup } = usePopup();

    console.log(roomCode);

    const queryString = new URLSearchParams({ username: username }).toString();
    console.log(queryString);

    // make request to see if roomcode is valid
    fetch(`${JOIN_API_URL}/${roomCode}?${queryString}`)
      .then((res) => res.json())
      .then((body) => {
        console.log("join message", body);
        const { status } = body;

        if (status == "good") {
          // request is valid so join room
          navigate(`/joined/${roomCode}`, { state: username });
        } else if (status == "noRoomCode") {
          // request is not valid so alert with popup
          setPopup("No room with that code exists");
        }
      });
  }

  return (
    <div className="whitecontainer">
      <div className="m-4">
        <div className="row">
          <div className="col">
            <h1>Join Room</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <form onSubmit={joinRoom}>
              <div>
                <label htmlFor="username">Display name</label>
                <input type="text" id="username" required className="mx-2" />
              </div>
              <div>
                <label htmlFor="roomcode">Room code</label>
                <input type="text" id="roomcode" required className="mx-2" />
              </div>
              <input type="submit" value="Join Room" />
            </form>
          </div>
        </div>
        <div className="m-2">
          <div
            id="HomeButton"
            className="hoverablecard"
            onClick={() => {
              navigate("/");
            }}
          >
            <strong>Home</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinRoom;
