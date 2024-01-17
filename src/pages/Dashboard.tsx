import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SetCard from "../SetCard";
import { auth, db } from "../main";
import Header from "../components/Header";
import { GAME_API_URL } from "../../setup.json";

interface SetInfo {
    name: string,
    id: string
}

function Dashboard() {

    const navigate = useNavigate();
    const [sets, setSets] = useState<SetInfo[]>([])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/login')
                return;
            }
            const q = query(collection(db, "sets"), where("id", "==", auth.currentUser.uid))
            getDocs(q)
            .then(snapshot => {
                const localSets: SetInfo[] = []
                snapshot.docs.forEach(doc => {
    
                    localSets.push({name: doc.data().name, id: doc.id})
                })
                console.log(localSets)
                setSets(localSets);
            })
            .catch(error => {
                console.log(error)
            })
        })
        
        return () => unsubscribe();
    }, [])

    function handleLogout() {
        signOut(auth);
    }

    function handleNewRoom() {

        fetch(GAME_API_URL)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const { roomCode } = data;

            navigate(`/room/${roomCode}`)
        })
        .catch(error => {
            console.log(error);
        })
    }

    return ( 
    <div className="container whitecontainer">
        <div className="m-4">
            <Header username={auth.currentUser?.displayName}/>
        
            <div className="row m-3" id="setContainer">
                <div>
                    <h2>Your sets</h2>
                </div>
                <div className="row">
                    {sets.map((setInfo, index) => {
                        console.log(setInfo)
                        return <SetCard word={setInfo.name} key={index} setId={setInfo.id}/>
                        })
                    }
                    <div className="col-3 d-flex flex-column justify-content-center align-items-center">
                        <div onClick={() => {
                            if (sets.length >= 5) {
                                alert("max of 5 sets. please delete one to make another")
                            } else {
                                navigate("/createset")
                            }
                        }} className="col-11 bg-black rounded hoverablecard text-center my-2 py-5">
                            <h2 className="text-white">Create New Set</h2>
                        </div>
                    </div>    
                </div>
            </div>
            
            <div className="row m-3">
                <div className="col">
                    <button onClick={handleNewRoom} className="w-100 h-100">Make Room ⮕</button>
                </div>
            </div>
        </div>
    </div>  
    );
}

export default Dashboard;
export type { SetInfo };