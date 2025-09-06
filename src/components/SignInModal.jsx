import React, { useState } from "react";
import NexyncLogo from "../assets/nexync.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../API.jsx";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function SignInModal({ onClose, onSwitchToSignUp }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setError("Please enter both email and password");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      onClose();
      navigate("/dashboard");
    } else {
      setError("Login failed. Please check your credentials.");
    }
  } catch (err) {
    console.error("Error during login:", err);
    setError("Something went wrong. Please try again later.");
  } finally {
    setLoading(false);
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
      <div className="relative bg-white rounded-2xl shadow-2xl p-10 w-[420px] max-w-full z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <span className="text-2xl font-semibold text-black mb-2">Sign in to</span>
          <img
            src={NexyncLogo}
            alt="Nexync Logo"
            className="h-7 filter brightness-0"
            style={{ marginBottom: 2 }}
          />
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#666666] ml-1 font-sans select-none">Email</label>
            <input
              className="w-full border rounded-lg border-gray-300 px-4 py-2 placeholder-gray-400 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#1C89EF]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              type="email"
              autoComplete="email"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#666666] ml-1 font-sans select-none">Password</label>
            <div className="relative">
              <input
                className="w-full border rounded-lg border-gray-300 px-4 py-2 placeholder-gray-400 text-gray-700 bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-[#1C89EF]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
              />
              <span
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 text-lg select-none flex items-center gap-1"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />} <span className="text-xs ml-1">{showPassword ? "Hide" : "Show"}</span>
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}

          {/* Terms */}
          <div className="text-xs text-gray-700 mt-2 mb-2">
            By continuing, you agree to the{' '}
            <a href="#" className="underline">Terms of use</a> and{' '}
            <a href="#" className="underline">Privacy Policy</a>.
          </div>

          {/* Sign in button */}
          <button
            type="submit"
            className="w-full bg-[#0076FF] hover:bg-[#0063D1] text-white rounded-full py-3 text-lg font-semibold shadow transition-colors duration-150"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {/* Sign up link */}
          <div className="text-center text-sm text-gray-600 mt-2">
            Don't have an account?{' '}
            <button
              type="button"
              className="underline font-medium text-[#1C89EF] hover:text-[#0056b3] focus:outline-none"
              onClick={() => {
                onClose && onClose();
                onSwitchToSignUp && onSwitchToSignUp();
              }}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInModal;
