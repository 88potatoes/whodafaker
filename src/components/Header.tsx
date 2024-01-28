import { signOut } from "firebase/auth";
import { auth } from "../main";
import Rules from "./Rules";
import SecondarySection from "./SecondarySection";

interface HeaderProps {
    username: string | null,
    hasLogout: boolean
}

function Header({ username, hasLogout = true }: HeaderProps) {
    const rulesDialog = document.getElementById("rulesdialog") as HTMLDialogElement;
    function handleLogout() {
        signOut(auth);
    }

    function openRules() {
        rulesDialog.showModal();
    }

    return (
        <SecondarySection>
            <div className="col-10">
                <h1>Who's the Faker?</h1>
                <h3>{username}</h3>
            </div>
            <div className="col-2 text-end">
                <div className="px-2 hoverablecard" onClick={openRules}><h5>Rules</h5></div>
                <dialog id="rulesdialog" className="position-relative">
                    <div className="position-fixed hoverablecard" onClick={() => {
                        rulesDialog.close();
                    }}><h5>Close rules</h5></div>
                    <Rules />
                </dialog>
                {hasLogout &&
                    <h4 onClick={handleLogout} className="interactive_text">Logout</h4>
                }
            </div>
        </SecondarySection>
    );
}

export default Header;