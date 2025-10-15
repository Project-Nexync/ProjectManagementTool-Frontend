import Logo from "./Logo";
import DateTimeDisplay from "./DateTimeDisplay";
import ProjectColorDot from "./ProjectColorDot";
import { useState, useEffect } from "react";
import { CgSandClock } from "react-icons/cg";
import { SiTicktick } from "react-icons/si";
import { GiFullFolder } from "react-icons/gi";
import CreateProject from "../components/CreateProject";
import api from "../api.jsx"; // your existing api instance

export default function Sidebar({ onSectionSelect }) {
  const [open, setOpen] = useState({
    ongoing: true,
    completed: false,
    all: false,
  });
  const [selected, setSelected] = useState("ongoing");
  const [showCreate, setShowCreate] = useState(false);

  // Project states
  const [ongoingProjects, setOngoingProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);

  // Helper for slug
  function slug(name) {
    return name.toLowerCase().replace(/\s+/g, "-");
  }

  const DownArrow = (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
      <path d="M6 9l6 6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
  const UpArrow = (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
      <path d="M6 15l6-6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  function handleSectionClick(section) {
    setSelected(section);
    if (onSectionSelect) onSectionSelect(section);
  }

  function handleArrowClick(e, section) {
    e.stopPropagation();
    setOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  }

  // Fetch projects and progress dynamically
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await api.get("/project/viewAllproject");
        if (!res.data.success) return;

        const projects = res.data.projects;

        const allProj = [];
        const ongoing = [];
        const completed = [];

        // Fetch progress for each project
        const progressPromises = projects.map((p) =>
          api.get(`/project/${p.project_id}/progress`).then((r) => ({
            project: p,
            progress: parseFloat(r.data.progress),
          }))
        );

        const progressResults = await Promise.all(progressPromises);

        progressResults.forEach(({ project, progress }) => {
          allProj.push(project);
          if (progress === 100) {
            completed.push(project);
          } else if (progress > 0 && progress < 100) {
            ongoing.push(project);
          }
        });

        setAllProjects(allProj);
        setOngoingProjects(ongoing);
        setCompletedProjects(completed);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    }

    fetchProjects();
  }, []);

  return (
    <aside className="w-72 bg-transparent shadow-2xl text-white flex flex-col pt-4 px-6 min-h-screen">
      <Logo />
      <DateTimeDisplay />
      <button
        className=" mt-6
                    bg-gradient-to-b from-[#3c63e8] to-[#1452d5]
                    text-white font-bold py-3 rounded-xl text-lg
                    shadow-[0_4px_0_#0f3eb4,0_8px_16px_rgba(0,0,0,0.2)]
                    hover:translate-y-[2px] hover:shadow-[0_2px_0_#0f3eb4,0_6px_12px_rgba(0,0,0,0.2)]
                    active:translate-y-[4px] active:shadow-[0_0px_0_#0f3eb4,0_4px_8px_rgba(0,0,0,0.2)]
                    transition-all duration-200 ease-in-out"
        onClick={() => setShowCreate(true)}
      >
        + Create New Project
      </button>
      <CreateProject open={showCreate} onClose={() => setShowCreate(false)} />
      <nav className="mt-8 flex-1">
        {/* Ongoing Section */}
        <div
          className={`flex items-center gap-2 
              bg-transparent backdrop-blur-md 
              px-4 py-3 
              font-bold text-lg select-none 
              transition-all duration-300 ease-in-out transform
              shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_4px_12px_rgba(59,130,246,0.25)]
              ${
                selected === "ongoing"
                  ? "bg-transparent text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_4px_12px_rgba(59,130,246,0.25)] scale-110"
                  : "text-gray-300 hover:bg-transparent hover:text-white"
              }`}
          style={{ cursor: "pointer" }}
          onClick={() => handleSectionClick("ongoing")}
        >
          <CgSandClock size={22} color="#fff" className="inline-block mr-2 align-middle" />
          <span>On Going</span>
          <span
            className="ml-auto"
            style={{ cursor: "pointer" }}
            onClick={(e) => handleArrowClick(e, "ongoing")}
          >
            {open.ongoing ? UpArrow : DownArrow}
          </span>
        </div>
        {open.ongoing && (
          <ul className="bg-transparent rounded-b-lg pt-4 divide-y divide-[#294372]">
            {ongoingProjects.map((p) => (
              <li
                key={p.project_id}
                className="flex items-center pl-8 py-2 cursor-pointer hover:bg-[#22304a] transition"
              >
                <a href={`/project/${p.project_id}`} className="flex items-center w-full">
                  <ProjectColorDot />
                  <span className="text-sm font-medium">{p.name}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
        {/* Completed Section */}
        <div
          className={`flex items-center gap-2 
              bg-transparent backdrop-blur-md 
              px-4 py-3 
              font-bold text-lg select-none mt-4
              transition-all duration-300 ease-in-out transform
              shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_4px_12px_rgba(59,130,246,0.25)]
              ${
                selected === "completed"
                  ? "bg-transparent text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_4px_12px_rgba(59,130,246,0.25)] scale-110"
                  : "text-gray-300 hover:bg-transparent hover:text-white"
              }`}
          style={{ cursor: "pointer" }}
          onClick={() => handleSectionClick("completed")}
        >
          <SiTicktick size={22} color="#fff" className="inline-block mr-2 align-middle" />
          <span>Completed</span>
          <span
            className="ml-auto"
            style={{ cursor: "pointer" }}
            onClick={(e) => handleArrowClick(e, "completed")}
          >
            {open.completed ? UpArrow : DownArrow}
          </span>
        </div>
        {open.completed && (
          <ul className="bg-transparent rounded-b-lg pt-4 divide-y divide-[#294372]">
            {completedProjects.map((p) => (
              <li
                key={p.project_id}
                className="flex items-center pl-8 py-2 cursor-pointer hover:bg-[#22304a] transition"
              >
                <a href={`/project/${p.project_id}`} className="flex items-center w-full">
                  <ProjectColorDot />
                  <span className="text-sm font-medium">{p.name}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
        {/* All Projects Section */}
        <div
          className={`flex items-center gap-2 
              bg-transparent backdrop-blur-md 
              px-4 py-3 
              font-bold text-lg select-none mt-4
              transition-all duration-300 ease-in-out transform
              shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_4px_12px_rgba(59,130,246,0.25)]
              ${
                selected === "all"
                  ? "bg-transparent text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_4px_12px_rgba(59,130,246,0.25)] scale-110"
                  : "text-gray-300 hover:bg-transparent hover:text-white"
              }`}
          style={{ cursor: "pointer" }}
          onClick={() => handleSectionClick("all")}
        >
          <GiFullFolder size={22} color="#fff" className="inline-block mr-2 align-middle" />
          <span>All Projects</span>
          <span
            className="ml-auto"
            style={{ cursor: "pointer" }}
            onClick={(e) => handleArrowClick(e, "all")}
          >
            {open.all ? UpArrow : DownArrow}
          </span>
        </div>
        {open.all && (
          <ul className="bg-transparent rounded-b-lg pt-4 divide-y divide-[#294372]">
            {allProjects.map((p) => (
              <li
                key={p.project_id}
                className="flex items-center pl-8 py-2 cursor-pointer hover:bg-[#22304a] transition"
              >
                <a href={`/project/${p.project_id}`} className="flex items-center w-full">
                  <ProjectColorDot />
                  <span className="text-sm font-medium">{p.name}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </aside>
  );
}
