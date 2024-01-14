import { Link } from "react-router-dom";
import goodguy from "../assets/images/goodguy.png";
import faker from "../assets/images/faker.png";

function Home() {
    return ( 
    <div className="w-100 h-100 d-flex flex-column justify-content-center">
        <div className="container text-center d-flex flex-column justify-content-center align-items-center">
            <div className="whitecontainer">
                <div className="m-4">
                    <h1 className="">Who's the Faker?</h1>
                    <div className="m-2">
                        <Link to="/login">
                            <button>Sign in</button>
                        </Link>
                    </div>
                    <div className="m-2">
                        <Link to="/signup">
                            <button>Sign up</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div> 

        <div className="container">
            <div className="whitecontainer">
                <div className="m-4">
                    <h2><strong>Who's the Faker?</strong></h2>
                    <h2>Rules</h2>
                    <div>
                        <h3>Introduction</h3>
                        <p>Aim of the game is to win. Each player has a given role and must try to execute the goal in accordance with the goal.
                            This game is meant to be played in person or over video call so that you can talk to each other.
                        First join the room, pick a set of words and adjust the settings. When the game starts, you will be given a role. You must try attempt to achieve your role's objective to win.
                        </p>
                    </div>
                    <div>
                        <h3>Roles</h3>
                        <div>
                            <h4>Villager</h4>
                            <img src={goodguy} alt="villager" width={150} height={150} className="mb-3 rounded roleimage"/>
                            <p><strong>Goal:</strong> Find a Faker</p>
                            <p><strong>Info:</strong> At the start of the game you will be given a word</p>
                            <p><strong>General Strategy: </strong>Say words which hint that you are a villager but are not so obvious that they reveal the word.</p>
                        </div>
                    </div>
                    <div>
                        <h3>Roles</h3>
                        <div>
                            <h4>Faker</h4>
                            <img src={faker} alt="faker" width={150} height={150} className="mb-3 rounded roleimage"/>
                            <p><strong>Goal:</strong> Stay hidden from villagers <strong>OR</strong> find out the word.</p>
                            <p><strong>Info:</strong> At the start of the game, you will be given the faker role</p>
                            <p><strong>General Strategy: </strong>Say words which hint that you are a villager / listen and deduce the word.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Home;