import { DocumentData, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { auth, db } from "../main";
import { onAuthStateChanged } from "firebase/auth";
import { SetInfo } from "./Dashboard";
import SetCard from "../SetCard";
import CardGrid from "../CardGrid";

interface RoomProps {
    sets: SetInfo[]
}
function Room() {
    const params = useParams();

    const navigate = useNavigate();
    const [players, setPlayers] = useState<number[]>([])
    const [sets, setSets] = useState<DocumentData[]>([])
    const [gameSet, setGameSet] = useState<DocumentData>({})
    const [inGame, setInGame] = useState(false);
    const [words, setWords] = useState<string[]>([]);
    const [numFakers, setNumFakers] = useState(1);
    const roomCode = params.roomCode;
    console.log(roomCode);

    useEffect(() => {
        const socket = io("ws://localhost:9091")
        socket.on('connect', () => {
            console.log("connected to server!")
            socket.emit("join_room_host", {roomCode: roomCode})

        })

        socket.on("join_status", (data) => {
            if (data.status === "fail") {
                alert(`failed to join room ${roomCode}`)
                navigate("/dashboard")
            }
        })

        socket.on("players_update", (data) => {
            // TODO can make more efficient by just sending the delta
            setPlayers(data.players)
        })

        const unsubscribe = onAuthStateChanged(auth, user => {
            if (!user) return;

            const setQuery = query(collection(db, "sets"), where("id", "==", user.uid))
            getDocs(setQuery)
            .then(snapshot => {
                const localSets = snapshot.docs.map(doc => ({...doc.data(), docId: doc.id}));
                console.log(localSets)
                setSets(localSets);
            })
        })

        return () => {
            socket.emit("close_room", {roomCode: roomCode})
            socket.disconnect();
            unsubscribe();
        }
    }, []);

    function handleStartGame() {
        if (players.length < 3) {
            alert("need at least 3 players")
            return;
        }
        setWords(gameSet.words)
        setInGame(true);
    }

    function handleCloseRoom() {
        navigate("/dashboard")
    }

    return (
        !inGame ?
    <div>
        <div className="row">
            <h1>Logged in as {auth.currentUser?.displayName}</h1>
            <h1>Room {roomCode}</h1>
            <button className="col-3" onClick={handleCloseRoom}>Close Room</button>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <h2>Players</h2>
                    {players.map((number, index) => {
                        return <div className="row" key={index}><h4>{number}</h4></div>
                    })}
                </div>
                <div className="col-6">
                    <button onClick={() => {
                        if (numFakers >= players.length) {
                            alert("error: more fakers than players");
                            return;
                        }
                        setNumFakers(numFakers + 1)
                    }}>^</button>
                    <h2>Fakers: {numFakers}</h2>
                    <button onClick={() => {
                        if (numFakers <= 1) {
                            alert("error: there must be at least 1 faker")
                            return;
                        }
                        setNumFakers(numFakers - 1)
                    }}>v</button>
                </div>
            </div>
        </div>
        <div>
            <h2>Set</h2>
            <h3>Chosen set: {gameSet.name}</h3>
            <div className="row" id="setContainer">
            {sets.map((setInfo, index) => {
                console.log(setInfo)
                // return <SetCard word={setInfo.name} key={index} setId={setInfo.id}/>
                return <button className="m-1" key={index} onClick={() => {
                    setGameSet(setInfo)
                }}><h4>{setInfo.name}</h4></button>
                })
            }

            { Object.keys(gameSet).length > 0 &&
                <button onClick={handleStartGame}><h2>Start Game</h2></button>
            }

        </div>
        </div>

    </div> :
    <div>
        <CardGrid items={words}/>
        <button onClick={() => {setInGame(false)}}>End Game</button>
    </div>
    );
}

export default Room;