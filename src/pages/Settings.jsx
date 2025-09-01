import React, { useState, useEffect } from "react";
import DashboardNav from "../components/DashboardNav";
import Logo from "../dashboard/Logo";
import DateTimeDisplay from "../dashboard/DateTimeDisplay";
import { FaPen, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import backgroundImage from "../assets/bg-screen.png";
import nexyncLogo from "../assets/nexync.png";

const skillsOptions = [
  { id: 1, name: "Web Development" },
  { id: 2, name: "Documentation" },
  { id: 3, name: "Time Management" },
  { id: 4, name: "UI/UX Design" },
  { id: 5, name: "Project Management" },
  { id: 6, name: "Data Analysis" },
  { id: 7, name: "Machine Learning" },
  { id: 8, name: "Digital Marketing" },
];

export default function Settings() {
  const [firstName, setFirstName] = useState("Steve");
  const [lastName, setLastName] = useState("Smith");
  const [username, setUsername] = useState("@steveSmith99");
  const [email, setEmail] = useState("stevesmith99@gmail.com");
  const [password, setPassword] = useState("************");
  const [skills, setSkills] = useState(
    "Web development, Documentation, Time Management, UI/UX Design"
  );
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const toggleSkill = (id) => {
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((skillId) => skillId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (!showSkillsDropdown) return;
    const handleClickOutside = (e) => {
      if (!e.target.closest(".skills-dropdown-parent")) {
        setShowSkillsDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSkillsDropdown]);

  return (
    <div
      className="min-h-screen w-full bg-[#0a1834]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-row items-center px-8 pt-4">
        <Logo />
        <div className="ml-8 flex-1">
          <DashboardNav />
        </div>
      </div>
      <div className="flex flex-row pl-2 pr-8 mt-6 gap-8">
        {/* Sidebar */}
        <div className="w-[300px] bg-[rgba(62,152,255,0.3)] rounded-lg p-2 pr-4 flex flex-col gap-4 min-h-[600px] shadow-lg">
          <div className="pl-2">
            <DateTimeDisplay />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <img src={nexyncLogo} alt="Nexync Logo" className="w-[280px] mb-2" />
            <p className="text-blue-100 text-sm leading-relaxed text-right" style={{ fontFamily: 'HelveticaNeue', fontWeight: '400', fontSize: '14px', lineHeight: '25px' }}>
              Nexync is a modern, AI-powered project and workload management
              platform designed to streamline collaboration, improve team
              efficiency, and reduce burnout. It brings together intelligent task
              allocation, real-time workload heatmaps, seamless Google Calendar
              integration, and smart dashboards, all in one intuitive interface.
              <br />
              <br />
              Built for teams of all sizes, from startups and student groups to
              enterprise squads. Nexync adapts to your workflow and scales with
              your goals. Whether you're tracking individual contributions or
              managing complex projects across departments, Nexync keeps everyone
              aligned, focused, and productive.
            </p>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-transparent rounded-2xl pt-2 min-h-[600px]">
          <h1 className="text-4xl font-bold text-white mb-1">Settings</h1>
          <span className="text-blue-200 mb-2 text-lg">
            Manage your preferences and customize your experience. Adjust
            notifications, privacy settings, and more.
          </span>
          {/* Edit Personal Details Button */}
          {!editMode && (
            <button
              className="flex w-fit items-center gap-2 bg-[#0077FF] hover:bg-blue-800 text-[#131313] font-semibold px-1 -py-2 rounded-md mb-4 text-sm shadow transition border border-[#0077FF] hover:border-blue-900"
              onClick={() => setEditMode(true)}
              type="button"
            >
              <FaPen className="w-4 h-4 text-[#131313]" />
              Edit Personal Details
            </button>
          )}
          <form className="grid grid-cols-2 gap-x-8 gap-y-6 max-w-3xl">
            <div className="flex flex-col">
              <label className="text-white font-semibold mb-2">First Name</label>
              <input
                className="bg-transparent border border-blue-400 rounded-full px-6 py-2 text-[#8D8D8D] text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                readOnly={!editMode}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white font-semibold mb-2">Last Name</label>
              <input
                className="bg-transparent border border-blue-400 rounded-full px-6 py-2 text-[#8D8D8D] text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                readOnly={!editMode}
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-white font-semibold mb-2">
                Nexync Username
              </label>
              <input
                className="w-[40%] bg-transparent border border-blue-400 rounded-full px-6 py-2 text-[#8D8D8D] text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                readOnly
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-white font-semibold mb-2">Email</label>
              <input
                className="w-[40%] bg-transparent border border-blue-400 rounded-full px-6 py-2 text-[#8D8D8D] text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                readOnly
              />
            </div>
            <div className="flex flex-row items-end col-span-2 relative gap-4">
              <div className="flex flex-col">
                <label className="text-white font-semibold mb-2">
                  Current Password
                </label>
                <input
                  className="w-[100%] bg-transparent border border-blue-400 rounded-full px-6 py-2 text-[#8D8D8D] text-lg pr-16 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  readOnly={!editMode}
                />
              </div>
              {editMode && (
                <button
                  type="button"
                  className="bg-[#E32838] text-[#131313] px-4 py-0.5 rounded-lg text-sm font-bold hover:bg-red-700 transition"
                  onClick={() => setShowPasswordFields(!showPasswordFields)}
                >
                  {showPasswordFields
                    ? "Cancel Password Change"
                    : "Change Password"}
                </button>
              )}
            </div>
            {editMode && showPasswordFields && (
              <div className="flex gap-4">
                {["New Password", "Confirm New Password"].map((label, i) => (
                  <div key={i} className="flex-1 flex flex-col gap-1">
                    <label className="text-white font-semibold mb-2">{label}</label>
                    <div className="relative">
                      <input
                        className="bg-transparent border border-blue-400 rounded-full px-6 py-2 text-[#8D8D8D] text-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={
                          i === 0 ? newPassword : confirmPassword
                        }
                        onChange={(e) =>
                          i === 0
                            ? setNewPassword(e.target.value)
                            : setConfirmPassword(e.target.value)
                        }
                        type={
                          i === 0
                            ? showPassword
                              ? "text"
                              : "password"
                            : showConfirmPassword
                            ? "text"
                            : "password"
                        }
                      />
                      <span
                        onClick={() =>
                          i === 0
                            ? setShowPassword(!showPassword)
                            : setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 text-lg"
                      >
                        {i === 0 ? (
                          showPassword ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )
                        ) : showConfirmPassword ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col col-span-2 relative skills-dropdown-parent">
              <label className="text-white font-semibold mb-2">
                Project Related Skills
              </label>
              <div
                className={`bg-transparent border border-blue-400 rounded-full px-6 py-2 text-[#8D8D8D] text-lg ${
                  editMode ? "cursor-pointer" : "cursor-default"
                } ${showSkillsDropdown && editMode ? "ring-2 ring-blue-400" : ""}`}
                onClick={() => {
                  if (editMode) setShowSkillsDropdown(!showSkillsDropdown);
                }}
              >
                {selectedSkills.length === 0 ? (
                  <span className="text-gray-400">No skills selected</span>
                ) : (
                  skillsOptions
                    .filter((skill) => selectedSkills.includes(skill.id))
                    .map((skill) => skill.name)
                    .join(", ")
                )}
              </div>
              {showSkillsDropdown && editMode && (
                <div className="absolute mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-40 overflow-y-auto w-full">
                  {skillsOptions.map((skill) => (
                    <div
                      key={skill.id}
                      className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 flex items-center ${
                        selectedSkills.includes(skill.id)
                          ? "bg-blue-100 font-semibold text-[#1C89EF]"
                          : "text-[#666666]"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSkill(skill.id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSkills.includes(skill.id)}
                        readOnly
                        className="mr-2"
                      />
                      {skill.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center col-span-2 mt-2">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="w-5 h-5 accent-blue-500 mr-3"
                id="emailNotifications"
                disabled={!editMode}
              />
              <div className="flex flex-col">
              <label
                htmlFor="emailNotifications"
                className="text-white font-semibold mb-1"
              >
                Send E-mail Notifications
              </label>
              <span className="text-gray-300 text-xs">
                Enable this option to receive automatic e-mail updates about
                important project activities, status changes, or assigned tasks
              </span>
              </div>
            </div>
            {/* Save Changes button only in edit mode */}
            {editMode && (
              <div className="flex gap-4 col-span-2 mt-4">
                <button
                  type="submit"
                  className={`bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded-full text-lg shadow-md transition ${
                    showPasswordFields && newPassword !== confirmPassword
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (showPasswordFields && newPassword === confirmPassword) {
                      setPassword(newPassword); // Update current password
                      setNewPassword("");
                      setConfirmPassword("");
                      setShowPasswordFields(false); // End password change session
                    }
                    setEditMode(false); // Exit edit mode
                  }}
                  disabled={showPasswordFields && newPassword !== confirmPassword}
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
        {/* Profile Photo Section */}
        <div className="flex flex-col items-center justify-center min-w-[340px] max-w-[340px] bg-transparent">
          <div className="relative">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Profile"
              className="w-64 h-64 rounded-full border-4 border-[#0077FF] object-cover"
            />
          </div>
          <span className="text-white text-xl font-semibold mt-4">
            @steveSmith99
          </span>
          <div className="flex gap-4 mt-4">
            <button
              className="flex w-fit items-center gap-2 bg-[#0077FF] hover:bg-blue-800 text-[#131313] font-semibold px-2 py-0 rounded-md text-sm shadow transition border border-[#0077FF] hover:border-blue-900"
              onClick={() => document.getElementById("photoInput").click()}
            >
              <FaPen className="w-4 h-4 text-[#131313]" />
              Edit Photo
            </button>
            <input
              id="photoInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  // Handle photo upload logic here
                  console.log("Photo selected:", file.name);
                }
              }}
            />
            <button
              className="flex w-fit items-center gap-2 bg-[#C00C33] hover:bg-red-700 text-[#131313] font-semibold px-2 py-0 rounded-md text-sm shadow transition border border-red-600 hover:border-red-800"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete the photo?")) {
                  // Handle photo deletion logic here
                  console.log("Photo deleted");
                }
              }}
            >
              <MdDelete className="w-4 h-4 text-[#131313]" />
              Delete Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
