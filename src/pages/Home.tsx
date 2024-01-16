import { Link } from "react-router-dom";
import goodguy from "../assets/images/goodguy.png";
import faker from "../assets/images/faker.png";
import RoleInfo from "../components/RoleInfo";

function Home() {
    return (
        <div className="w-100 h-100 d-flex flex-column justify-content-center">
            <div className="m-4">
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
            </div>

            <div className="m-3">
                <div className="container">
                    <div className="row align-items-center justify-content-center flex-column">

                        <div className="col col-lg-8">
                            <div className="whitecontainer">
                                <div className="p-4">
                                    <h2><strong>Who's the Faker? Rules</strong></h2>
                                    <div>
                                        <h3>Introduction</h3>
                                        <p>Who’s the Faker is an in-person / online mafia-style game. At the start of each game, each player is given a role and some instructions. To win, the player must execute their objective.
                                        </p>
                                    </div>
                                    <div>
                                        <h3>Equipment / Setup</h3>
                                        <p>The game is ideally played in person with each player having their own device (phone / tablet is recommended) which they keep to themselves + a shared device which everyone can see (laptop / TV connected device recommended).
                                        </p>
                                    </div>
                                    <h3>Roles</h3>
                                    <div>
                                        <RoleInfo
                                            title="Villager"
                                            img={goodguy}
                                            goal="Find a Faker"
                                            info="Is given the Game Word at the start of the game."
                                            genstrat="Say words which hint that you are a villager but are not so obvious that they reveal the word."
                                        />
                                        <RoleInfo
                                            title="Faker"
                                            img={faker}
                                            goal={<>Stay hidden from villagers <strong>OR</strong> find out the word.</>}
                                            info="Does not know the Game Word."
                                            genstrat="Say words which hint that you are a villager. Listen and deduce the word."
                                        />
                                    </div>
                                    <div>
                                        <h3>Gameplay</h3>
                                        <div>The game can be split into 2 phases:</div>
                                        <ol>
                                            <li>Word phase</li>
                                            <li>Voting phase</li>
                                        </ol>
                                        <div>
                                            <div>Word phase: Go around the circle once, each player saying one word.</div>
                                            <div>
                                                Voting phase: Participants vote one person out
                                                <ul>
                                                    <li>If a villager is voted out, fakers win.</li>
                                                    <li>If a faker is voted out, the faker(s) must guess the Game Word.
                                                        <ul>
                                                            <li>If they guess correctly, fakers win.</li>
                                                            <li>If they guess incorrectly, villagers win.</li>

                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                    <div>
                                        <h3>Start playing</h3>
                                        <div>
                                            <div>Step-by-step instructions to playing a game:</div>
                                            <ol>
                                                <li>
                                                    Create a set of words which you would like to use for the game / use a pre-made set of words.

                                                </li>
                                                <li>
                                                    The host device creates a lobby. All players then join the lobby.

                                                </li>
                                                <li>
                                                    Start the game. Each player will receive their role.

                                                </li>
                                                <li>
                                                    Word Phase: Go around in a circle once, each player saying a word (the word depends on their role and their objective)

                                                </li>
                                                <li>
                                                    Voting Phase: All players vote someone out. Work out who won according to each other's roles.

                                                </li>
                                                <li>
                                                    Click end game and then start another game.

                                                </li>
                                            </ol>                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;