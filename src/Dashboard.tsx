import { useEffect } from "react";
import { auth, db } from "./main";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.currentUser) {
            navigate('/login')
            return;
        }

        const q = query(collection(db, "sets"), where("id", "==", auth.currentUser.uid), limit(4))
        getDocs(q)
        .then(snapshot => {
            snapshot.docs.forEach(doc => {
                console.log(doc.data())
            })
        })
    }, [])

    return ( 
    <div className="container">
        <div className="row">
            <div className="col d-flex flex-column justify-content-center text-center align-items-center">
                <h1>Welcome {auth.currentUser?.uid}</h1>
            </div>
        </div>
    </div>  
    );
}

export default Dashboard;