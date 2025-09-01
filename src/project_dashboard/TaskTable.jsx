import React, { useState } from "react";
import { IoFilter } from "react-icons/io5";

// Example hardcoded data
const initialTasks = [
  {
    id: 1,
    task: "Update Homepage Design",
    status: "In Progress",
    deadline: "2025-08-10T15:00:00",
    assignees: ["A", "B"],
    attachments: "-"
  },
  {
    id: 2,
    task: "SEO Optimization",
    status: "Completed",
    deadline: "2025-08-05T12:00:00",
    assignees: ["C"],
    attachments: "SEO_Report.pdf"
  },
  {
    id: 3,
    task: "Mobile Responsiveness Fix",
    status: "Pending",
    deadline: "2025-08-15T10:00:00",
    assignees: ["D", "A"],
    attachments: "-"
  },
  {
    id: 4,
    task: "Content Update",
    status: "In Progress",
    deadline: "2025-08-12T09:00:00",
    assignees: ["B", "C"],
    attachments: "Content.docx"
  }
];

const statusOptions = ["All", "Pending", "In Progress", "Completed"];
const assigneeOptions = ["All", "A", "B", "C", "D"];

export default function TaskTable() {
  const [tasks, setTasks] = useState(initialTasks);
  const [statusFilter, setStatusFilter] = useState("All");
  const [assigneeFilter, setAssigneeFilter] = useState("All");
  const [sortAsc, setSortAsc] = useState(true);

  const filteredTasks = tasks.filter(task => {
    const statusMatch = statusFilter === "All" || task.status === statusFilter;
    const assigneeMatch = assigneeFilter === "All" || task.assignees.includes(assigneeFilter);
    return statusMatch && assigneeMatch;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortAsc) {
      return new Date(a.deadline) - new Date(b.deadline);
    } else {
      return new Date(b.deadline) - new Date(a.deadline);
    }
  });

  // Dropdown visibility state
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showAssigneeFilter, setShowAssigneeFilter] = useState(false);

  // Close dropdowns on click outside
  React.useEffect(() => {
    function handleClick(e) {
      if (!e.target.closest('.status-filter-dropdown')) setShowStatusFilter(false);
      if (!e.target.closest('.assignee-filter-dropdown')) setShowAssigneeFilter(false);
    }
    if (showStatusFilter || showAssigneeFilter) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showStatusFilter, showAssigneeFilter]);

  return (
  <div className="bg-[rgba(41,62,86,0.3)] rounded-xl shadow-lg w-full border-2 border-[#9FB1EB]">
    <div className="overflow-x-auto">
  <table className="min-w-full text-[#B5C7FF] text-md relative table-fixed">
        <thead>
          <tr className="bg-[rgba(11,21,32,0.3)] text-white">
            <th className="py-3 pl-4 pr-2 text-left font-bold" style={{width: '40%'}}>Task</th>
            <th className="py-3 px-2 text-left font-bold relative" style={{width: '15%'}}>
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
              {/* Status Filter Dropdown */}
              {showStatusFilter && (
                <div className="absolute z-30 mt-2 bg-[#1e293b] border border-[#294372] rounded shadow status-filter-dropdown min-w-[120px]">
                  {statusOptions.map(option => (
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
            <th
              className="py-3 px-2 text-left font-bold cursor-pointer" style={{width: '15%'}}
              onClick={() => setSortAsc(s => !s)}
            >
              Deadline
              <span className="ml-1">{sortAsc ? "▲" : "▼"}</span>
            </th>
            <th className="py-3 px-2 text-left font-bold relative" style={{width: '15%'}}>
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
              {/* Assignee Filter Dropdown */}
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
            <th className="py-3 px-2 text-left font-bold" style={{width: '15%'}}>Attachments</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map(task => (
            <tr key={task.id} className="border-b border-[#294372]">
              <td className="py-2 pl-4 pr-2">{task.task}</td>
              <td className="py-2 px-2">
                <span
                  className={
                    task.status === "Completed"
                      ? "bg-green-700 px-2 py-1 rounded text-xs font-bold"
                      : task.status === "In Progress"
                      ? "bg-blue-700 px-2 py-1 rounded text-xs font-bold"
                      : "bg-yellow-600 px-2 py-1 rounded text-xs font-bold"
                  }
                >
                  {task.status}
                </span>
              </td>
              <td className="py-2 px-2">
                {new Date(task.deadline).toLocaleDateString()}
                <br />
                {(() => {
                  const time = new Date(task.deadline).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                  });
                  return time.replace(/am|pm/i, match => match.toUpperCase());
                })()}
              </td>
              <td className="py-2 px-2">
                <div className="flex -space-x-2">
                  {task.assignees.map((a, idx) => (
                    <img
                      key={a + idx}
                      src={`/src/assets/usericon.png`}
                      alt={a}
                      className="w-6 h-6 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
              </td>
              <td className="py-2 px-2"><span className="font-mono text-sm">{task.attachments}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

}
