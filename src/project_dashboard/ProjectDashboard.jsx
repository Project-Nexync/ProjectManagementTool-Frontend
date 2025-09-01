import React, { useState } from "react";
import DashboardNav from "../components/DashboardNav";
import ProjectSidebar from "./ProjectSidebar";
import ProjectMainContent from "./MainContent";
import TaskTable from "./TaskTable";
import backgroundImage from "../assets/bg-screen.png";
import TaskCompletionChart from "./ProjectTaskCompletionChart";
import ChatContainer from "./ChatContainer";
import WorkloadVisualizationModal from "../components/WorkloadVisualizationModal";

export default function ProjectDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      {/* 12-col master grid drives the whole page placement */}
      <div className="relative grid grid-cols-14 gap-x-6 gap-y-0 px-8 pt-4">
        {/* Row 1: Sidebar, Navbar, Project header, Chart/Chat */}
        <div className="col-span-2 flex flex-col">
          <ProjectSidebar />
        </div>
        <div className="col-span-12 flex flex-col gap-6">
          <DashboardNav />
          <div className="grid grid-cols-12 gap-6 w-full">
            {/* Left Section: Project header */}
            <section className="col-span-9 flex flex-col gap-4">
              <ProjectMainContent />
            </section>
            {/* Right Section: Completion + Chat */}
            <section className="col-span-3 flex flex-col gap-6">
              {/* Completion Chart */}
              <TaskCompletionChart />
              {/* View Team Workload Visualization Button */}
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700"
                onClick={handleOpenModal}
              >
                View Team Workload Visualization
              </button>
              {/* Project Chat (real-time, project-specific) */}
              <ChatContainer projectId={"project-unique-id"} user={{ id: "user-1", name: "John Doe" }} />
            </section>
          </div>
        </div>
        {/* Row 2: TaskTable with absolute positioning and negative top value */}
        <div className="absolute left-8 col-span-9 w-[72%] flex top-76 z-20">
          <TaskTable />
        </div>
      </div>

      {/* Workload Visualization Modal */}
      {isModalOpen && <WorkloadVisualizationModal onClose={handleCloseModal} />}
    </div>
  );
}
