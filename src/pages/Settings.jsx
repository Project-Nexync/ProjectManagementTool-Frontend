import React, { useState, useEffect } from "react";
import DashboardNav from "../components/DashboardNav";
import Logo from "../dashboard/Logo";
import { FaPen, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

import backgroundImage from "../assets/bg-screen.png";
import nexyncLogo from "../assets/nexync.png";
import api from "../API.jsx"; // API helper

export default function Settings() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("************");
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [profilePic, setProfilePic] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //Fetch user profile and profile picture
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/project/user/profile");
        if (res.data && res.data.success) {
          const data = res.data.data;
          setFirstName(data.firstname);
          setLastName(data.lastname);
          setUsername(data.username);
          setEmail(data.email);
          setPassword("************");
          setEmailNotifications(data.notification);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    const fetchProfilePic = async () => {
      try {
        const res = await api.get("/upload/profile-pic/view");
        if (res.data && res.data.url) {
          setProfilePic(res.data.url);
        }
      } catch (err) {
        console.error("Error fetching profile picture:", err);
      }
    };

    fetchProfile();
    fetchProfilePic();
  }, []);

  //Handle profile picture upload
  const handleProfilePicUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      // 1️⃣ Ask backend for signed URL
      const { data } = await api.post("/upload/profile-pic/generate-url", {
        fileName: file.name,
        fileType: file.type,
      });

      const uploadUrl = data.url;
      if (!uploadUrl) {
        alert("Upload URL not received from server!");
        return;
      }

      // 2️⃣ Upload image directly to S3
      await axios.put(uploadUrl, file, {
        headers: { "Content-Type": file.type },
      });

      // 3️⃣ Get the public image URL (remove ?signature)
      const imageUrl = uploadUrl.split("?")[0];

      // 4️⃣ Update UI instantly
      setProfilePic(imageUrl);
      alert(" Profile picture updated successfully!");
    } catch (error) {
      console.error("Profile picture upload failed:", error);
      alert(" Upload failed. Check console for details.");
    }
  };

  // Handle profile picture delete
  const handleDeleteProfilePic = async () => {
    if (!window.confirm("Are you sure you want to delete your profile picture?"))
      return;

    try {
      const res = await api.delete("/upload/profile-pic/delete");
      if (res.data.success) {
        setProfilePic(""); // remove from UI
        alert("🗑️ Profile picture deleted successfully!");
      } else {
        alert("Failed to delete profile picture!");
      }
    } catch (err) {
      console.error("Error deleting profile picture:", err);
      alert("Error deleting profile picture!");
    }
  };

  // Handle profile updates
  const handleProfileSave = async (e) => {
    e.preventDefault();
    const updateData = {};

    if (firstName) updateData.firstname = firstName;
    if (lastName) updateData.lastname = lastName;
    if (email) updateData.email = email;
    if (username) updateData.username = username;
    if (newPassword && newPassword === confirmPassword)
      updateData.password = newPassword;
    updateData.notification = emailNotifications;

    try {
      const res = await api.put("/project/user/profileupdate", updateData);
      if (res.data && res.data.success) {
        alert("Profile updated successfully!");
        setPassword(newPassword ? newPassword : "************");
        setNewPassword("");
        setConfirmPassword("");
        setEditMode(false);
      } else {
        alert(res.data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Error updating profile");
    }
  };

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
        {/* Main Settings Content */}
        <div className="flex-1 flex flex-col bg-transparent rounded-2xl pt-2 min-h-[600px] ml-8">
          <h1 className="text-4xl font-bold text-white mb-1">Settings</h1>
          <span className="text-blue-200 mb-2 text-lg">
            Manage your preferences and customize your experience.
          </span>

          {/* Edit Button */}
          {!editMode && (
            <button
              className="flex w-fit items-center gap-2 bg-[#0077FF] hover:bg-blue-800 text-[#131313] font-semibold px-2 py-1 rounded-md mb-4 text-sm shadow transition border border-[#0077FF]"
              onClick={() => setEditMode(true)}
              type="button"
            >
              <FaPen className="w-4 h-4 text-[#131313]" />
              Edit Personal Details
            </button>
          )}

          <form
            className="grid grid-cols-2 gap-x-8 gap-y-6 max-w-3xl"
            onSubmit={handleProfileSave}
          >
            {/* First Name */}
            <div className="flex flex-col">
              <label className="text-white font-semibold mb-2">
                First Name
              </label>
              <input
                className="bg-transparent border border-blue-400 rounded-full px-6 py-2 text-[#8D8D8D] text-lg focus:ring-2 focus:ring-blue-400"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                readOnly={!editMode}
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label className="text-white font-semibold mb-2">Last Name</label>
              <input
                className="bg-transparent border border-blue-400 rounded-full px-6 py-2 text-[#8D8D8D] text-lg focus:ring-2 focus:ring-blue-400"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                readOnly={!editMode}
              />
            </div>

            {/* Username */}
            <div className="flex flex-col col-span-2">
              <label className="text-white font-semibold mb-2">
                Nexync Username
              </label>
              <input
                className="w-[40%] bg-transparent border border-blue-400 rounded-full px-6 py-2 text-[#8D8D8D] text-lg"
                value={username}
                readOnly
              />
            </div>

            {/* Email */}
            <div className="flex flex-col col-span-2">
              <label className="text-white font-semibold mb-2">Email</label>
              <input
                className="w-[40%] bg-transparent border border-blue-400 rounded-full px-6 py-2 text-[#8D8D8D] text-lg"
                value={email}
                readOnly
              />
            </div>

            {/* Current Password */}
            <div className="flex flex-row items-end col-span-2 relative gap-4">
              <div className="flex flex-col flex-1">
                <label className="text-white font-semibold mb-2">
                  Current Password
                </label>
                <input
                  className="bg-transparent border border-blue-400 rounded-full px-6 py-2 text-[#8D8D8D] text-lg"
                  value={password}
                  type="password"
                  readOnly={!editMode}
                />
              </div>
              {editMode && (
                <button
                  type="button"
                  className="bg-[#E32838] text-[#131313] px-4 py-1 rounded-lg text-sm font-bold hover:bg-red-700 transition"
                  onClick={() =>
                    setShowPasswordFields(!showPasswordFields)
                  }
                >
                  {showPasswordFields
                    ? "Cancel Password Change"
                    : "Change Password"}
                </button>
              )}
            </div>

            {/* New Password Fields */}
            {editMode && showPasswordFields && (
              <div className="flex gap-4 col-span-2">
                {["New Password", "Confirm New Password"].map((label, i) => (
                  <div key={i} className="flex-1 flex flex-col gap-1">
                    <label className="text-white font-semibold mb-2">
                      {label}
                    </label>
                    <div className="relative">
                      <input
                        className="bg-transparent border border-blue-400 rounded-full px-6 py-2 text-[#8D8D8D] text-lg pr-10 focus:ring-2 focus:ring-blue-400"
                        value={i === 0 ? newPassword : confirmPassword}
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

            {/* Email Notifications */}
            <div className="flex items-center col-span-2 mt-2">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="w-5 h-5 accent-blue-500 mr-3"
                disabled={!editMode}
              />
              <div className="flex flex-col">
                <label className="text-white font-semibold mb-1">
                  Send E-mail Notifications
                </label>
                <span className="text-gray-300 text-xs">
                  Receive automatic updates about project activities and tasks
                </span>
              </div>
            </div>

            {/* Save Changes */}
            {editMode && (
              <div className="flex gap-4 col-span-2 mt-4">
                <button
                  type="submit"
                  className={`bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded-full text-lg shadow-md transition ${
                    showPasswordFields && newPassword !== confirmPassword
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={
                    showPasswordFields && newPassword !== confirmPassword
                  }
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
              src={profilePic || nexyncLogo}
              alt="Profile"
              className="w-64 h-64 rounded-full border-4 border-[#0077FF] object-cover"
            />
          </div>
          <span className="text-white text-xl font-semibold mt-4">
            {username}
          </span>

          <div className="flex gap-4 mt-4">
            {/* Edit Photo */}
            <button
              className="flex items-center gap-2 bg-[#0077FF] hover:bg-blue-800 text-[#131313] font-semibold px-2 py-1 rounded-md text-sm shadow transition border border-[#0077FF]"
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
              onChange={handleProfilePicUpload}
            />

            {/* Delete Photo */}
            <button
              className="flex items-center gap-2 bg-[#C00C33] hover:bg-red-700 text-[#131313] font-semibold px-2 py-1 rounded-md text-sm shadow transition border border-red-600"
              onClick={handleDeleteProfilePic}
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
