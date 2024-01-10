import { FormEvent, useState } from "react";
import CardGrid from "../CardGrid";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../main";

function CreateSet() {
    const [words, setWords] = useState<string[]>([])
    const [setName, setSetName] = useState("")

    const formElement = document.getElementById('wordForm') as HTMLFormElement;

    function handleNewWord(e: FormEvent) {
        e.preventDefault();

        const wordElement = formElement.elements.namedItem('wordentry')! as HTMLInputElement;
        if (words.length >= 20) {
            alert("too many words. max: 20 words")
        } else {
            setWords([...words, wordElement.value])
        }
        wordElement.value = "";
    }

    function saveSet() {

        addDoc(collection(db, "sets"), {
            id: auth.currentUser.uid,
            words: words,
            name: setName
        })
        .then(doc => {
            console.log(doc)
        })
    }

    return ( <div>
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
        <div>
            <button onClick={saveSet}>Save</button>
        </div>
    </div> );
}

export default CreateSet;