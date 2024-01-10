import { useEffect, useState } from "react";
import { auth, db } from "./main";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import SetCard from "./SetCard";

function Dashboard() {

    const navigate = useNavigate();
    const [sets, setSets] = useState<string[]>([])

    useEffect(() => {
        if (!auth.currentUser) {
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
    }, [])

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
    </div>  
    );
}

export default Dashboard;