import React, { useState, useEffect, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import NexyncLogo from "../assets/nexync.png";

function SignUpModal({ onClose, onSwitchToSignIn }) {
  const [profileImageName, setProfileImageName] = useState("");
  const fileInputRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);

  // Fake API call for skills
  useEffect(() => {
    setSkills([
      { id: 1, name: "React" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "UI/UX" },
      { id: 4, name: "Project Management" },
    ]);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!showSkillsDropdown) return;
    const handleClick = (e) => {
      if (!e.target.closest(".skills-dropdown-parent"))
        setShowSkillsDropdown(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showSkillsDropdown]);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImageName(file.name);
  };

  const toggleSkill = (id) => {
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // ✅ Common input styles
  const inputClass =
    "w-full border rounded-lg border-gray-400 px-4 py-2 placeholder-gray-400 text-gray-600";

  const labelClass =
    "text-xs ml-1 text-[#666666] font-sans select-none";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-10 w-[500px] max-w-full z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 border rounded-2xl border-gray-700 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-2xl font-semibold text-black">
            Register with
          </span>
          <img
            src={NexyncLogo}
            alt="Nexync Logo"
            className="h-8 filter brightness-0"
          />
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* First + Last name */}
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <label className={labelClass}>First name</label>
              <input className={inputClass} />
            </div>
            <div className="w-48 flex flex-col gap-1">
              <label className={labelClass}>Last name</label>
              <input className={inputClass} />
            </div>
          </div>

          {/* Username + Profile image */}
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <label className={labelClass}>Nexync Username</label>
              <input className={inputClass} />
            </div>
              <div className="w-48 flex flex-col gap-1">
              <label className={labelClass}>Profile Image</label>
              <div className="relative">
                <input
                  className={`${inputClass} pr-20 text-xs font-mono cursor-pointer`}
                  placeholder="Choose a file..."
                  value={profileImageName}
                  readOnly
                  onClick={() => fileInputRef.current?.click()}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 border rounded-2xl px-3 bg-gray-200 text-gray-500 text-sm"
                >
                  📎 Attach
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleProfileImageChange}
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Email address</label>
            <input className={inputClass} />
          </div>

          {/* Password + Confirm */}
          <div className="flex gap-4">
            {[["Password", showPassword, setShowPassword],
              ["Confirm Password", showConfirm, setShowConfirm]].map(
              ([label, state, setState], i) => (
                <div key={i} className="flex-1 flex flex-col gap-1">
                  <label className={labelClass}>{label}</label>
                  <div className="relative">
                    <input
                      className={`${inputClass} pr-10`}
                      type={state ? "text" : "password"}
                    />
                    <span
                      onClick={() => setState((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 text-lg"
                    >
                      {state ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-1 skills-dropdown-parent">
            <label className={labelClass}>Project Related Skills</label>
            <div
              className={`${inputClass} flex items-center cursor-pointer bg-white`}
              onClick={() => setShowSkillsDropdown((v) => !v)}
            >
              <span className="flex-1 text-xs font-mono text-gray-600">
                {selectedSkills.length === 0
                  ? <span className="text-gray-400">Select skills...</span>
                  : skills
                      .filter((s) => selectedSkills.includes(String(s.id)))
                      .map((s) => s.name)
                      .join(", ")}
              </span>
              <svg
                className={`w-4 h-4 ml-2 transition-transform ${
                  showSkillsDropdown ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {showSkillsDropdown && (
              <div className="absolute mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-40 overflow-y-auto w-full">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 flex items-center ${
                      selectedSkills.includes(String(skill.id))
                        ? "bg-blue-100 font-semibold text-[#1C89EF]"
                        : "text-[#666666]"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSkill(String(skill.id));
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(String(skill.id))}
                      readOnly
                      className="mr-2"
                    />
                    {skill.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkboxes */}
          <div className="flex items-start gap-2 mt-2">
            <input type="checkbox" className="w-4 h-4 accent-black" />
            <span className="text-xs text-gray-700">
              By creating an account, I agree to our{" "}
              <a href="#" className="underline">
                Terms of use
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
            </span>
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" className="w-4 h-4 accent-black" />
            <span className="text-xs text-gray-700">
              I consent to receive reminders, notifications, and product updates
            </span>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4 mt-4">
            <button
              type="submit"
              className="w-30 bg-[#1C89EF] text-white border rounded-4xl px-6 py-2 font-semibold text-base shadow hover:bg-[#1877c9] transition-colors"
            >
              Sign up
            </button>
            <span className="text-sm text-gray-500">
              Already have an account?{" "}
              <button
                type="button"
                className="underline text-[#1C89EF] font-medium hover:text-[#0056b3] focus:outline-none"
                onClick={() => {
                  onClose && onClose();
                  onSwitchToSignIn && onSwitchToSignIn();
                }}
              >
                Log in
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;
