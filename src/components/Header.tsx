import { signOut } from "firebase/auth";
import { auth } from "../main";

// interface HeaderProps {
//     username: string | null,
//     hasLogout: boolean
// }

function Header({ username, hasLogout = true}) {
    function handleLogout() {
        signOut(auth);
    }

    return ( <div className="row align-items-center m-2">
    <div className="col-9">
        <h1>Who's the Faker?</h1>
    </div>
    <div className="col-3 text-end">
        <h3>{username}</h3>
        { hasLogout && 
            <h4 onClick={handleLogout} className="interactive_text">Logout</h4>  
        }  
    </div>
</div> );
}

export default Header;