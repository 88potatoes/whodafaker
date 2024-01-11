import { FormEvent, useEffect, useState } from "react";
import CardGrid from "../CardGrid";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../main";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate, useParams } from "react-router-dom";

interface CreateSetProps {
    setId: string
}

function CreateSet({ setId = "" }) {
    const { setId: paramSetId } = useParams();
    const finalSetId = setId || paramSetId;
    const isNew = finalSetId ? false : true;
    const [words, setWords] = useState<string[]>([])
    const [setName, setSetName] = useState("")
    const navigate = useNavigate();

    const formElement = document.getElementById('wordForm') as HTMLFormElement;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/login")
            }
        })

        if (finalSetId) {
            const docRef = doc(db, "sets", finalSetId)
            getDoc(docRef)
            .then(doc => {
                console.log(doc.data())
                setWords(doc.data().words)
                setSetName(doc.data().name)
            })
        }
    }, [])


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
            <CardGrid items={words}/>
        </div>
        <div className="m-2">
            <button onClick={saveSet}>Save</button>
        </div>
        <div className="m-2">
            <button>Start Game</button>
        </div>
    </div> );
}

export default CreateSet;