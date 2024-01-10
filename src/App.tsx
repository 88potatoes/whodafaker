// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>

      {/* <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/sets" element={<Home/>}/>
      <Route path="/sets" element={<Home/>}/> */}
    </Routes>
  </Router>
  )
}

export default App
