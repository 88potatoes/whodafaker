import { signOut } from "firebase/auth";
import { auth } from "../main";
import Rules from "./Rules";

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
        <div className="row align-items-center m-2">
            <div className="col-9">
                <h1>Who's the Faker?</h1>
                <div className="px-2 hoverablecard" onClick={openRules}><h5>Rules</h5></div>
                <dialog id="rulesdialog" className="position-relative">
                    <div className="position-fixed hoverablecard" onClick={() => {
                        rulesDialog.close();
                    }}><h5>Close rules</h5></div>
                    <Rules/>
                </dialog>
            </div>
            <div className="col-3 text-end">
                <h3>{username}</h3>
                {hasLogout &&
                    <h4 onClick={handleLogout} className="interactive_text">Logout</h4>
                }
            </div>
        </div>
    );
}

export default Header;