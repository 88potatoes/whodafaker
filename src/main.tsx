import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

const firebaseConfig = {
  apiKey: "AIzaSyDvzhbFbUviLdTVBtekCJ3cZNqAcQbUALU",
  authDomain: "whodafaker.firebaseapp.com",
  projectId: "whodafaker",
  storageBucket: "whodafaker.appspot.com",
  messagingSenderId: "340495141242",
  appId: "1:340495141242:web:f845b3b04255d2f3a56ec3",
  measurementId: "G-V7YQN43VVT"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore();

export { app, db };
