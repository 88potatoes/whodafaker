// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      {/* <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/sets" element={<Home/>}/>
      <Route path="/sets" element={<Home/>}/> */}
    </Routes>
  </Router>
  )
}

export default App
