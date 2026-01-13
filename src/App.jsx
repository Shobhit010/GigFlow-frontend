import { Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Navbar from './components/layout/Navbar';
import GigFeed from './pages/Gigs/GigFeed';
import CreateGig from './pages/Gigs/CreateGig';
import GigDetails from './pages/Gigs/GigDetails';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <div className="bg-slate-950 min-h-screen text-white font-sans antialiased selection:bg-indigo-500/30">
      <Navbar />
      <Routes>
        <Route path="/" element={<GigFeed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/create-gig" element={<CreateGig />} />
        <Route path="/my-dashboard" element={<Dashboard />} />
        <Route path="/gigs/:id" element={<GigDetails />} />
      </Routes>
    </div>
  );
}

export default App;
