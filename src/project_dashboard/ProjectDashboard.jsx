import React from "react";
import DashboardNav from "../components/DashboardNav";
import ProjectSidebar from "./ProjectSidebar";
import ProjectMainContent from "./ProjectMainContent";
import backgroundImage from "../assets/bg-screen.png";

export default function ProjectDashboard() {
  // Placeholder for add task modal logic if needed
  // const [showCreate, setShowCreate] = useState(false);
  return (
    <div
      className="min-h-screen w-full bg-[#0a1834]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 pt-4">
        {/* Left Sidebar: Logo at the very top */}
        <aside className="col-span-12 lg:col-span-2 bg-transparent shadow-2xl text-white flex flex-col px-4 min-h-[80vh]">
          <ProjectSidebar />
        </aside>
        {/* Middle + Right: DashboardNav spans both */}
        <div className="col-span-12 lg:col-span-10 flex flex-col gap-6">
          <div className="w-full">
            <DashboardNav />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 w-full">
            {/* Middle: Project Header & Table */}
            <section className="col-span-10 lg:col-span-7 flex flex-col">
              <ProjectMainContent />
            </section>
            {/* Right: Chart & Chat */}
            <section className="col-span-10 lg:col-span-3 flex flex-col gap-6 w-full lg:w-[400px]">
              {/* Completion Chart */}
              <div className="bg-[#12244a] rounded-xl p-4 shadow-lg flex flex-col items-center">
                <div className="text-white font-bold mb-2">Overall Task Completion</div>
                <div className="w-40 h-40 bg-[#1e293b] rounded-full flex items-center justify-center">
                  {/* Insert chart component here */}
                  <span className="text-blue-400 font-bold">[Chart]</span>
                </div>
              </div>
              {/* Chat */}
              <div className="bg-[#12244a] rounded-xl p-4 shadow-lg flex flex-col h-[260px]">
                <div className="text-white font-bold mb-2">Website Redesign Project</div>
                <div className="flex-1 overflow-y-auto bg-[#1e293b] rounded-lg p-2 mb-2">
                  {/* Example chat messages */}
                  <div className="text-blue-400 text-sm mb-1">Hi team <span className="float-right text-xs text-gray-400">11:31 AM</span></div>
                  <div className="text-blue-400 text-sm mb-1">How's the work going ? <span className="float-right text-xs text-gray-400">11:31 AM</span></div>
                  <div className="text-white text-sm mb-1">John <span className="float-right text-xs text-gray-400">11:35 AM</span></div>
                  <div className="text-gray-200 text-sm mb-1">Currently working on SEO</div>
                  <div className="text-white text-sm mb-1">@Kalis can u help it <span className="float-right text-xs text-gray-400">11:35 AM</span></div>
                  <div className="text-white text-sm mb-1">Kalis <span className="float-right text-xs text-gray-400">11:35 AM</span></div>
                  <div className="text-gray-200 text-sm mb-1">Sure ! I am into it.</div>
                </div>
                <input className="bg-[#D9D9D923] text-white px-4 py-2 rounded-4xl w-full border border-zinc-400" placeholder="Start typing..." />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
