import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoFilter } from "react-icons/io5";
import api from "../API.jsx"; // your axios instance

const statusOptions = ["Pending", "Ongoing", "Completed"];

export default function TaskTable() {
  const { projectId } = useParams(); // get projectId from URL
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [statusFilter, setStatusFilter] = useState("All");
  const [assigneeFilter, setAssigneeFilter] = useState("All");
  const [sortAsc, setSortAsc] = useState(true);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showAssigneeFilter, setShowAssigneeFilter] = useState(false);

  // Fetch project tasks
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

  // Extract assignee names for filter
  const assigneeOptions = [
    "All",
    ...Array.from(new Set(tasks.map(t => t.assigned_to?.toString()).filter(Boolean)))
  ];

  // Map tasks for table
  const mappedTasks = tasks.map(task => ({
    id: task.task_id,
    task: task.task_name,
    status: task.status,
    deadline: task.due_date,
    assignees: task.assigned_to ? [task.assigned_to.toString()] : [],
    attachments: task.attachments || "-"
  }));

  // Filter tasks
  const filteredTasks = mappedTasks.filter(task => {
    const statusMatch = statusFilter === "All" || task.status === statusFilter;
    const assigneeMatch = assigneeFilter === "All" || task.assignees.includes(assigneeFilter);
    return statusMatch && assigneeMatch;
  });

  // Sort tasks by deadline
  const sortedTasks = [...filteredTasks].sort((a, b) =>
    sortAsc ? new Date(a.deadline) - new Date(b.deadline) : new Date(b.deadline) - new Date(a.deadline)
  );

  // Update task progress
  const updateStatus = async (taskId, newStatus) => {
    try {
      await api.put(`/edit/${projectId}/progress/${taskId}`, { progress: newStatus });
      setTasks(prev => prev.map(t => (t.task_id === taskId ? { ...t, status: newStatus } : t)));
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  // Close dropdowns on click outside
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

  if (loading) return <p className="text-center text-white">Loading tasks...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-[rgba(41,62,86,0.3)] rounded-xl shadow-lg w-full border-2 border-[#9FB1EB]">
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
                        className={`px-4 py-2 cursor-pointer hover:bg-blue-700 ${
                          statusFilter === option ? "font-bold text-blue-400" : ""
                        }`}
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
              <th
                className="py-3 px-2 text-left font-bold cursor-pointer"
                style={{ width: "15%" }}
                onClick={() => setSortAsc(s => !s)}
              >
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
                        className={`px-4 py-2 cursor-pointer hover:bg-blue-700 ${
                          assigneeFilter === option ? "font-bold text-blue-400" : ""
                        }`}
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
            {sortedTasks.map(task => (
              <tr key={task.id} className="border-b border-[#294372]">
                <td className="py-2 pl-4 pr-2">{task.task}</td>
                <td className="py-2 px-2">
                  <select
                    className={`rounded text-xs font-bold px-2 py-1 ${
                      task.status === "Completed"
                        ? "bg-green-700 text-white"
                        : task.status === "Ongoing"
                        ? "bg-blue-700 text-white"
                        : "bg-yellow-600 text-white" // Pending
                    }`}
                    value={task.status}
                    onChange={e => updateStatus(task.id, e.target.value)}
                  >
                    {statusOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </td>
                <td className="py-2 px-2">
                  {new Date(task.deadline).toLocaleDateString()} <br />
                  {new Date(task.deadline).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }).replace(/am|pm/i, m => m.toUpperCase())}
                </td>
                <td className="py-2 px-2">
                  <div className="flex -space-x-2">
                    {task.assignees.map((a, idx) => (
                      <img key={a + idx} src={`/src/assets/usericon.png`} alt={a} className="w-6 h-6 rounded-full border-2 border-white" />
                    ))}
                  </div>
                </td>
                <td className="py-2 px-2">
                  <span className="font-mono text-sm">{task.attachments}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
