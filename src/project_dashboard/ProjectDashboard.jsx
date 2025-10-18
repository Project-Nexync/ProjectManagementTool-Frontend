import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
import ProjectSidebar from "./ProjectSidebar";
import ProjectMainContent from "./MainContent";
import TaskTable from "./TaskTable";
import backgroundImage from "../assets/bg-screen.png";
import TaskCompletionChart from "./ProjectTaskCompletionChart";
import ChatContainer from "./ChatContainer";
import WorkloadVisualizationModal from "../components/WorkloadVisualizationModal";
import { VscGraph } from "react-icons/vsc";

export default function ProjectDashboard() {
  const { projectId } = useParams(); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get user info directly from localStorage
  const storedUser = localStorage.getItem("user");
  let user = null;

  if (storedUser) {
    try {
      user = JSON.parse(storedUser);
      console.log("Logged-in user:", user.id); 
    } catch (err) {
      console.error("Error parsing stored user:", err);
    }
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="min-h-screen w-full bg-[#0a1834]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 12-col master grid */}
      <div className="relative grid grid-cols-14 gap-x-6 gap-y-0 px-8 pt-4">
        {/* Sidebar */}
        <div className="col-span-2 flex flex-col">
          <ProjectSidebar />
        </div>

        {/* Main Content */}
        
        <div className="col-span-12 flex flex-col gap-6">
          <DashboardNav />
          <div className="grid grid-cols-12 gap-6 w-full">
            {/* Left Section: Project header */}
            <section className="col-span-9 flex flex-col gap-4">
              <ProjectMainContent />
            </section>

            {/* Right Section: Completion Chart + Chat */}
            <section className="col-span-3 flex flex-col gap-6">
              {/* Completion Chart */}
              <TaskCompletionChart />

              {/* Workload Visualization Button */}
              <button
                className="
                  flex items-center justify-center gap-2
                  bg-[#1452D5] text-white
                  rounded-lg py-2 px-4
                  shadow-[0_4px_0_#0f3eb4,0_6px_12px_rgba(0,0,0,0.3)]
                  hover:translate-y-[1px] hover:shadow-[0_2px_0_#0f3eb4,0_4px_8px_rgba(0,0,0,0.3)]
                  active:translate-y-[2px] active:shadow-[0_0px_0_#0f3eb4,0_2px_4px_rgba(0,0,0,0.3)]
                  transition-all duration-150"
                onClick={handleOpenModal}
              >
                <VscGraph className="w-5 h-5" />
                <span>View Team Workload Visualization</span>
              </button>

              {/* Project Chat */}
              {user && projectId && (
                <ChatContainer projectId={projectId} user={user.id} />
              )}
            </section>
          </div>
        </div>

        {/* Task Table */}
        <div className="absolute left-8 col-span-9 w-[72%] flex top-76 z-20">
          <TaskTable />
        </div>
      </div>

      {/* Workload Visualization Modal */}
      {isModalOpen && <WorkloadVisualizationModal onClose={handleCloseModal} />}
    </div>
  );
}
