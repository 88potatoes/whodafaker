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
    <div className="container whitecontainer">
        <div className="m-4">
            <div className="container mb-4">
                <div className="m-2 d-flex align-items-center justify-content-between">
                    <button onClick={() => {navigate("/dashboard")}}>&lt; Dashboard</button>
                    <h3 className="float-right">{auth.currentUser?.displayName}</h3>
                </div>
            </div>
            <div className="row m-2">
                <form className="col-6">
                    <label htmlFor=""><h4 className="m-1">Set Name</h4></label>
                    <input type="text" value={setName} onChange={(e) => {
                        setSetName(e.target.value);
                    }}/>
                </form>

                <form id="wordForm" onSubmit={handleNewWord} className="col-6">
                    <label htmlFor="wordentry"><h4 className="m-1">Add word</h4></label>
                    <input type="text" id="wordentry" className="m-1"/>
                    <input type="submit" />
                </form>
            </div>
            <div className="row">
            </div>
        <div className="container">
            <div className="row">
                <CardGrid items={words} deletable={true} delete={(cardword: string) => {
                    setWords(words.filter(word => word != cardword))
                }}/>
            </div>
        </div>
        <div className="row m-2">
            <button onClick={saveSet} className="col-5 m-1"><div className="m-2">Save Set</div></button>
            <button className="col-5 m-1" onClick={() =>{
                confirmation.showModal();
            }}><div className="m-2">Delete Set</div></button>
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
        {/* <div className="m-2">
            <button>Start Game</button>
        </div> */}

        </div>
    </div> );
}

export default CreateSet;