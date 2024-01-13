import { DialogHTMLAttributes, FormEvent, useEffect, useState } from "react";
import CardGrid from "../CardGrid";
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../main";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate, useParams } from "react-router-dom";

interface CreateSetProps {
    setId: string
}

function CreateSet({ setId = "" }) {
    console.log("setId:", setId)
    const { setId: paramSetId } = useParams();
    console.log("paramSetId:", paramSetId)
    // const finalSetId = setId || paramSetId;
    console.log(paramSetId ? paramSetId : setId)
    const [finalSetId, setFinalSetId] = useState( paramSetId ? paramSetId : setId)
    console.log("initial finalSetId: ", finalSetId);
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

        console.log("finalSetId", finalSetId)
        if (finalSetId) {
            console.log(finalSetId)
            const docRef = doc(db, "sets", finalSetId)
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
    }, [finalSetId])


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
        if (finalSetId) {
            const docRef = doc(db, "sets", finalSetId)
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
                    deleteDoc(doc(collection(db, "sets"), finalSetId))
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