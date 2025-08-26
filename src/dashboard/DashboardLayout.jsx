
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import backgroundImage from "../assets/bg-screen.png";

export default function DashboardLayout() {
  return (
    <div
      className="flex min-h-screen bg-gradient-to-br from-[#1a2233] to-[#0d1624]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <Sidebar />
      <MainContent />
    </div>
  );
}

