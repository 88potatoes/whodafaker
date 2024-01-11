// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Navigate, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CreateSet from './pages/CreateSet';
import { auth } from './main';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import Room from './pages/Room';
import JoinRoom from './pages/JoinRoom';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={ <Login/> }/>
      <Route path="/signup" element={ <Signup/>}/>
      <Route path="/dashboard" element={  <Dashboard/> }/>
      <Route path="/createset/" element={ <CreateSet setId=""/> }/>
      <Route path="/createset/:setId" element={ <CreateSet/> }/>
      <Route path="/room/:roomCode" element={ <Room/> }/>
      <Route path="/join" element={ <JoinRoom/> }/>
    </Routes>
  </Router>
  )
}

export default App
