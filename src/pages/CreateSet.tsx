import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import SetEditor from "../components/SetEditor";
import { auth } from "../main";
import useRequireAuth from "../components/useRequireAuth";


/**
 * CreateSet component - route="/createset/:setId?"
 * @returns 
 */
function CreateSet() {
    const { setId: paramSetId } = useParams();

    // page requires authorisation
    useRequireAuth(true);

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