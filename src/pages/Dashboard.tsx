import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SetCard from "../SetCard";
import { auth, db } from "../main";

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

        fetch("http://localhost:9000/game")
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
            <div className="row align-items-center m-2">
                <div className="col-9">
                    <h1>Who's the Faker?</h1>
                </div>
                <div className="col-3 text-end">
                    <h3>{auth.currentUser?.displayName}</h3>
                    <h4 onClick={handleLogout} className="interactive_text">Logout</h4>    
                </div>
            </div>
            
            <div className="row m-3" id="setContainer">
                <h2>Your sets</h2>
                {sets.map((setInfo, index) => {
                    console.log(setInfo)
                    return <SetCard word={setInfo.name} key={index} setId={setInfo.id}/>
                    })
                }
                <button className="col-3 m-1 p-1" onClick={() => {
                    if (sets.length >= 5) {
                        alert("max of 5 sets. please delete one to make another")
                    } else {
                        navigate("/createset")
                    }
                }}>Create New Set</button>
            </div>
            
            <div className="row m-3">
                <div className="col" onClick={handleNewRoom}>
                    <button onClick={handleNewRoom} className="w-100 h-100">Make Room</button>
                </div>
            </div>
        </div>
    </div>  
    );
}

export default Dashboard;
export type { SetInfo };