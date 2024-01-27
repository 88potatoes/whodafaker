import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './assets/css/custom.css';
import CreateSet from './pages/CreateSet';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import JoinRoom from './pages/JoinRoom';
import Login from './pages/Login';
import Room from './pages/Room';
import Signup from './pages/Signup';
import InRoom from './pages/InRoom';
import PassiveLayout from './components/PassiveLayout';

function App() {
  return (
    <PassiveLayout>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createset/" element={<CreateSet />} />
          <Route path="/createset/:setId" element={<CreateSet />} />
          <Route path="/room/:roomCode" element={<Room />} />
          <Route path="/join" element={<JoinRoom />} />
          <Route path="/joined/:roomCode" element={<InRoom />} />
        </Routes>
      </Router>
    </PassiveLayout>
  )
}

export default App
