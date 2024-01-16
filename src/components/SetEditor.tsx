import { FormEvent, useEffect, useState } from "react";
import CardGrid from "../CardGrid";
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../main";
import { onAuthStateChanged } from "firebase/auth";

interface SetEditorProp {
    setId: string,
    onDelete: Function,
    onSave: Function
}

function SetEditor({ setId, onDelete, onSave}: SetEditorProp) {
    const [setName, setSetName] = useState("");
    const [words, setWords] = useState<string[]>([]);
    const navigate = useNavigate();

    const formElement = document.getElementById('wordForm') as HTMLFormElement;
    const confirmation = document.getElementById("setDeleteConfirm") as HTMLDialogElement;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/login")
            }
        })

        if (setId) {
            const docRef = doc(db, "sets", setId)
            getDoc(docRef)
            .then(doc => {
                setWords(doc.data().words)
                setSetName(doc.data().name)
            })
        }

        return () => {
            unsubscribe();
        }
        
    }, [navigate, setId])

    function saveSet() {
        if (!auth.currentUser) {
            alert("not logged in")
            return;
        }

        if (!setId) {
            // need to create a new setId
            alert("no setid")

            addDoc(collection(db, "sets"), {
                id: auth.currentUser.uid,
                words: words,
                name: setName
            })
            .then(doc => {
                console.log(doc)
                navigate(`/createset/${doc.id}`)
                // TODO: an after save function - actually don't need to
            })
        } else {
            // set is already there
            const docRef = doc(db, "sets", setId)
            setDoc(docRef, {
                words: words,
                id: auth.currentUser.uid,
                name: setName
            })
            alert("set saved")

        }

        onSave();

        return;       
    }

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

    return (
    <div className="container">
        <div className="px-4">
            <h2>Edit set</h2>

            <div className="row m-2">
                <form className="col-6">
                    <label htmlFor=""><h4 className="m-1">Set Name</h4></label>
                    <input type="text" value={setName} onChange={(e) => {
                        setSetName(e.target.value);
                    }} />
                </form>

                <form id="wordForm" onSubmit={handleNewWord} className="col-6">
                    <label htmlFor="wordentry"><h4 className="m-1">Add word</h4></label>
                    <input type="text" id="wordentry" className="m-1" />
                    <input type="submit" />
                </form>
            </div>

            <h2>Words</h2>
            <div className="container">
                <div className="row">
                    <CardGrid items={words} deletable={true} delete={(cardword: string) => {
                        setWords(words.filter(word => word != cardword))
                    }} />
                </div>
            </div>

        </div>
        <div className="row m-2">
            <button onClick={saveSet} className="col-5 m-1"><div className="m-2">Save Set</div></button>
            <button className="col-5 m-1" onClick={() => {
                confirmation.showModal();
            }}><div className="m-2">Delete Set</div></button>
            <dialog id="setDeleteConfirm">
                <p>Confirm delete set?</p>
                <button onClick={() => {
                    deleteDoc(doc(collection(db, "sets"), setId))
                        .then(() => {
                            confirmation.close();
                            // navigate("/dashboard")
                            // TODO : after delete function
                            onDelete();
                        })
                }}>Yes</button>
                <button onClick={() => {
                    confirmation.close();
                }}>No</button>
            </dialog>
        </div>
    </div>);
}

export default SetEditor;