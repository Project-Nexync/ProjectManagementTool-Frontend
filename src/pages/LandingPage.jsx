import { useState } from 'react';
import Navbar from "../components/navbar";
import backgroundImage from "../assets/bg-screen.png";
import Logo from '../assets/nexync.png';
import axios from 'axios'; // Import Axios

const LandingPage = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  // Register form state
  const [registerData, setRegisterData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    notification: false, // default value for notification checkbox
  });

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Handle register input changes
  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData({
      ...registerData,
      [name]: type === 'checkbox' ? checked : value, // If it's a checkbox, use 'checked'
    });
  };

  // Handle login input changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // Handle register form submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault(); // Prevent form default submit

    const data = {
      firstname: registerData.firstname,
      lastname: registerData.lastname,
      email: registerData.email,
      password: registerData.password,
      confirmPassword: registerData.confirmPassword,
      notification: registerData.notification, // Include notification checkbox state
    };

    try {
      // Send the form data to the backend as JSON
      const response = await axios.post('http://localhost:5000/auth/register', data, {
        headers: {
          'Content-Type': 'application/json', // Send as JSON
        },
      });
      console.log('Registration success:', response.data);
      setShowRegisterForm(false); // Close the form on success
      alert('Registration successful!');
    } catch (error) {
      console.error('Error registering user:', error.response.data);
    }
  };

  // Handle login form submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // Prevent form default submit

    try {
      const response = await axios.post('http://localhost:5000/auth/login', loginData); // Replace with backend URL
      console.log('Login success:', response.data);
      setShowLoginForm(false); // Close the form on success
    } catch (error) {
      console.error('Error logging in user:', error.response.data);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Full-screen background image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Transparent Navbar */}
      <Navbar />

      {/* Main Landing Content */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="p-12 rounded-lg backdrop-blur-sm max-w-8xl w-full">
          <div className="relative mt-8">
            {/* Large Logo */}
            <img
              src={Logo}
              alt="Nexync Logo"
              className="h-60 w-auto mx-auto"
            />

            {/* Text on top of the logo */}
            <h1 className="font-helvetica absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[300%] text-4xl font-light text-[#447EB8]">
              welcome to
            </h1>
            <p className="font-helvetica absolute top-1/2 left-1/2 transform -translate-x-[-62%] -translate-y-[-160%] text-xl font-light text-[#ADD3FF]">
              Next Generation Project Sync
            </p>
          </div>

          <h1 className="font-helvetica center text-xl font-light text-white">
            an all-in-one project management platform built for the next generation of work.
          </h1>

          <div className="flex flex-col space-y-6 w-full max-w-md mx-auto">
            <div className="text-white">
              <p className="mb-2">first time visiting here ?</p>
              <button
                onClick={() => { setShowRegisterForm(true); setShowLoginForm(false); }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-300">
                register now
              </button>
            </div>

            <div className="text-white">
              <p className="mb-2">been here before ?</p>
              <button
                onClick={() => { setShowLoginForm(true); setShowRegisterForm(false); }}
                className="w-full bg-transparent hover:bg-white hover:bg-opacity-20 text-white font-bold py-3 px-4 rounded border border-white transition duration-300">
                login
              </button>
            </div>

            <button className="text-white hover:underline mt-4">
              next time
            </button>
          </div>
        </div>
      </div>

      {/* Register Form Modal */}
      {showRegisterForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setShowRegisterForm(false)}
              className="absolute top-4 right-4 text-xl text-gray-500">
              ✕
            </button>

            {/* Logo + Heading */}
            <div className="flex items-center space-x-2 mb-6">
              <h2 className="text-xl font-semibold text-black">Register with</h2>
              <img src={Logo} alt="Nexync Logo" className="h-6" />
            </div>

            {/* Registration Form */}
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First name</label>
                  <input
                    type="text"
                    name="firstname"
                    value={registerData.firstname}
                    onChange={handleRegisterChange}
                    className="w-full p-3 border border-gray-300 rounded-md mt-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={registerData.lastname}
                    onChange={handleRegisterChange}
                    className="w-full p-3 border border-gray-300 rounded-md mt-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email address</label>
                <input
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  className="w-full p-3 border border-gray-300 rounded-md mt-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    className="w-full p-3 border border-gray-300 rounded-md mt-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    className="w-full p-3 border border-gray-300 rounded-md mt-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Notification Checkbox */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="notification"
                  checked={registerData.notification}
                  onChange={handleRegisterChange}
                  className="mt-1"
                />
                <label className="text-sm text-gray-600">
                  I want to receive notifications.
                </label>
              </div>

              {/* Profile Image Upload - Commented Out */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                <input
                  type="file"
                  name="profilePic"
                  onChange={handleProfilePicChange}
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                />
              </div> */}

              <div className="space-y-2 text-sm text-gray-600">
                <label className="flex items-start space-x-2">
                  <input type="checkbox" required className="mt-1" />
                  <span>
                    By creating an account, I agree to our
                    <a href="#" className="text-blue-600"> Terms of use</a> and
                    <a href="#" className="text-blue-600"> Privacy Policy</a>.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition">
                Sign up
              </button>

              <div className="mt-4 text-center">
                <p className="text-gray-500">Already have an account?{" "}
                  <a href="#"
                    onClick={() => { setShowLoginForm(true); setShowRegisterForm(false); }}
                    className="text-blue-600 ml-1">Log in</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Login Form Modal */}
      {showLoginForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
            <h2 className="text-2xl text-center font-semibold mb-4">Login</h2>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit}>
              <div className="mt-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="Enter your email"
                  className="w-full p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mt-4">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Enter your password"
                  className="w-full p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 mt-6">
                Login
              </button>

              <div className="mt-4 text-center">
                <p className="text-gray-500">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    onClick={() => { setShowRegisterForm(true); setShowLoginForm(false); }}
                    className="text-blue-500"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </form>

            {/* Close Modal Button */}
            <button
              onClick={() => setShowLoginForm(false)}
              className="absolute top-2 right-2 text-xl text-gray-500">
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
