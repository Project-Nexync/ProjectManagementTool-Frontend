import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdDeleteForever } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { RiAiGenerate2 } from "react-icons/ri";
import { useParams } from "react-router-dom";
import api from "../API.jsx"; // Axios instance

export default function CreateTask({ onFinish }) {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([
    { task: "", endDate: "", endTime: "", assignees: [], fileAttachment: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [aiSuggested, setAiSuggested] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);

  // Fetch team members
  useEffect(() => {
    if (!projectId) return;
    const fetchTeam = async () => {
      try {
        const res = await api.get(`/project/${projectId}`);
        setTeamMembers(res.data.project.members || []);
      } catch (err) {
        console.error("Failed to fetch team members", err);
      }
    };
    fetchTeam();
  }, [projectId]);

  const handleAddTask = () => {
    if (!aiSuggested) {
      setTasks([...tasks, { task: "", endDate: "", endTime: "", assignees: [], fileAttachment: "" }]);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...tasks];
    updated[index][field] = value;
    setTasks(updated);
  };

  const handleDragStart = (e, member) => {
    e.dataTransfer.setData("member", JSON.stringify(member));
  };

  const handleDropToTask = (e, taskIndex) => {
    const member = JSON.parse(e.dataTransfer.getData("member"));
    setTasks((prev) => {
      const updated = [...prev];
      if (!updated[taskIndex].assignees.find((m) => m.username === member.username)) {
        updated[taskIndex].assignees.push(member);
      }
      return updated;
    });
  };

  const handleRemoveFromTask = (e, taskIndex, member) => {
    e.stopPropagation();
    setTasks((prev) => {
      const updated = [...prev];
      updated[taskIndex].assignees = updated[taskIndex].assignees.filter(
        (m) => m.username !== member.username
      );
      return updated;
    });
  };

  const handleFinish = async () => {
    const payload = {
      tasks: tasks.map((t) => ({
        taskName: t.task,
        status: "Pending",
        fileAttachment: t.fileAttachment || "", // optional
        dueDate: t.endDate,
        assignedMembers: t.assignees.map((a) => a.username),
      })),
    };

    try {
      await api.post(`/project/${projectId}/createTask`, payload);
      onFinish(payload); // optionally close modal or notify parent
    } catch (err) {
      console.error("Failed to save tasks", err);
    }
  };

  const handleAISuggestions = async () => {
    setLoading(true);
    try {
      const hardcodedData = [
        { assignees: [teamMembers[0]] },
        { assignees: [teamMembers[1]] },
        { assignees: [teamMembers[2]] },
      ];
      setTasks((prev) =>
        prev.map((task, idx) => ({
          ...task,
          assignees: hardcodedData[idx]?.assignees || [],
        }))
      );
      setAiSuggested(true);
    } catch (err) {
      console.error("Error fetching AI suggestions", err);
    } finally {
      setLoading(false);
    }
  };

  const isFinishDisabled = tasks.some(
    (task) =>
      !task.task || !task.endDate || !task.endTime || task.assignees.length === 0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={() => onFinish(null)}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-[750px] max-w-full z-10">
        <button
          onClick={() => onFinish(null)}
          className="absolute top-4 right-4 text-gray-700 border-2 rounded-2xl border-black hover:text-gray-700 text-sm font-bold"
        >
          <IoClose />
        </button>

        <h2 className="text-3xl font-bold mb-6 text-black">Create tasks</h2>

        {/* Task Inputs */}
        <div className="max-h-[200px] overflow-y-auto">
          {tasks.map((task, index) => (
            <div key={`task-${index}`} className="flex flex-col gap-0 mb-4">
              <div className="flex items-center gap-1">
                <label className="text-sm font-semibold text-gray-600">Task {index + 1}</label>
                {index > 0 && !aiSuggested && (
                  <button
                    className="text-red-800 hover:text-red-900 text-xl"
                    onClick={() => setTasks(tasks.filter((_, i) => i !== index))}
                  >
                    <MdDeleteForever />
                  </button>
                )}
              </div>
              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  placeholder="Task"
                  className="flex-[2] border rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={task.task}
                  onChange={(e) => handleInputChange(index, "task", e.target.value)}
                  disabled={aiSuggested}
                />
                <DatePicker
                  selected={task.endDate}
                  onChange={(date) => handleInputChange(index, "endDate", date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/mm/yyyy"
                  className="flex-[1] border rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  popperPlacement="bottom"
                  isClearable
                  disabled={aiSuggested}
                />
                <DatePicker
                  selected={task.endTime}
                  onChange={(time) => handleInputChange(index, "endTime", time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  placeholderText="12.00 a.m."
                  className="flex-[1] border rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  popperPlacement="bottom"
                  isClearable
                  disabled={aiSuggested}
                />
              </div>
            </div>
          ))}
        </div>

        {!aiSuggested && (
          <button
            className="flex items-center gap-2 text-blue-600 font-semibold mt-2 border-2 border-blue-600 rounded-lg px-2 py-0 hover:bg-blue-600 hover:text-white"
            onClick={handleAddTask}
          >
            <span className="text-xl">＋</span> add another task
          </button>
        )}

        <div className="flex items-center mt-6 mb-2">
          <div className="flex-1 border-t border-gray-700"></div>
          <span className="mx-4 text-gray-500 text-sm">Allocate Team Members</span>
          <div className="flex-1 border-t border-gray-700"></div>
        </div>

        <div className="border rounded-lg overflow-hidden max-h-[300px] overflow-y-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-700 text-left text-sm">
              <tr>
                <th className="px-2 pt-1 border-2 border-gray-700 border-r-gray-500 w-[80px]">Task No.</th>
                <th className="px-4 p-1 border-2 border-gray-700 border-r-gray-500">Team</th>
                <th className="px-4 p-1 border-2 border-gray-700">Assignees</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={`row-${index}`}>
                  <td className="p-2 border-2 border-gray-700 text-center font-semibold text-lg text-gray-700">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td
                    className="p-1 pt-0 border-2 border-gray-700"
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <div className="flex gap-2 flex-wrap">
                      {teamMembers.map((member) => (
                        <img
                          key={`team-${member.username}`}
                          src={`https://ui-avatars.com/api/?name=${member.username}`}
                          alt={member.username}
                          className="w-8 h-8 rounded-full cursor-grab"
                          draggable
                          onDragStart={(e) => handleDragStart(e, member)}
                          title={member.username}
                        />
                      ))}
                    </div>
                  </td>
                  <td
                    className="p-1 border-2 border-gray-700"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDropToTask(e, index)}
                  >
                    <div className="flex gap-2 flex-wrap">
                      {task.assignees.map((assignee) => (
                        <img
                          key={`assigned-${assignee.username}-${index}`}
                          src={`https://ui-avatars.com/api/?name=${assignee.username}`}
                          alt={assignee.username}
                          className="w-8 h-8 rounded-full cursor-grab"
                          draggable
                          onDragStart={(e) => handleDragStart(e, assignee)}
                          onClick={(e) => handleRemoveFromTask(e, index, assignee)}
                          title={assignee.username}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!aiSuggested && (
          <div className="mt-6">
            <button
              className="w-fit bg-gradient-to-r from-[#3A116E] to-[#8926E6] text-white py-3 px-4 rounded-3xl font-semibold shadow-lg flex items-center justify-center gap-2 font-mono hover:scale-105 transform transition-transform duration-200"
              style={{ boxShadow: "4px 4px 10px rgba(139, 74, 245, 0.66)" }}
              onClick={handleAISuggestions}
            >
              <RiAiGenerate2 className="text-2xl" /> Get AI task allocation suggestions
            </button>
          </div>
        )}

        {loading && (
          <div className="mt-6 text-center text-purple-700 font-semibold">
            Loading AI suggestions...
          </div>
        )}

        <button
          className={`mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl ${
            isFinishDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleFinish}
          disabled={isFinishDisabled}
        >
          Finish
        </button>
      </div>
    </div>
  );
}
