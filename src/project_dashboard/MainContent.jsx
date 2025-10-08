import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { BiSolidBookmarkAltMinus } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { AiFillPieChart, AiOutlinePlus } from "react-icons/ai";
import api from "../API.jsx";

export default function ProjectMainContent() {
  const { projectId } = useParams(); 
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  const [showMembers, setShowMembers] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("member");

  const [completionPercentage, setCompletionPercentage] = useState(0); // ✅ dynamic percentage

  const teamRef = useRef(null);

  // Fetch project data
  const fetchProject = async () => {
    try {
      const res = await api.get(`/project/${projectId}`);
      setProject(res.data.project);
    } catch (err) {
      console.error(err);
      setError("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  // Fetch project progress
  const fetchProgress = async () => {
    try {
      const res = await api.get(`/project/${projectId}/progress`);
      if (res.data.success) {
        setCompletionPercentage(parseFloat(res.data.progress)); // use API progress
      }
    } catch (err) {
      console.error("Failed to fetch project progress:", err);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchProgress(); // fetch percentage
  }, [projectId]);

  // Close members list when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(e) {
      if (teamRef.current && !teamRef.current.contains(e.target)) {
        setShowMembers(false);
      }
    }
    function handleEsc(e) {
      if (e.key === "Escape") {
        setShowMembers(false);
        setShowAddForm(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Handle adding a member
  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!newEmail) return;

    try {
      const res = await api.post(`/edit/${projectId}/addMember`, {
        assignee: [{ email: newEmail, role: newRole }],
      });

      if (res.data.success) {
        await fetchProject();
        setNewEmail("");
        setNewRole("member");
        setShowAddForm(false);
      } else {
        alert(res.data.message || "Failed to add member");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding member");
    }
  };

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
            <span>Task Completion Percentage : {completionPercentage}%</span> {/* ✅ dynamic */}
          </div>
        </div>

        {/* TEAM */}
        <div className="flex flex-col items-start mt-4 md:mt-4" ref={teamRef}>
          <div className="flex items-center gap-2 relative">
            <span className="text-blue-200 font-bold text-sm">TEAM :</span>
            <div className="flex -space-x-2 cursor-pointer" onClick={() => setShowMembers((v) => !v)}>
              {project.members?.map((m, idx) => (
                <img
                  key={idx}
                  src="/src/assets/usericon.png"
                  alt={m.username || m.user_name || "member"}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <button
              className="ml-2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setShowAddForm(true);
              }}
              title="Add member"
            >
              <AiOutlinePlus />
            </button>

            {/* Members dropdown */}
            {showMembers && (
              <div className="absolute left-0 top-full mt-2 w-72 max-h-64 overflow-y-auto bg-[rgba(11,21,32,0.95)] border border-[#294372] rounded-lg shadow-xl p-2 z-30">
                <ul className="divide-y divide-[#294372]/50">
                  {project.members?.length ? (
                    project.members.map((m, i) => (
                      <li key={i} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                          <img
                            src="/src/assets/usericon.png"
                            alt={m.username || m.user_name || "member"}
                            className="w-6 h-6 rounded-full border border-white/20"
                          />
                          <span className="text-blue-100 text-sm">{m.username || m.user_name || m.email}</span>
                        </div>
                        <span className="text-xs text-gray-300 italic">{m.role || "member"}</span>
                      </li>
                    ))
                  ) : (
                    <li className="py-2 text-sm text-gray-300">No members</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Centered Add Member Form */}
      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-40">
          <form
            onSubmit={handleAddMember}
            className="bg-[rgba(11,21,32,0.95)] border border-[#294372] rounded-lg shadow-xl p-6 w-80 flex flex-col gap-3"
          >
            <h3 className="text-white text-lg font-bold">Add Member</h3>
            <input
              type="email"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full px-3 py-2 rounded bg-[#1e293b] text-white border border-[#294372] text-sm focus:outline-none"
              required
            />
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full px-3 py-2 rounded bg-[#1e293b] text-white border border-[#294372] text-sm focus:outline-none"
            >
              <option value="member">Member</option>
              <option value="manager">Manager</option>
              <option value="visitor">Visitor</option>
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Add Member
            </button>
            <button
              type="button"
              className="text-gray-300 mt-2 underline"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
