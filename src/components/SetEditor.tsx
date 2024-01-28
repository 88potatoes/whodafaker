import { FormEvent, useEffect, useState } from "react";
import CardGrid from "./CardGrid";
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../main";
import { onAuthStateChanged } from "firebase/auth";
import SecondarySection from "./SecondarySection";
import FramerButton from "./FramerButton";
import { usePopup } from "./PassiveLayout";

interface SetEditorProp {
    setId: string,
    onDelete: () => void,
    onSave: () => void
}

function SetEditor({ setId, onDelete, onSave }: SetEditorProp) {
    const [setName, setSetName] = useState("");
    const [words, setWords] = useState<string[]>([]);
    const navigate = useNavigate();
    const { setPopup } = usePopup();

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
                    setWords(doc.data()?.words)
                    setSetName(doc.data()?.name)
                })
                .catch(() => {
                    setPopup("Unable to fetch word set.")
                    navigate('/dashboard')
                })
        }

        return () => {
            unsubscribe();
        }

    }, [navigate, setId])

    function saveSet() {
        if (!auth.currentUser) {
            setPopup("Unable to save set: User not logged in")
            return;
        }

        if (!setId) {
            // need to create a new setId

            addDoc(collection(db, "sets"), {
                id: auth.currentUser.uid,
                words: words,
                name: setName
            })
                .then(doc => {
                    console.log(doc)
                    navigate(`/createset/${doc.id}`)
                    setPopup("Set created successfully")
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            // set is already there
            const docRef = doc(db, "sets", setId)
            setDoc(docRef, {
                words: words,
                id: auth.currentUser.uid,
                name: setName
            })
                .then(() => {
                    setPopup("Set saved successfully")
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        onSave();

        return;
    }

    function handleNewWord(e: FormEvent) {
        e.preventDefault();

        const wordElement = formElement.elements.namedItem('wordentry') as HTMLInputElement;
        if (words.length >= 20) {
            setPopup("Too many words. Maximum of 20 words per set.")
        } else if (words.includes(wordElement.value)) {
            setPopup("Duplicate word.")
        } else {
            // use semicolon separated words
            if (wordElement.value.includes(",")) {
                const ind_words = wordElement.value.split(",").map(word => word.trim());
                console.log(ind_words)
                console.log(20 - words.length);

                const new_words = [...words];
                for (const word of ind_words) {
                    if (new_words.length >= 20) {
                        break;
                    }
                    if (new_words.includes(word)) {
                        continue;
                    }
                    new_words.push(word);
                }
                setWords(new_words)
            } else {
                setWords([...words, wordElement.value])
            }
        }
        wordElement.value = "";
    }

    return (
        <div className="row">
            {/* Menu for editing the set */}
            <SecondarySection className="col-4">
                <div>
                    <label htmlFor=""><h4 className="m-1">Set Name</h4></label>
                    <input type="text" value={setName} onChange={(e) => {
                        setSetName(e.target.value);
                    }} />
                </div>
                <form id="wordForm" onSubmit={handleNewWord} className="col-6">
                    <label htmlFor="wordentry"><h4 className="m-1">Add word</h4></label>
                    <input type="text" id="wordentry" className="m-1" />
                </form>
                <div className="mt-2">

                    <FramerButton text="Save Set" onClick={saveSet} />
                </div>
                <div className="mt-2">
                    <FramerButton text="Delete Set" onClick={() => {
                        confirmation.showModal();
                    }} />
                </div>
                {/* <button onClick={saveSet} className="col-5 m-1"><div className="m-2">Save Set</div></button> */}
                {/* <button className="col-5 m-1" onClick={() => {
                    confirmation.showModal();
                }}><div className="m-2">Delete Set</div></button> */}

            </SecondarySection>

            {/* Words of the set */}
            <SecondarySection className="col-8">
                <h2>Words</h2>
                <CardGrid items={words} deletable={true} delete={(cardword: string) => {
                    setWords(words.filter(word => word != cardword))
                }} />
            </SecondarySection>

            <dialog id="setDeleteConfirm">
                <p>Confirm delete set?</p>
                <button onClick={() => {
                    deleteDoc(doc(collection(db, "sets"), setId))
                        .then(() => {
                            confirmation.close();
                            onDelete();
                        })
                }}>Yes</button>
                <button onClick={() => {
                    confirmation.close();
                }}>No</button>
            </dialog>
        </div>
    );
}

export default SetEditor;