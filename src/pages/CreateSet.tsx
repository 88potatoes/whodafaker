import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import SetEditor from "../components/SetEditor";
import { auth } from "../main";


function CreateSet() {
    // console.log("setId:", setId)
    const { setId: paramSetId } = useParams();
    // console.log("paramSetId:", paramSetId)
    // const finalSetId = setId || paramSetId;
    // console.log(paramSetId ? paramSetId : setId)
    // const [finalSetId, setFinalSetId] = useState( paramSetId ? paramSetId : setId)
    const navigate = useNavigate();


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/login")
            }
        })

        return () => {
            unsubscribe();
        }
    }, [navigate])

    return ( 
    <div className="container whitecontainer">
        <div className="m-4">
            <Header username={auth.currentUser?.displayName || null} hasLogout={false}/>
            <div className="row px-4">
                <div className="hoverablecard" onClick={() => {
                    navigate("/dashboard")
                }}><h5>⇦ Dashboard</h5></div>
            </div>
            <SetEditor setId={paramSetId || ""} onDelete={() => {
                navigate("/dashboard")
            }} onSave={() => {}}/>
        </div>
    </div> );
}

export default CreateSet;