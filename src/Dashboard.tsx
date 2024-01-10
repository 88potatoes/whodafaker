import { useEffect, useState } from "react";
import { auth, db } from "./main";
import { Query, collection, getDocs, limit, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import SetCard from "./SetCard";
import { onAuthStateChanged, signOut } from "firebase/auth";

function Dashboard() {

    const navigate = useNavigate();
    const [sets, setSets] = useState<string[]>([])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/login')
                return;
            }
            const q = query(collection(db, "sets"), where("id", "==", auth.currentUser.uid), limit(4))
            getDocs(q)
            .then(snapshot => {
                const localSets: string[] = []
                snapshot.docs.forEach(doc => {
    
                    localSets.push(doc.data().name)
                })
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
            {sets.map((name, index) => <SetCard word={name} key={index}/>)}
        </div>
        <div className="row">
            <button onClick={handleLogout}>Logout</button>
        </div>
    </div>  
    );
}

export default Dashboard;