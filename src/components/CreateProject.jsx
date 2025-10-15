import React, { useState } from "react";
import NexyncLogo from "../assets/nexync.png";
import { IoClose } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api.jsx"; // axios instance

const inputClass =
  "w-full border rounded-lg border-gray-400 px-4 py-2 placeholder-gray-400 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#2ecc40]";
const labelClass =
  "text-sm ml-1 text-[#666666] font-sans select-none";

const roles = [
  { value: "member", label: "member" },
  { value: "manager", label: "manager" },
  { value: "visitor", label: "client (view-only)" }, // changed value to visitor
];

// helper to format as YYYY-MM-DD HH:mm:ss
const formatDateTime = (dateObj) => {
  if (!dateObj) return null;
  const pad = (n) => (n < 10 ? "0" + n : n);

  const year = dateObj.getFullYear();
  const month = pad(dateObj.getMonth() + 1);
  const day = pad(dateObj.getDate());
  const hours = pad(dateObj.getHours());
  const minutes = pad(dateObj.getMinutes());
  const seconds = pad(dateObj.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

function CreateProject({ open, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState([{ email: "", role: "member" }]);
  const [startDate, setStartDate] = useState(null);
  const [deadlineDate, setDeadlineDate] = useState(null);
  const [deadlineTime, setDeadlineTime] = useState(null);

  if (!open) return null;

  const handleTeamChange = (idx, field, value) => {
    setTeam((prev) =>
      prev.map((t, i) => (i === idx ? { ...t, [field]: value } : t))
    );
  };

  const addTeamMember = () => {
    setTeam((prev) => [...prev, { email: "", role: "member" }]);
  };

  const removeTeamMember = (idx) => {
    setTeam((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // combine deadline date + time
    let endDateTime = null;
    if (deadlineDate && deadlineTime) {
      endDateTime = new Date(
        deadlineDate.getFullYear(),
        deadlineDate.getMonth(),
        deadlineDate.getDate(),
        deadlineTime.getHours(),
        deadlineTime.getMinutes()
      );
    }

    const payload = {
      name,
      description,
      startdate: startDate ? formatDateTime(startDate).split(" ")[0] : null, // only date part
      endate: endDateTime ? formatDateTime(endDateTime) : null, // full datetime
      assignee: team.filter((m) => m.email.trim() !== ""), // remove empty
    };

    try {
      const res = await api.post("/project/addproject", payload);
      console.log("Project created:", res.data);
      onClose();
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-10 w-[540px] max-w-full z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 border-2 rounded-2xl border-black hover:text-gray-700 text-sm font-bold"
        >
          <IoClose />
        </button>
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-2xl font-semibold text-black">Create a new</span>
          <img
            src={NexyncLogo}
            alt="Nexync Logo"
            className="h-8 filter brightness-0"
          />
          <span className="text-2xl font-semibold text-black">project</span>
        </div>
        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Project Name</label>
            <input
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Project name"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Description</label>
            <input
              className={inputClass}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Project description"
            />
          </div>
          {/* Start Date */}
          <div className="flex flex-col gap-1 w-[220px]">
            <label className={labelClass}>Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              className={inputClass}
              popperPlacement="bottom"
              isClearable
              minDate={new Date()}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <label className={labelClass}>Final Deadline Date</label>
              <DatePicker
                selected={deadlineDate}
                onChange={(date) => setDeadlineDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/yyyy"
                className={inputClass}
                popperPlacement="bottom"
                isClearable
                minDate={startDate || new Date()}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className={labelClass}>Final Deadline Time</label>
              <DatePicker
                selected={deadlineTime}
                onChange={(date) => setDeadlineTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                placeholderText="12.00 a.m."
                className={inputClass}
                popperPlacement="bottom"
                isClearable
              />
            </div>
          </div>
          {/* Team Section */}
          <div className="flex items-center my-2">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm">Add Project Team</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <div
            className={
              team.length > 4
                ? "max-h-56 overflow-y-scroll pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
                : ""
            }
            style={{ scrollbarGutter: "stable" }}
            ref={(el) => {
              if (el && team.length > 5) {
                el.scrollTop = el.scrollHeight;
              }
            }}
          >
            {team.map((member, idx) => (
              <div key={idx} className="flex gap-2 items-center mb-1">
                <input
                  className="flex-1 border rounded-lg border-gray-400 px-4 py-2 placeholder-gray-400 text-gray-600"
                  placeholder={`email address ${idx + 1}`}
                  value={member.email}
                  onChange={(e) =>
                    handleTeamChange(idx, "email", e.target.value)
                  }
                />
                <select
                  className="border rounded-lg border-gray-400 px-2 py-2 text-gray-600"
                  value={member.role}
                  onChange={(e) =>
                    handleTeamChange(idx, "role", e.target.value)
                  }
                >
                  {roles.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="text-green-600 text-xl px-1"
                  onClick={addTeamMember}
                  tabIndex={-1}
                >
                  +
                </button>
                <button
                  type="button"
                  className="text-red-500 text-xl px-1"
                  onClick={() => removeTeamMember(idx)}
                  tabIndex={-1}
                  disabled={team.length <= 1}
                >
                  −
                </button>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-1/3 ml-0 block bg-[#2ecc40] text-white border rounded-lg px-2 py-1 font-semibold text-lg shadow hover:bg-[#27ae38] transition-colors mt-4"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;
