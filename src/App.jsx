import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Features from "./pages/features";
import Dashboard from "./dashboard/DashboardLayout";
import About from "./pages/about";
import ProjectDashboard from "./project_dashboard/ProjectDashboard";
import SavedProjects from "./pages/SavedProjects";
import Settings from "./pages/Settings";

function App() {
  const user = { profilePic: null }; 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage user={user} />} />
        <Route path="/features" element={<Features />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
  <Route path="/project/:projectId" element={<ProjectDashboard />} />
  <Route path="/saved" element={<SavedProjects />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
