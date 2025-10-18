import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { BiSolidBookmarkAltMinus } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { AiFillPieChart, AiOutlinePlus } from "react-icons/ai";
import api from "../api.jsx";

export default function ProjectMainContent() {
  const { projectId } = useParams(); 
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  const [showMembers, setShowMembers] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("member");

  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedTime, setEditedTime] = useState("");

  const teamRef = useRef(null);

  // Fetch project data
  const fetchProject = async () => {
    try {
      const res = await api.get(`/project/${projectId}`);
      setProject(res.data.project);
      const projectDate = new Date(res.data.project.end_date);
      const isoDate = projectDate.toISOString();
      setEditedName(res.data.project.name);
      setEditedDescription(res.data.project.description);
      setEditedDate(isoDate.split("T")[0]);
      setEditedTime(isoDate.split("T")[1].slice(0,5));
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
        setCompletionPercentage(parseFloat(res.data.progress));
      }
    } catch (err) {
      console.error("Failed to fetch project progress:", err);
    }
  };

  // Check if project is saved
  const checkIfSaved = async () => {
    try {
      const res = await api.get(`/project/user/getsaveproject`);
      if (res.data.success && res.data.projects) {
        const savedProjectIds = res.data.projects.map(p => p.project_id);
        if (savedProjectIds.includes(Number(projectId))) {
          setSaved(true);
        }
      }
    } catch (err) {
      console.error("Failed to fetch saved projects:", err);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchProgress();
    checkIfSaved();
  }, [projectId]);

  // Close members list and modals when clicking outside or pressing Escape
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
        setShowEditModal(false);
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
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle editing project
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const combinedDateTime = new Date(`${editedDate}T${editedTime}:00`).toISOString();

      const res = await api.put(`/edit/${projectId}/editproject`, {
        name: editedName,
        description: editedDescription,
        end_date: combinedDateTime,
      });

      if (res.data.success) {
        await fetchProject();
        setShowEditModal(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle deleting project
  const handleDeleteProject = async () => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await api.delete(`/edit/${projectId}/deleteproject`);
      if (res.data.success) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle saving project
  const handleSaveProject = async () => {
    try {
      await api.post(`/project/user/saveproject/${projectId}`);
      setSaved(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center text-white">Loading project...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!project) return <p className="text-center text-white">No project found</p>;

  const deadline = new Date(project.end_date);
  const sriLankaOptions = { timeZone: "Asia/Colombo" };
  const day = deadline.toLocaleString("en-US", { ...sriLankaOptions, day: "numeric" });
  const month = deadline.toLocaleString("en-US", { ...sriLankaOptions, month: "long" });
  const year = deadline.toLocaleString("en-US", { ...sriLankaOptions, year: "numeric" });
  const hour = deadline.toLocaleString("en-US", { ...sriLankaOptions, hour: "2-digit", hour12: false });
  const minute = deadline.toLocaleString("en-US", { ...sriLankaOptions, minute: "2-digit", hour12: false });
  const formattedDate = `${day} ${month} ${year}`;
  const formattedTime = `${hour}:${minute}`;

  return (
    <main className="flex-1 flex flex-col px-0 py-2 bg-transparent">
      <div className="flex flex-col mb-4">
        <div className="flex items-center gap-2">
          <span className="text-white text-3xl font-extrabold tracking-wide">{project.name}</span>

          {/* Edit icon */}
          <button
            className="ml-2 focus:outline-none cursor-pointer hover:text-blue-400"
            title="Edit Project"
            onClick={() => setShowEditModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>

          {/* Save project button */}
          <button
            className="focus:outline-none"
            title={saved ? "Remove from Saved Projects" : "Add to Saved Projects"}
            onClick={handleSaveProject}
          >
            {saved ? (
              <BiSolidBookmarkAltMinus className="text-white w-7 h-7 hover:scale-110 transition-transform" />
            ) : (
              <BsFillBookmarkHeartFill className="text-white w-7 h-7 hover:scale-110 transition-transform" />
            )}
          </button>
        </div>

        <div className="text-lg mt-1 text-[#BCB4B4] font-light">{project.description}</div>

        <div className="flex items-center gap-4 mt-2">
          <div className="bg-[#9D1C1D] text-[#FFAEAE] px-3 py-1 rounded-lg font-bold text-sm">
            <FaCalendarAlt className="inline-block mr-2 w-4 h-4 text-[#FFAEAE] -mt-1" />
            <span>Deadline : {formattedDate} at {formattedTime}</span>
          </div>
          <div className="bg-[#1e293b] text-blue-300 px-3 py-1 rounded-lg font-bold text-sm">
            <AiFillPieChart className="inline-block mr-2 w-4 h-4 text-blue-300 -mt-1" />
            <span>Task Completion Percentage : {completionPercentage}%</span>
          </div>
        </div>

        {/* TEAM */}
        <div className="flex flex-col items-start mt-4 md:mt-4 relative" ref={teamRef}>
          <div className="flex items-center gap-2 relative">
            <span className="text-blue-200 font-bold text-sm">TEAM :</span>
            <div className="flex -space-x-2 cursor-pointer" onClick={() => setShowMembers((v) => !v)}>
              {project.members?.map((m, idx) => (
                <div
                  key={idx}
                  className="w-8 h-8 rounded-full border-2 border-white bg-[#00527d] flex items-center justify-center text-white font-semibold text-sm"
                  title={m.username || m.user_name || m.email} // optional hover tooltip
                >
                  {(() => {
                    const name = m.username || m.user_name || "M";
                    if (name.length === 1) return name[0].toUpperCase() + "X";
                    return name
                      .replace(/\s+/g, "")
                      .slice(0, 2)
                      .toUpperCase();
                  })()}
                </div>

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
          </div>

          {/* Members dropdown */}
          {showMembers && (
            <div className="absolute top-10 left-0 bg-[#1e293b] border border-[#294372] rounded-lg shadow-lg z-50 p-3 flex flex-col gap-2 max-h-60 overflow-y-auto">
              {project.members && project.members.length > 0 ? (
                project.members.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-white text-sm">
                   <div className="w-6 h-6 rounded-full border-2 border-white bg-[#00527d] flex items-center justify-center text-white font-semibold text-xs">
                      {(() => {
                        const name = member.username || member.user_name || "M";
                        if (name.length === 1) return name[0].toUpperCase() + "X"; // fallback second letter
                        return name
                          .replace(/\s+/g, "") // remove spaces
                          .slice(0, 2)         // take first two letters
                          .toUpperCase();
                      })()}
                    </div>
                    <span>{member.username || member.user_name || member.email}</span>
                    <span className="ml-auto text-gray-400 text-xs">{member.role}</span>
                  </div>
                ))
              ) : (
                <span className="text-gray-400 text-sm">No members yet</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Member Modal */}
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
            <div className="flex justify-between gap-2 mt-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-600 rounded-lg text-white hover:bg-gray-700"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Project Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <form
            onSubmit={handleSaveEdit}
            className="bg-[rgba(11,21,32,0.95)] border border-[#294372] rounded-2xl shadow-xl p-8 w-full max-w-lg flex flex-col gap-4"
          >
            <h3 className="text-white text-2xl font-bold mb-2">Edit Project</h3>

            <input
              type="text"
              placeholder="Project Name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#1e293b] text-white border border-[#294372] text-sm focus:outline-none"
              required
            />

            <textarea
              placeholder="Project Description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#1e293b] text-white border border-[#294372] text-sm resize-none"
              rows={6}
              required
            ></textarea>

            <div className="flex gap-2">
              <input
                type="date"
                value={editedDate}
                onChange={(e) => setEditedDate(e.target.value)}
                className="w-1/2 px-4 py-3 rounded-lg bg-[#1e293b] text-white border border-[#294372] text-sm focus:outline-none"
                required
              />
              <input
                type="time"
                value={editedTime}
                onChange={(e) => setEditedTime(e.target.value)}
                className="w-1/2 px-4 py-3 rounded-lg bg-[#1e293b] text-white border border-[#294372] text-sm focus:outline-none"
                required
              />
            </div>

            <div className="flex justify-between gap-4 mt-4">
              <button
                type="button"
                onClick={handleDeleteProject}
                className="px-6 py-3 bg-red-600 rounded-lg text-white hover:bg-red-700"
              >
                Delete
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-3 bg-gray-600 rounded-lg text-white hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
