import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import CreateSet from './pages/CreateSet';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import JoinRoom from './pages/JoinRoom';
import Login from './pages/Login';
import Room from './pages/Room';
import Signup from './pages/Signup';
import InRoom from './pages/InRoom';

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
      <Route path="/joined/:roomCode" element={ <InRoom/> }/>
    </Routes>
  </Router>
  )
}

export default App
