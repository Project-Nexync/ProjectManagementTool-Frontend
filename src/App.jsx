import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Features from "./pages/features"; // import your Features page
import Dashboard from "./dashboard/DashboardLayout"
import About from "./pages/about"; // if you have it

function App() {
  const user = { profilePic: null }; 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage user={user} />} />
        <Route path="/features" element={<Features />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </Router>
  );
}

export default App;
