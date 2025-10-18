import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoFilter } from "react-icons/io5";
import api from "../api.jsx";
import axios from "axios";

const statusOptions = ["Pending", "Ongoing", "Completed"];

export default function TaskTable() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [statusFilter, setStatusFilter] = useState("All");
  const [assigneeFilter, setAssigneeFilter] = useState("All");
  const [sortAsc, setSortAsc] = useState(true);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showAssigneeFilter, setShowAssigneeFilter] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editedTask, setEditedTask] = useState({ id: null, name: "", deadline: "" });

  const [successMessage, setSuccessMessage] = useState("");

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get(`/project/${projectId}`);
        setTasks(res.data.project.tasks || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [projectId]);

  const assigneeOptions = [
    "All",
    ...Array.from(new Set(tasks.map(t => t.assigned_to?.toString()).filter(Boolean)))
  ];

  const mappedTasks = tasks.map(task => ({
    id: task.task_id,
    task: task.task_name,
    status: task.status,
    deadline: task.due_date,
    assignees: task.assigned_to ? [task.assigned_to.toString()] : [],
    attachments: task.attachments || []
  }));

  const filteredTasks = mappedTasks.filter(task => {
    const statusMatch = statusFilter === "All" || task.status === statusFilter;
    const assigneeMatch = assigneeFilter === "All" || task.assignees.includes(assigneeFilter);
    return statusMatch && assigneeMatch;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) =>
    sortAsc ? new Date(a.deadline) - new Date(b.deadline) : new Date(b.deadline) - new Date(a.deadline)
  );

  // Update task status
  const updateStatus = async (taskId, newStatus) => {
    try {
      await api.put(`/edit/${projectId}/progress/${taskId}`, { progress: newStatus });
      setTasks(prev =>
        prev.map(t => t.task_id === taskId ? { ...t, status: newStatus } : t)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  // Upload file for a task
  const handleFileUpload = async (event, taskId) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const { data } = await api.post("/upload/file/generate-url", {
        fileName: file.name,
        fileType: file.type,
        taskId: taskId,
      });

      const uploadUrl = data.url;
      if (!uploadUrl) {
        alert("Upload URL not received from server!");
        return;
      }

      await axios.put(uploadUrl, file, {
        headers: { "Content-Type": file.type },
      });

      alert("File uploaded successfully!");
    } catch (error) {
      console.error("File upload failed:", error);
      alert("File upload failed. Check console for details.");
    }
  };

  // View file
  const viewFile = async (fileId) => {
    try {
      const { data } = await api.get(`/upload/file/${fileId}`);
      if (data.url) {
        window.open(data.url, "_blank");
      } else {
        alert("File URL not found");
      }
    } catch (err) {
      console.error("Failed to open file:", err);
      alert("Failed to open file.");
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (!e.target.closest(".status-filter-dropdown")) setShowStatusFilter(false);
      if (!e.target.closest(".assignee-filter-dropdown")) setShowAssigneeFilter(false);
    }
    if (showStatusFilter || showAssigneeFilter) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showStatusFilter, showAssigneeFilter]);

  // Handle saving edited task
  const handleSaveTask = async () => {
    try {
      await api.put(`/edit/${projectId}/edittaskdes/${editedTask.id}`, {
        task_name: editedTask.name,
      });

      await api.put(`/edit/${projectId}/duedate/${editedTask.id}`, {
        duedate: editedTask.deadline.replace("T", " "),
      });

      setTasks(prev => prev.map(t => t.task_id === editedTask.id ? { ...t, task_name: editedTask.name } : t ) );
      setShowEditModal(false);

      // Show success message
      setSuccessMessage("Task updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);

    } catch (err) {
      console.error(err);
      alert("Failed to update task");
    }
  };

  // Handle delete task
  const handleDeleteTask = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await api.put(`/edit/${projectId}/deletetask/${editedTask.id}`);
      setTasks(prev => prev.filter(t => t.task_id !== editedTask.id));
      setShowEditModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  };

  if (loading) return <p className="text-center text-white">Loading tasks...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-[rgba(41,62,86,0.3)] rounded-xl shadow-lg w-full border-2 border-[#9FB1EB]">
      
      {/* Success message */}
      {successMessage && (
        <div className="text-green-400 font-bold text-center py-2">
          {successMessage}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-[#B5C7FF] text-md table-fixed">
          <thead>
            <tr className="bg-[rgba(11,21,32,0.3)] text-white">
              <th className="py-3 pl-4 pr-2 text-left font-bold" style={{ width: "40%" }}>Task</th>
              <th className="py-3 px-2 text-left font-bold relative" style={{ width: "15%" }}>
                <div className="flex items-center gap-1">
                  Status
                  <button
                    className="ml-1 text-m hover:text-blue-400"
                    onClick={e => {
                      e.stopPropagation();
                      setShowStatusFilter(s => !s);
                      setShowAssigneeFilter(false);
                    }}
                  >
                    <IoFilter />
                  </button>
                </div>
                {showStatusFilter && (
                  <div className="absolute z-30 mt-2 bg-[#1e293b] border border-[#294372] rounded shadow status-filter-dropdown min-w-[120px]">
                    {["All", ...statusOptions].map(option => (
                      <div
                        key={option}
                        className={`px-4 py-2 cursor-pointer hover:bg-blue-700 ${statusFilter === option ? "font-bold text-blue-400" : ""}`}
                        onClick={() => {
                          setStatusFilter(option);
                          setShowStatusFilter(false);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </th>
              <th className="py-3 px-2 text-left font-bold cursor-pointer" style={{ width: "15%" }} onClick={() => setSortAsc(s => !s)}>
                Deadline <span className="ml-1">{sortAsc ? "▲" : "▼"}</span>
              </th>
              <th className="py-3 px-2 text-left font-bold relative" style={{ width: "15%" }}>
                <div className="flex items-center gap-1">
                  Assignees
                  <button
                    className="ml-1 text-m hover:text-blue-400"
                    onClick={e => {
                      e.stopPropagation();
                      setShowAssigneeFilter(s => !s);
                      setShowStatusFilter(false);
                    }}
                  >
                    <IoFilter />
                  </button>
                </div>
                {showAssigneeFilter && (
                  <div className="absolute z-30 mt-2 bg-[#1e293b] border border-[#294372] rounded shadow assignee-filter-dropdown min-w-[120px]">
                    {assigneeOptions.map(option => (
                      <div
                        key={option}
                        className={`px-4 py-2 cursor-pointer hover:bg-blue-700 ${assigneeFilter === option ? "font-bold text-blue-400" : ""}`}
                        onClick={() => {
                          setAssigneeFilter(option);
                          setShowAssigneeFilter(false);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </th>
              <th className="py-3 px-2 text-left font-bold" style={{ width: "15%" }}>Attachments</th>
            </tr>
          </thead>

          <tbody>
            {sortedTasks.map(({ id, task: taskName, assignees, attachments, deadline, status }) => (
              <tr key={id} className="border-b border-[#294372]">
                <td className="py-2 pl-4 pr-2 flex items-center gap-2 text-[#B5C7FF]">
                  <span>{taskName}</span>
                  <button
                    className="focus:outline-none cursor-pointer hover:text-blue-400"
                    title="Edit Task"
                    onClick={() => {
                      setEditedTask({
                        id,
                        name: taskName,
                        deadline: deadline ? new Date(deadline).toISOString().slice(0,16) : ""
                      });
                      setShowEditModal(true);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                </td>
                <td className="py-2 px-2">
                  <select
                    className={`rounded text-xs font-bold px-2 py-1 ${status === "Completed" ? "bg-green-700 text-white" : status === "Ongoing" ? "bg-blue-700 text-white" : "bg-yellow-600 text-white"}`}
                    value={status}
                    onChange={e => updateStatus(id, e.target.value)}
                  >
                    {statusOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </td>
                <td className="py-2 px-2">
                  {deadline ? (
                    <div>
                      <div>{new Date(deadline).toISOString().split("T")[0]}</div> 
                      <div>
                        {(() => {
                          const [hourStr, minute] = new Date(deadline).toISOString().split("T")[1].slice(0,5).split(":");
                          let hour = parseInt(hourStr, 10);
                          const ampm = hour >= 12 ? "PM" : "AM";
                          hour = hour % 12 || 12; 
                          return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
                        })()}
                      </div>
                    </div>
                  ) : "-"}
                </td>
                <td className="py-2 px-2">
                  <div className="flex -space-x-2">
                    {assignees.map((a, idx) => (
                      <div
                        key={a + idx}
                        className="w-6 h-6 rounded-full border-2 border-white bg-[#00527d] flex items-center justify-center text-white font-semibold text-xs"
                        title={a} 
                      >
                        {(() => {
                          if (!a) return "M"; 
                          const name = a.trim();
                          if (name.length === 1) return name[0].toUpperCase() + "X";
                          return name
                            .replace(/\s+/g, "")
                            .slice(0, 2)
                            .toUpperCase();
                        })()}
                      </div>
                    ))}
                  </div>
                </td>

                <td className="py-2 px-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {attachments.length > 0
                      ? attachments.map((file, idx) => (
                          <span
                            key={idx}
                            onClick={() => viewFile(file.file_id)}
                            className="text-white underline text-sm cursor-pointer"
                          >
                            {file.file_name}
                          </span>
                        ))
                      : <span className="text-gray-400 text-sm">No files</span>
                    }

                    <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 w-6 h-6 flex items-center justify-center text-sm rounded">
                      +
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, id)}
                      />
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Task Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-[rgba(11,21,32,0.95)] border border-[#294372] rounded-2xl shadow-xl p-8 w-full max-w-lg flex flex-col gap-4">
            <h3 className="text-white text-2xl font-bold mb-2">Edit Task</h3>

            <input
              type="text"
              placeholder="Task Name"
              value={editedTask.name}
              onChange={(e) => setEditedTask(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg bg-[#1e293b] text-white border border-[#294372] text-sm focus:outline-none"
            />

            <input
              type="datetime-local"
              value={editedTask.deadline}
              onChange={(e) => setEditedTask(prev => ({ ...prev, deadline: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg bg-[#1e293b] text-white border border-[#294372] text-sm focus:outline-none"
            />

            <div className="flex justify-between gap-4 mt-4">
              <button
                onClick={handleDeleteTask}
                className="px-6 py-3 bg-red-600 rounded-lg text-white hover:bg-red-700"
              >
                Delete
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-3 bg-gray-600 rounded-lg text-white hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveTask}
                  className="px-6 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
