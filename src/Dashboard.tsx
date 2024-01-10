import { auth } from "./main";

function Dashboard() {
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