import Navbar from "../components/navbar"
import backgroundImage from "../assets/bg-screen.png"
import Logo from '../assets/nexync.png';
import { Button } from "../components/loginButton"
import { useState } from "react";
import SignUpModal from "../components/SignUpModal";
import SignInModal from "../components/SignInModal";
import SocialBar from "../components/socialMedia";

const LandingPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  return (
    <div className="relative min-h-screen">
      {/* Full-screen background image */}
      <div
  className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
  style={{ backgroundImage: `url(${backgroundImage})` }}
    />
      <Navbar/>
        
      {/* Main Landing Content */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className=" p-12 rounded-lg backdrop-blur-sm max-w-8xl w-full">
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

          <div className="flex flex-row justify-center gap-24 pt-12 w-full">
            {/* Register column */}
            <div className="flex flex-col items-center w-56">
              <span className="mb-2 text-base text-[#bfcbe0]">first time visiting here ?</span>
              <Button
                title="register now"
                subtitle="to get started"
                className="w-3/4"
                onClick={() => setShowSignUp(true)}
              />
            </div>
            {/* Login column */}
            <div className="flex flex-col items-center w-56">
              <span className="mb-2 text-base text-[#bfcbe0]">been here before ?</span>
              <Button 
              title="login" 
              subtitle="and let's go" 
              className="w-3/4"
              onClick={() => setShowSignIn(true)}
               />
            </div>
          </div>
        </div>
      </div>
  <SocialBar />
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