import { DocumentData, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { auth, db } from "../main";
import { onAuthStateChanged } from "firebase/auth";
import { SetInfo } from "./Dashboard";
import SetCard from "../SetCard";
import CardGrid from "../CardGrid";
import CreateSet from "./CreateSet";

interface RoomProps {
    sets: SetInfo[]
}
function Room() {
    const params = useParams();

    const navigate = useNavigate();
    const [players, setPlayers] = useState<number[]>([])
    const [sets, setSets] = useState<DocumentData[]>([])
    const [gameSet, setGameSet] = useState<DocumentData>({})
    const [editSetId, setEditSetId] = useState("");
    const [inGame, setInGame] = useState(false);
    const [words, setWords] = useState<string[]>([]);
    const [numFakers, setNumFakers] = useState(1);
    const [socket, setSocket] = useState<Socket | null>(null);

    const roomCode = params.roomCode;
    const setEdit = document.getElementById("setEdit") as HTMLDialogElement;

    useEffect(() => {
        const newsocket = io("ws://localhost:9091")
        newsocket.on('connect', () => {
            console.log("connected to server!")
            newsocket.emit("join_room_host", {roomCode: roomCode})
            
        })
        
        newsocket.on("join_status", (data) => {
            if (data.status === "fail") {
                alert(`failed to join room ${roomCode}`)
                navigate("/dashboard")
            }
        })
        
        newsocket.on("players_update", (data) => {
            // TODO can make more efficient by just sending the delta
            setPlayers(data.players)
        })

        setSocket(newsocket);
        
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
            newsocket.emit("close_room", {roomCode: roomCode})
            newsocket.disconnect();
            unsubscribe();
            setSocket(null);
        }
    }, []);

    useEffect(() => {
        console.log("editing", editSetId)
        if (setEdit) {
            setEdit.showModal();
        }
    }, [editSetId])

    function handleStartGame() {
        if (players.length < 3) {
            alert("need at least 3 players")
            return;
        }

        console.log(words);
        const index = Math.floor(Math.random() * words.length);
        console.log(index)
        const wordSent = words[Math.floor(Math.random() * words.length)];
        console.log(wordSent);
        socket?.emit("start_game", {word: wordSent, nfakers: numFakers, roomCode: roomCode})
        setInGame(true);
    }

    function handleCloseRoom() {
        navigate("/dashboard")
    }

    function handleEdit(setid: string) {
        if (editSetId != setid) {
            setEditSetId(setid)
        }
        setEdit.showModal();
    }

    return (
        !inGame ?
    <div className="container whitecontainer">
        <div className="m-4">
            <div className="mb-3">
                <h1>Room: {roomCode}</h1>
                <h3>Logged in as {auth.currentUser?.displayName}</h3>
                <button className="col-3" onClick={handleCloseRoom}>Close Room</button>
            </div>
            <div className="container secondarysection mb-3">
                <div className="row p-4">
                    <div className="col-3 d-flex flex-column justify-content-center align-items-center">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <button onClick={() => {
                                if (numFakers >= players.length) {
                                    alert("error: more fakers than players");
                                    return;
                                }
                                setNumFakers(numFakers + 1)
                            }}>+</button>
                            <h2>Fakers: <strong>{numFakers}</strong></h2>
                            <button onClick={() => {
                                if (numFakers <= 1) {
                                    alert("error: there must be at least 1 faker")
                                    return;
                                }
                                setNumFakers(numFakers - 1)
                            }}>-</button>
                        </div>
                    </div>
                    <div className="col-9">
                        <h2>Players</h2>
                        <div className="row">
                            {players.map((number, index) => {
                                return <div className="col-4" key={index}><div className="m-2 bg-primary text-center rounded p-2"><h4 className="mb-1">{number}</h4></div></div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h2>Choose a set</h2>
                <div className="row" id="setContainer">
                    
                {/* edit buttons */}
                {sets.map((setInfo, index) => {
                    return ( 
                        <div key={index} className="bg-secondary col-4 m-2">
                            <div className="p-2 d-flex flex-column justify-content-around align-items-center">
                                <div className="m-1 hoverablecard" onClick={() => {
                                    setGameSet(setInfo)
                                    setWords(setInfo.words)
                                }}><h4>{setInfo.name}</h4></div>
                                <div className="hoverablecard" onClick={() => {handleEdit(setInfo.docId)}}>edit</div>
                            </div>

                        </div>)
                    })
                }
                <h3>Chosen set: <strong>{gameSet.name}</strong></h3>
                
                <dialog id="setEdit">
                    <CreateSet setId={editSetId} fromRoom={true}/>
                    <button onClick={() => {
                        setEdit.close();
                        // setEditSetId("")
                    }}>Close edit</button>
                </dialog>

                { Object.keys(gameSet).length > 0 &&
                    <button onClick={handleStartGame}><h2>Start Game</h2></button>
                }

                </div>
            </div>
        </div>
    </div> :
    <div>
        <CardGrid items={words} deletable={false} delete={() => {}}/>
        <button onClick={() => {
            socket?.emit("end_game", {roomCode: roomCode})
            setInGame(false)
        }}>End Game</button>
    </div>
    );
}

export default Room;