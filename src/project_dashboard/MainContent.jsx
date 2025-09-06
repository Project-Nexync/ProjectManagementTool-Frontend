import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // to get projectId from URL
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { BiSolidBookmarkAltMinus } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { AiFillPieChart } from "react-icons/ai";
import api from "../API.jsx"; // make sure your api.jsx has default export

export default function ProjectMainContent() {
  const { projectId } = useParams(); // get projectId from route
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/project/${projectId}`);
        setProject(res.data.project); // assuming backend returns { project: {...} }
      } catch (err) {
        console.error(err);
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  if (loading) return <p className="text-center text-white">Loading project...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!project) return <p className="text-center text-white">No project found</p>;

  const deadline = new Date(project.end_date);
  const formattedDate = deadline.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
  const formattedTime = deadline.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <main className="flex-1 flex flex-col px-0 py-2 bg-transparent">
      <div className="flex flex-col mb-4">
        <div className="flex items-center gap-2">
          <span className="text-white text-3xl font-extrabold tracking-wide">{project.name}</span>
          <button
            className="focus:outline-none"
            title={saved ? "Remove from Saved Projects" : "Add to Saved Projects"}
            onClick={() => setSaved((s) => !s)}
          >
            {saved ? (
              <BiSolidBookmarkAltMinus className="text-white w-7 h-7 hover:scale-110 transition-transform" />
            ) : (
              <BsFillBookmarkHeartFill className="text-white w-7 h-7 hover:scale-110 transition-transform" />
            )}
          </button>
        </div>
        <div
          className="text-lg mt-1"
          style={{ color: "#BCB4B4", fontFamily: "HelveticaNeueLight, Helvetica Neue, Helvetica, Arial, sans-serif", fontWeight: 300 }}
        >
          {project.description}
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="bg-[#9D1C1D] text-[#FFAEAE] px-3 py-1 rounded-lg font-bold text-sm">
            <FaCalendarAlt className="inline-block mr-2 w-4 h-4 text-[#FFAEAE] -mt-1" />
            <span>Deadline : {formattedDate} at {formattedTime}</span>
          </div>
          <div className="bg-[#1e293b] text-blue-300 px-3 py-1 rounded-lg font-bold text-sm">
            <AiFillPieChart className="inline-block mr-2 w-4 h-4 text-blue-300 -mt-1" />
            <span>Task Completion Percentage : 28%</span> {/* You can compute from project tasks */}
          </div>
        </div>
        <div className="flex flex-col items-start mt-4 md:mt-4">
          <div className="flex items-center gap-2">
            <span className="text-blue-200 font-bold text-sm">TEAM :</span>
            <div className="flex -space-x-2">
              {project.members?.map((m, idx) => (
                <img
                  key={idx}
                  src="/src/assets/usericon.png" // placeholder, replace with m.profilePic if exists
                  alt={m.user_name}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
