import Navbar from "../components/navbar";
import backgroundImage from "../assets/bg-screen.png";
import Logo from "../assets/nexync.png";
import { Button } from "../components/loginButton";
import { useState } from "react";
import SignUpModal from "../components/SignUpModal";
import SignInModal from "../components/SignInModal";
import SocialBar from "../components/socialMedia";

const LandingPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Full-screen background with overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black/40 -z-10" />

      <Navbar />

      {/* Main Landing Content */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="p-12 rounded-2xl backdrop-blur-md max-w-5xl w-full shadow-xl">
          <div className="mt-2 flex flex-col items-center text-center">
            {/* Welcome Text */}
            <h1 className="font-helvetica text-4xl md:text-5xl font-semibold text-[#4AA3FF] drop-shadow-md tracking-wide">
              Welcome To
            </h1>

            {/* Large Logo */}
            <img
              src={Logo}
              alt="Nexync Logo"
              className="h-56 w-auto my-2 drop-shadow-lg transition-transform duration-500 hover:scale-105"
            />

            {/* Tagline BELOW the logo */}
            <p className="font-helvetica text-lg md:text-2xl font-light text-[#D1E8FF] mt-1">
              Next Generation Project Sync
            </p>
          </div>




          <h2 className="font-helvetica mt-8 text-xl md:text-2xl font-light text-white leading-relaxed">
            An All-In-One Project Management Platform Built For The Next Generation Of Work.
          </h2>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-10 pt-12 w-full">
            {/* Register column */}
            <div className="flex flex-col items-center w-56">
              <span className="mb-3 text-base text-[#cdd9ee]">
                First Time Visiting?
              </span>
              <Button
                title="Register Now"
                subtitle=""
                className="w-3/4 h-16 flex flex-col items-center justify-center bg-gradient-to-r from-[#4AA3FF] to-[#1E88E5] text-white shadow-lg hover:scale-105 transition-transform rounded-lg"
                onClick={() => setShowSignUp(true)}
              />
            </div>
            {/* Login column */}


            <div className="flex flex-col items-center w-56">
              <span className="mb-3 text-base text-[#cdd9ee]">
                Been Here Before?
              </span>
              <Button
                title="Login"
                className="w-3/4 h-16 flex flex-col items-center justify-center bg-gradient-to-r from-[#4AA3FF] to-[#1E88E5] text-white shadow-lg hover:scale-105 transition-transform rounded-lg"
                onClick={() => setShowSignIn(true)}
              />

            </div>
          </div>
        </div>
      </div>

      <SocialBar />

      {/* Modals */}
      {showSignUp && (
        <SignUpModal
          onClose={() => setShowSignUp(false)}
          onSwitchToSignIn={() => {
            setShowSignUp(false);
            setShowSignIn(true);
          }}
        />
      )}
      {showSignIn && (
        <SignInModal
          onClose={() => setShowSignIn(false)}
          onSwitchToSignUp={() => {
            setShowSignIn(false);
            setShowSignUp(true);
          }}
        />
      )}
    </div>
  );
};

export default LandingPage;
