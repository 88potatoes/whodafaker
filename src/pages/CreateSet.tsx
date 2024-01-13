import { DialogHTMLAttributes, FormEvent, useEffect, useState } from "react";
import CardGrid from "../CardGrid";
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../main";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate, useParams } from "react-router-dom";

interface CreateSetProps {
    setId: string
}

function CreateSet({ setId = "", fromRoom = false }) {
    console.log("setId:", setId)
    const { setId: paramSetId } = useParams();
    console.log("paramSetId:", paramSetId)
    // const finalSetId = setId || paramSetId;
    console.log(paramSetId ? paramSetId : setId)
    // const [finalSetId, setFinalSetId] = useState( paramSetId ? paramSetId : setId)
    const [words, setWords] = useState<string[]>([])
    const [setName, setSetName] = useState("")
    const navigate = useNavigate();

    const formElement = document.getElementById('wordForm') as HTMLFormElement;
    const confirmation = document.getElementById("setDeleteConfirm") as HTMLDialogElement;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/login")
            }
        })


        if (fromRoom) {
            if (setId) {
                console.log("came from room: ", setId)
                const docRef = doc(db, "sets", setId)
                console.log("docRef:", docRef)
                getDoc(docRef)
                .then(doc => {
                    console.log("docdata:", doc.data())
                    setWords(doc.data().words)
                    setSetName(doc.data().name)
                })
            } else {
                return;
            }

        }

        console.log("finalSetId", paramSetId)
        if (paramSetId && !fromRoom) {
            const docRef = doc(collection(db, "sets"), paramSetId)
            getDoc(docRef)
            .then(doc => {
                console.log("docdata:", doc.data())
                setWords(doc.data().words)
                setSetName(doc.data().name)
            })
        }
        
        return () => {
            unsubscribe();
        }
    }, [setId])


    function handleNewWord(e: FormEvent) {
        e.preventDefault();

        const wordElement = formElement.elements.namedItem('wordentry') as HTMLInputElement;
        if (words.length >= 20) {
            alert("too many words. max: 20 words")
        } else {
            setWords([...words, wordElement.value])
        }
        wordElement.value = "";
    }

    function saveSet() {
        if (fromRoom && setId) {
            const docRef = doc(db, "sets", setId)
            setDoc(docRef, {
                words: words,
                id: auth.currentUser.uid,
                name: setName
            })
            return;
        }

        if (paramSetId) {
            const docRef = doc(db, "sets", paramSetId)
            setDoc(docRef, {
                words: words,
                id: auth.currentUser.uid,
                name: setName
            })
        } else {
            addDoc(collection(db, "sets"), {
                id: auth.currentUser.uid,
                words: words,
                name: setName
            })
            .then(doc => {
                console.log(doc)
                navigate(`/createset/${doc.id}`)
            })
        }
        alert("set saved")
    }

    return ( 
    <div>
        <Link to="/dashboard">
            <button>Dashboard</button>
        </Link>
        <div className="row">
            <h1>Logged in as {auth.currentUser?.displayName}</h1>
        </div>
        <div className="row">
            <h4>setName</h4>
            <input type="text" value={setName} onChange={(e) => {
                setSetName(e.target.value);
            }}/>
            <form id="wordForm" onSubmit={handleNewWord}>
                <label htmlFor="wordentry"><h4>Add word</h4> </label>
                <input type="text" id="wordentry"/>
                <input type="submit" />
            </form>

        </div>
        <div className="row">
            <CardGrid items={words} deletable={true} delete={(cardword: string) => {
                setWords(words.filter(word => word != cardword))
            }}/>
        </div>
        <div className="m-2">
            <button onClick={saveSet}>Save</button>
        </div>
        {/* <div className="m-2">
            <button>Start Game</button>
        </div> */}
        <div>
            <button onClick={() =>{
                confirmation.showModal();
            }}>Delete Set</button>
            <dialog id="setDeleteConfirm">
                <p>Confirm delete set?</p>
                <button onClick={() => {
                    deleteDoc(doc(collection(db, "sets"), paramSetId))
                    .then(() => {
                        confirmation.close();
                        navigate("/dashboard")
                    })
                }}>Yes</button>
                <button onClick={() => {
                    confirmation.close();
                }}>No</button>
            </dialog>
        </div>
    </div> );
}

export default CreateSet;