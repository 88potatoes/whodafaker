import { DocumentData, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import { WS_URL } from "../../setup.json";
import CardGrid from "../components/CardGrid";
import Header from "../components/Header";
import SetEditor from "../components/SetEditor";
import useRequireAuth from "../components/useRequireAuth";
import { auth, db } from "../main";
import ScreenWindow from "../components/ScreenWindow";
import { usePopup } from "../components/PassiveLayout";

/**
 * Room component - route="/room/:roomCode"
 * @returns 
 */
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
    const [setEdit, setSetEdit] = useState(document.getElementById("setEdit") as HTMLDialogElement);
    const { setPopup } = usePopup();

    const roomCode = params.roomCode;
    // const setEdit = document.getElementById("setEdit") as HTMLDialogElement;

    useRequireAuth(true, false, () => {
        fetchSets();

        const newsocket = io(WS_URL)
        newsocket.on('connect', () => {
            console.log("connected to server!")
            newsocket.emit("join_room_host", { roomCode: roomCode })

        })

        newsocket.on("join_status", (data) => {
            if (data.status === "fail") {
                setPopup(`Failed to join room ${roomCode}`)
                navigate("/dashboard")
            }
        })

        newsocket.on("players_update", (data) => {
            // TODO can make more efficient by just sending the delta
            setPlayers(data.players)
        })

        setSocket(newsocket);

        return () => {
            newsocket.emit("close_room", { roomCode: roomCode })
            newsocket.disconnect();
            setSocket(null);
        }
    })

    function fetchSets() {
        console.log("sets fetched")
        const setQuery = query(collection(db, "sets"), where("id", "==", auth.currentUser?.uid))
        getDocs(setQuery)
            .then(snapshot => {
                snapshot.docs.map(doc => { console.log(doc.data()) })
                const localSets = snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));
                console.log(localSets)
                setSets(localSets);

            })
    }

    useEffect(() => {
        if (gameSet) {
            console.log(gameSet)
            const currentset = sets.filter(set => set.docId == gameSet.docId);
            console.log("currentset", currentset);
            if (currentset.length <= 0) {
                // set was deleted
                setGameSet({})
            } else {
                // set was edited
                setWords(currentset[0].words)
            }
        }
    }, [sets])

    useEffect(() => {
        setSetEdit(document.getElementById("setEdit") as HTMLDialogElement)
    }, [inGame])

    useEffect(() => {
        console.log("editing", editSetId)
        if (setEdit) {
            setEdit.showModal();
        }
    }, [editSetId])

    function handleStartGame() {
        if (players.length < 3) {
            setPopup("need at least 3 players")
            return;
        }

        console.log(words);
        const index = Math.floor(Math.random() * words.length);
        console.log(index)
        const wordSent = words[Math.floor(Math.random() * words.length)];
        console.log(wordSent);
        socket?.emit("start_game", { word: wordSent, nfakers: numFakers, roomCode: roomCode })
        setInGame(true);
    }

    function handleCloseRoom() {
        navigate("/dashboard")
    }

    function handleEdit(setid: string) {
        console.log(setid)
        setEditSetId(setid)

        if (setEdit) {
            setEdit.showModal();
        } else {
            console.log("no setEdit")
        }
    }

    function dialogClose() {
        setEdit.close();
    }

    return (
        !inGame ?
            <div className="container whitecontainer">
                <div className="m-4">
                    <Header username={auth.currentUser?.displayName || null} hasLogout={false} />
                    <div className="mb-3 mx-4">
                        <h2>Room: <strong>{roomCode}</strong></h2>
                        <button className="col-3" onClick={handleCloseRoom}>Close Room</button>
                    </div>
                    <div className="container secondarysection mb-3">
                        <div className="row p-4">
                            <div className="col-3 d-flex flex-column justify-content-center align-items-center">
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <button onClick={() => {
                                        if (numFakers >= players.length) {
                                            setPopup("Error: more fakers than players");
                                            return;
                                        }
                                        setNumFakers(numFakers + 1)
                                    }}>+</button>
                                    <h2>Fakers: <strong>{numFakers}</strong></h2>
                                    <button onClick={() => {
                                        if (numFakers <= 1) {
                                            setPopup("Error: there must be at least 1 faker")
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
                                        return <div className="col-4" key={index}><div className="m-2 bg-primary text-center rounded p-2"><h4 className="mb-1 text-white">{number}</h4></div></div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <h2>Choose a set</h2>
                        <div className="row" id="setContainer">

                            {/* set buttons */}
                            {sets.map((setInfo, index) => {
                                return (
                                    <div key={index} className=" col-4">
                                        <div className="d-flex flex-column justify-content-around align-items-center bg-secondary my-2 p-4 rounded hoverablecard" onClick={() => {
                                            setGameSet(setInfo)
                                            setWords(setInfo.words)
                                        }}>
                                            <div><h4>{setInfo.name}</h4></div>
                                            <div className="hoverablecard" onClick={() => { handleEdit(setInfo.docId) }}>Edit</div>
                                        </div>

                                    </div>)
                            })
                            }
                            <h3>Chosen set: <strong>{gameSet.name}</strong></h3>

                            <dialog id="setEdit">
                                <SetEditor setId={editSetId}
                                    onDelete={() => {
                                        dialogClose();
                                        fetchSets();
                                    }}
                                    onSave={() => {
                                        fetchSets()
                                    }} />
                                {/* <CreateSet setId={editSetId} fromRoom={true}/> */}
                                <button onClick={dialogClose}>Close edit</button>
                            </dialog>

                            {Object.keys(gameSet).length > 0 &&
                                <button onClick={handleStartGame}><h2>Start Game</h2></button>
                            }

                        </div>
                    </div>
                </div>
            </div> :
            <ScreenWindow>

                <div className="row">
                    <h2 className="px-4">Words</h2>
                    <CardGrid items={words} deletable={false} delete={() => { }} />
                    <button className="px-4" onClick={() => {
                        socket?.emit("end_game", { roomCode: roomCode })
                        setInGame(false)
                    }}>End Game</button>
                </div>
            </ScreenWindow>
    );
}

export default Room;