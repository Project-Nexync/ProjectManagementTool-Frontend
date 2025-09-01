import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdDeleteForever } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { RiAiGenerate2 } from "react-icons/ri";

export default function CreateTask({ onFinish }) {
  const [tasks, setTasks] = useState([
    { task: "", endDate: "", endTime: "", assignees: [] },
  ]);
  const [loading, setLoading] = useState(false);
  const [aiSuggested, setAiSuggested] = useState(false);

  const projectMembers = [
    { id: 1, name: "Alice", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
    { id: 2, name: "Bob", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
    { id: 3, name: "Charlie", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
  ];

  const handleAddTask = () => {
    if (!aiSuggested) {
      setTasks([
        ...tasks,
        { task: "", endDate: "", endTime: "", assignees: [] },
      ]);
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

  const handleDrop = (e, taskIndex) => {
    const member = JSON.parse(e.dataTransfer.getData("member"));
    setTasks((prev) => {
      const updated = [...prev];
      if (!updated[taskIndex].assignees.find((m) => m.id === member.id)) {
        updated[taskIndex].assignees.push(member);
      }
      return updated;
    });
  };

  const handleDropToTeam = (e, taskIndex) => {
    const member = JSON.parse(e.dataTransfer.getData("member"));
    setTasks((prev) => {
      const updated = [...prev];
      updated[taskIndex].assignees = updated[taskIndex].assignees.filter(
        (m) => m.id !== member.id
      );
      return updated;
    });
  };

  const handleFinish = () => {
    onFinish(tasks);
  };

  const handleAISuggestions = async () => {
    setLoading(true);
    try {
      // Hardcoded AI suggestions for testing
      const hardcodedData = [
        { assignees: [{ id: 1, name: "Alice", avatar: "https://randomuser.me/api/portraits/women/1.jpg" }] },
        { assignees: [{ id: 2, name: "Bob", avatar: "https://randomuser.me/api/portraits/men/2.jpg" }] },
        { assignees: [{ id: 3, name: "Charlie", avatar: "https://randomuser.me/api/portraits/men/3.jpg" }] },
      ];

      setTasks((prevTasks) =>
        prevTasks.map((task, index) => ({
          ...task,
          assignees: hardcodedData[index]?.assignees || [],
        }))
      );
      setAiSuggested(true);
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const isFinishDisabled = tasks.some(
    (task) =>
      !task.task ||
      !task.endDate ||
      !task.endTime ||
      task.assignees.length === 0
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
        {/* Close */}
        <button
          onClick={() => onFinish(null)}
          className="absolute top-4 right-4 text-gray-700 border-2 rounded-2xl border-black hover:text-gray-700 text-sm font-bold"
        >
          <IoClose />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-black">Create tasks</h2>

        {/* Task Inputs */}
        <div
          className="max-h-[200px] overflow-y-auto"
          ref={(el) => {
            if (el) {
              el.scrollTop = el.scrollHeight;
            }
          }}
        >
          {tasks.map((task, index) => (
            <div key={index} className="flex flex-col gap-0 mb-4">
              <div className="flex items-center gap-1">
                <label className="text-sm font-semibold text-gray-600">Task {index + 1}</label>
                {index > 0 && !aiSuggested && (
                  <button
                    className="text-red-800 hover:text-red-900 text-xl"
                    onClick={() => {
                      const updatedTasks = tasks.filter((_, i) => i !== index);
                      setTasks(updatedTasks);
                    }}
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
                  onChange={(e) => {
                    const updatedTasks = [...tasks];
                    updatedTasks[index].task = e.target.value;
                    setTasks(updatedTasks);
                  }}
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

        {/* Add another task */}
        {!aiSuggested && (
          <button
            className="flex items-center gap-2 text-blue-600 font-semibold mt-2 border-2 border-blue-600 rounded-lg px-2 py-0 hover:bg-blue-600 hover:text-white"
            onClick={handleAddTask}
          >
            <span className="text-xl">＋</span> add another task
          </button>
        )}

        {/* Divider */}
        <div className="flex items-center mt-6 mb-2">
          <div className="flex-1 border-t border-gray-700"></div>
          <span className="mx-4 text-gray-500 text-sm">Allocate Team Members</span>
          <div className="flex-1 border-t border-gray-700"></div>
        </div>

        {aiSuggested && (
          <div className="flex flex-col items-center mb-2">
            <div className="bg-gradient-to-r from-[#3A116E] to-[#8926E6] text-white py-3 px-2 rounded-lg font-semibold shadow-lg flex items-center justify-center gap-2 font-mono w-fit max-w-md">
              <RiAiGenerate2 className="text-2xl" /> AI Suggested Task Allocations
            </div>
            <p className="text-red-800 text-sm mt-2 text-center font-mono">
              These task allocations are AI-generated suggestions based on the project requirements and the team members' skills. However, you're free to adjust or change them manually as needed.
            </p>
          </div>
        )}

        {/* ONE Members Table with rows */}
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
                <tr key={index}>
                  <td className="p-2 border-2 border-gray-700 text-center font-semibold text-lg text-gray-700">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td
                    className="p-1 pt-0 border-2 border-gray-700"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDropToTeam(e, index)}
                  >
                    <div className="flex gap-2 flex-wrap">
                      {projectMembers.map((member) => (
                        <img
                          key={member.id}
                          src={member.avatar}
                          alt={member.name}
                          className="w-8 h-8 rounded-full cursor-grab"
                          draggable
                          onDragStart={(e) => handleDragStart(e, member)}
                          title={member.name}
                        />
                      ))}
                    </div>
                  </td>
                  <td
                    className="p-1 border-2 border-gray-700"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    <div className="flex gap-2 flex-wrap">
                      {task.assignees.map((assignee) => (
                        <img
                          key={assignee.id}
                          src={assignee.avatar}
                          alt={assignee.name}
                          className="w-8 h-8 rounded-full cursor-grab"
                          draggable
                          onDragStart={(e) => handleDragStart(e, assignee)}
                          title={assignee.name}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Suggestion */}
        {!aiSuggested && (
          <div className="mt-6">
            <button
              className="w-fit bg-gradient-to-r from-[#3A116E] to-[#8926E6] text-white py-3 px-4 rounded-3xl font-semibold shadow-lg flex items-center justify-center gap-2 font-mono hover:scale-105 transform transition-transform duration-200"
              style={{
                boxShadow: "4px 4px 10px rgba(139, 74, 245, 0.66)",
              }}
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

        {/* Finish */}
        <button
          className={`mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl ${isFinishDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleFinish}
          disabled={isFinishDisabled}
        >
          Finish
        </button>
      </div>
    </div>
  );
}
