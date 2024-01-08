// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import CardGrid from './CardGrid'
import { 
  DocumentSnapshot,
  doc, getDoc
} from 'firebase/firestore';
import { db } from './main';
import { useEffect, useState } from 'react';

function App() {
  const [words, setWords] = useState(['josher', 'tyana', 'jerri']);

  useEffect(() => {
    const setDoc = doc(db, 'sets', 'wD26eGha81PXCMwDkw6Y')
    getDoc(setDoc)
    .then((result: DocumentSnapshot) => {
      if (result.exists()) {
        console.log(result.data().words)
        setWords(result.data().words)
      }
    })

  }, [])

  return (
    <>
      <div><h2>WhoDaFaker</h2></div>
      <CardGrid items={words}/>
    </>
  )
}

export default App
