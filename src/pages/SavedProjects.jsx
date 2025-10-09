import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
import Logo from "../dashboard/Logo";
import DateTimeDisplay from "../dashboard/DateTimeDisplay";
import ProjectCard from "../dashboard/ProjectCard";
import api from "../API.jsx";
import backgroundImage from "../assets/bg-screen.png";

export default function SavedProjects() {
  const [savedProjects, setSavedProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const navigate = useNavigate();

  // Fetch saved project IDs
  const fetchSavedProjects = async () => {
    try {
      const res = await api.get("/project/user/getsaveproject");
      if (res.data.success) {
        setSavedProjects(res.data.projects.map(p => p.project_id));
      }
    } catch (err) {
      console.error("Failed to fetch saved projects:", err);
    }
  };

  // Fetch all projects
  const fetchAllProjects = async () => {
    try {
      const res = await api.get("/project/viewAllproject");
      if (res.data.success) {
        setAllProjects(res.data.projects);
      }
    } catch (err) {
      console.error("Failed to fetch all projects:", err);
    }
  };

  useEffect(() => {
    fetchSavedProjects();
    fetchAllProjects();
  }, []);

  // Filter projects to only saved ones
  const filteredProjects = allProjects.filter(project =>
    savedProjects.includes(project.project_id)
  );


  const mappedProjects = filteredProjects.map(project => ({
    project_id: project.project_id,
    title: project.name,
    description: project.description,
    progress: 0,
    completed: false,
    team: project.members?.map(() => "/src/assets/usericon.png") || [],
    tasks: 0,
    completedTasks: 0,
    totalTasks: 0,
    comments: 0,
    attachments: 0,
    color: "blue",
  }));

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
      <div className="flex flex-row items-center px-8 pt-4">
        <Logo />
        <div className="ml-8 flex-1">
          <DashboardNav />
        </div>
      </div>

      <div className="flex flex-row items-center px-8 mt-6 gap-20">
        <div className="-mt-12">
          <DateTimeDisplay />
        </div>
        {/* <div className="flex flex-col gap-0">
          <h1 className="text-4xl font-bold text-white">Saved Projects</h1>
          <span className="text-lg text-blue-200">
            Keep your most important projects saved here for easier access
          </span>
        </div> */}
      </div>

      <div className="px-8 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-start">
          {mappedProjects.map(project => (
            <div
              key={project.project_id}
              onClick={() => navigate(`/project/${project.project_id}`)}
              className="cursor-pointer"
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
