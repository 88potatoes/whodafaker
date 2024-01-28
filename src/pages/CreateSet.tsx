import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import SetEditor from "../components/SetEditor";
import useRequireAuth from "../components/useRequireAuth";
import { auth } from "../main";
import ScreenWindow from "../components/ScreenWindow";
import SecondarySection from "../components/SecondarySection";
import FramerButton from "../components/FramerButton";


/**
 * CreateSet component - route="/createset/:setId?"
 * @returns 
 */
function CreateSet() {
    const { setId: paramSetId } = useParams();
    const navigate = useNavigate();
    // page requires authorisation
    useRequireAuth(true);

    return (
        <ScreenWindow>
            <Header username={auth.currentUser?.displayName || null} hasLogout={false} />
            <SecondarySection>
                <div>
                    <FramerButton link="/dashboard" text="⇦ Dashboard" />

                </div>
            </SecondarySection>
            <SetEditor setId={paramSetId || ""} onDelete={() => {
                navigate("/dashboard")
            }} onSave={() => { }} />
        </ScreenWindow>
    );
}

export default CreateSet;