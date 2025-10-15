import React, { useState, useEffect, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../api.jsx";
// import NexyncLogo from "../assets/nexync.png"; // optional

function SignUpModal({ onClose, onSwitchToSignIn }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [notification, setNotification] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [profileImageName, setProfileImageName] = useState("");
  const fileInputRef = useRef(null);

  // const [skills, setSkills] = useState([]); // Keep skills commented
  // const [selectedSkills, setSelectedSkills] = useState([]);
  // const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImageName(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      alert("You must agree to the Terms of Use and Privacy Policy.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const payload = {
        firstname: firstName,
        lastname: lastName,
        username,
        email,
        password,
        notification,
        profileImage: profileImageName, // profile image name sent
        // skills: selectedSkills, // still commented
      };

     const res = await api.post("/auth/register", payload);
      console.log(res.data);
      alert("Registered successfully");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  // Input classes
  const inputClass =
    "w-full border rounded-lg border-gray-400 px-4 py-2 placeholder-gray-400 text-gray-600";
  const labelClass = "text-xs ml-1 text-[#666666] font-sans select-none";

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
          <span className="text-2xl font-semibold text-black">Register</span>
          {/* <img src={NexyncLogo} alt="Nexync Logo" className="h-8 filter brightness-0" /> */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First + Last name */}
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <label className={labelClass}>First name</label>
              <input
                className={inputClass}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="w-48 flex flex-col gap-1">
              <label className={labelClass}>Last name</label>
              <input
                className={inputClass}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Username + Profile image */}
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <label className={labelClass}>Username</label>
              <input
                className={inputClass}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
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
            <input
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>

          {/* Password + Confirm */}
          <div className="flex gap-4">
            {[
              ["Password", showPassword, setShowPassword, password, setPassword],
              ["Confirm Password", showConfirm, setShowConfirm, confirmPassword, setConfirmPassword],
            ].map(([label, state, setState, value, setValue], i) => (
              <div key={i} className="flex-1 flex flex-col gap-1 relative">
                <label className={labelClass}>{label}</label>
                <input
                  type={state ? "text" : "password"}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className={`${inputClass} pr-10`}
                  required
                />
                <span
                  onClick={() => setState((v) => !v)}
                  className="absolute right-3 top-[55%] cursor-pointer text-gray-500 text-lg"
                >
                  {state ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            ))}
          </div>

          {/* Checkboxes */}
          <div className="flex items-start gap-2 mt-2">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 accent-black"
            />
            <span className="text-xs text-gray-700">
              By creating an account, I agree to our{" "}
              <a href="#" className="underline">Terms of use</a> and{" "}
              <a href="#" className="underline">Privacy Policy</a>
            </span>
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={notification}
              onChange={(e) => setNotification(e.target.checked)}
              className="w-4 h-4 accent-black"
            />
            <span className="text-xs text-gray-700">
              I consent to receive reminders, notification, and product updates
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#1C89EF] text-white py-2 rounded-lg mt-4 hover:bg-[#1877c9] transition-colors"
          >
            Sign Up
          </button>

          {/* Switch to login */}
          <div className="text-sm text-gray-500 mt-2">
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;
