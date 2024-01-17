import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import SetEditor from "../components/SetEditor";
import { auth } from "../main";


function CreateSet() {
    // console.log("setId:", setId)
    const { setId: paramSetId } = useParams();
    // console.log("paramSetId:", paramSetId)
    // const finalSetId = setId || paramSetId;
    // console.log(paramSetId ? paramSetId : setId)
    // const [finalSetId, setFinalSetId] = useState( paramSetId ? paramSetId : setId)
    const navigate = useNavigate();


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/login")
            }
        })

        return () => {
            unsubscribe();
        }
    }, [navigate])

    return ( 
    <div className="container whitecontainer">
        <div className="m-4">
            <Header username={auth.currentUser?.displayName || null} hasLogout={false}/>
            <div className="row px-4">
                <div className="hoverablecard" onClick={() => {
                    navigate("/dashboard")
                }}><h5>⇦ Dashboard</h5></div>
            </div>
            <SetEditor setId={paramSetId || ""} onDelete={() => {
                navigate("/dashboard")
            }} onSave={() => {}}/>
        </div>
    </div> );
}

{/* <div className="px-4">
<h2>Edit sets</h2>

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

<h2>Words</h2>
<div className="container">
    <div className="row">
        <CardGrid items={words} deletable={true} delete={(cardword: string) => {
            setWords(words.filter(word => word != cardword))
        }}/>
    </div>
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
</div> */}

export default CreateSet;