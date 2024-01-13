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
    <div className="container">
        <div className="row">
            <div className="col d-flex flex-column justify-content-center text-center align-items-center">
                <h1>Welcome {auth.currentUser?.displayName}</h1>
            </div>
        </div>
        <div className="row" id="setContainer">
            {sets.map((setInfo, index) => {
                console.log(setInfo)
                return <SetCard word={setInfo.name} key={index} setId={setInfo.id}/>
                })
            }
        </div>
        <div className="row">
            <Link to="/createset">
                <button>Create New Set</button>
            </Link>
        </div>
        <div className="row m-2">
            <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="row m-2">

            <button onClick={handleNewRoom}>Make Room</button>
        </div>
    </div>  
    );
}

export default Dashboard;
export type { SetInfo };