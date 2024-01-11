import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SetCard from "./SetCard";
import { auth, db } from "./main";

interface SetInfo {
    name: string,
    id: string
}

function Dashboard() {

    const navigate = useNavigate();
    const [sets, setSets] = useState<SetInfo[]>([])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/login')
                return;
            }
            const q = query(collection(db, "sets"), where("id", "==", auth.currentUser.uid), limit(4))
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
        
    }, [])

    function handleLogout() {
        signOut(auth);
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
        <div className="row">
            <button onClick={handleLogout}>Logout</button>
        </div>
    </div>  
    );
}

export default Dashboard;