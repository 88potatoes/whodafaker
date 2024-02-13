import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './assets/css/custom.css';
import PassiveLayout from './components/PassiveLayout';
import CreateSet from './pages/CreateSet';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import InRoom from './pages/InRoom';
import JoinRoom from './pages/JoinRoom';
import Login from './pages/Login';
import Room from './pages/Room';
import Signup from './pages/Signup';

/**
 * Routes and layout for the whole app \
 * All routes are: \
 *  '/' - landing page \
 *  '/login' - login page \
 *  '/signup' - signup page \
 *  '/dashboard' - main page once logged in \
 *  '/createset' - page for editing sets before a set has been created \
 *  '/createset/:setId' - page for editing sets after a set has been created \
 *  '/room/:roomCode' - page for a gamemaster that represents the game lobby - both to sit in the lobby and play the game \
 *  '/join' - page for players looking to join a particular lobby \
 *  '/joined/:roomCode' - page for players who have joined a particular lobby - both to sit in the lobby and also to play the game 
 * 
 * @returns Routes and layout for the whole app
 */
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
