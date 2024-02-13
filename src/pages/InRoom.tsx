import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import goodguy from "../assets/images/goodguy.png";
import faker from "../assets/images/faker.png";
import { WS_URL } from "../../setup.json";
import { usePopup } from "../components/PassiveLayout";

/**
 * InRoom component - route="/joined/:roomCode" \
 * Player has entered room
 * @returns
 */
function InRoom() {
  const params = useParams();
  const [inGame, setInGame] = useState(false); // whether or not player(s) is currently in game
  const [revealed, setRevealed] = useState(false); // whether or not element is currently being shown
  const navigate = useNavigate();
  const [HiddenElement, setHiddenElement] = useState(<></>); // element that is shown to reveal role
  const location = useLocation();

  console.log("location", location);
  const username = location.state;
  const roomCode = params.roomCode;
  const { setPopup } = usePopup();

  useEffect(() => {
    // no user => leave and rejoin
    if (username == null) {
      setPopup("Error: no username");
      navigate("/join");
    }

    console.log("hook running!");
    const socket = io(WS_URL);

    socket.on("connect", () => {
      console.log("Connected to the server!");

      // join_room message is sent once websocket server has connected
      socket.emit("join_room", { roomCode: roomCode, username: username });
    });

    // goes back to join page if can't join room
    socket.on("join_status", (data) => {
      if (data.status === "fail") {
        setPopup(`Failed to join room ${roomCode}`);
        navigate("/join");
      }
    });

    // goes back to join page if room closes
    socket.on("room_close", () => {
      setPopup("Room has been closed");
      navigate("/join");
    });

    // goes
    socket.on("start_game", (data) => {
      // data: {role: faker || good, word: string}
      setInGame(true);
      if (data.role == "faker") {
        // set the role to faker
        setHiddenElement(
          <>
            <img
              src={faker}
              alt="faker"
              width={150}
              height={150}
              className="mb-3 rounded roleimage"
            />
            <h3>You are the Faker</h3>
          </>
        );
      } else {
        // set the role to villager
        setHiddenElement(
          <>
            <img
              src={goodguy}
              alt="goodguy"
              width={150}
              height={150}
              className="mb-3 rounded roleimage"
            />
            <h4>The word is:</h4>
            <h2>{data.word}</h2>
          </>
        );
      }
    });

    // resets to 'waiting in lobby' screen once game has ended
    socket.on("end_game", () => {
      setInGame(false);
      setHiddenElement(<></>);
      setRevealed(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // toggles 'revealed'
  function toggleReveal() {
    console.log(revealed);
    setRevealed(!revealed);
  }

  return (
    <div className="whitecontainer">
      <div className="m-4">
        <div className="row mb-3">
          <h1>In room: {roomCode} </h1>
          <h2>You are {username}</h2>
        </div>
        <div className="row">
          <div className="col">
            {/* Waiting text or role depending on whether or not player is in game */}
            {!inGame ? (
              <h4 className="text-center">Waiting for host...</h4>
            ) : (
              <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                <button onClick={toggleReveal} className="m-4">{`Click to ${
                  revealed ? "hide" : "reveal"
                }`}</button>
                <div
                  id="reveal"
                  style={{ display: revealed ? "flex" : "none" }}
                  className="text-center flex-column justify-content-center align-items-center"
                >
                  {HiddenElement}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InRoom;
