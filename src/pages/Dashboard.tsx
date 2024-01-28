import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GAME_API_URL } from "../../setup.json";
import FramerButton from "../components/FramerButton";
import Header from "../components/Header";
import ScreenWindow from "../components/ScreenWindow";
import SecondarySection from "../components/SecondarySection";
import SetCard from "../components/SetCard";
import useRequireAuth from "../components/useRequireAuth";
import { auth, db } from "../main";
import { usePopup } from "../components/PassiveLayout";

interface SetInfo {
    name: string,
    id: string
}

/**
 * Dashboard component - route="/dashboard"
 * @returns 
 */
function Dashboard() {

    const navigate = useNavigate();
    const [sets, setSets] = useState<SetInfo[]>([])
    const { setPopup } = usePopup();

    // requires authentication
    useRequireAuth(true, false, () => {
        const q = query(collection(db, "sets"), where("id", "==", auth.currentUser!.uid))
        console.log("auth success")
        getDocs(q)
            .then(snapshot => {
                const localSets: SetInfo[] = []
                snapshot.docs.forEach(doc => {

                    localSets.push({ name: doc.data().name, id: doc.id })
                })
                console.log(localSets)
                setSets(localSets);
            })
            .catch(error => {
                console.log(error)
            })
    });

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
        <ScreenWindow>
            <Header username={auth.currentUser?.displayName || null} hasLogout={true} />


            <div className="row">
                <SecondarySection className="col-8">
                    <div>
                        <h2>Your sets</h2>
                    </div>
                    <div className="row">
                        {sets.map((setInfo, index) => {
                            console.log(setInfo)
                            return <SetCard text={setInfo.name} key={index} setId={setInfo.id} />
                        })
                        }
                        {sets.length < 6 &&
                            <SetCard text="+" onClick={() => {
                                if (sets.length >= 6) {
                                    setPopup("max of 6 sets. please delete one to make another")
                                } else {
                                    navigate("/createset")
                                }
                            }} />
                        }
                    </div>
                </SecondarySection>

                <SecondarySection className="col-4">
                    <div>
                        <FramerButton text={"Create Room"} onClick={handleNewRoom} />
                    </div>
                </SecondarySection>
            </div>
        </ScreenWindow>
    );
}

export default Dashboard;
export type { SetInfo };
