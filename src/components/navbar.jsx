  // import { useState } from "react";
  // import Logo from '../assets/nexync.png';
  // import UserIcon from '../assets/usericon.png'; // default icon
  // import { Link } from "react-router-dom";


  // export default function Navbar({ user }) {
  //   const [isOpen, setIsOpen] = useState(false);

  //   // user.profilePic can be null/undefined
  //   const profilePic = user?.profilePic || UserIcon;

  //   return (
  //     <nav className="bg-transparent shadow-md fixed top-0 left-0 w-full z-10">
  //       <div className="max-w-7xl mx-2 px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
  //         {/* Logo */}
  //         <div className="flex-shrink-0">
  //           <img
  //             src={Logo}
  //             alt="MyApp Logo"
  //             className="h-12 w-auto"
  //           />
  //         </div>

  //         {/* Center Menu */}
  //         <div className="absolute left-1/2 transform -translate-x-1/2 font-helvetica hidden md:flex space-x-20 text-[#C4C6C8]">
  //           <Link to="/" className="hover:text-[#1C89EF]">Home</Link>
  //           {/* <Link to="/dashboard" className="hover:text-[#1C89EF]">Dashboard</Link> */}
  //           <Link to="/features" className="hover:text-[#1C89EF]">Features</Link>
  //           <Link to="/about" className="hover:text-[#1C89EF]">About</Link>
  //         </div>

  //         {/* Right Section */}
  //         <div className="absolute right-12 top-1/2 transform -translate-y-1/2 flex items-center space-x-4">
  //           {/* Mobile Menu Button */}
  //           <div className="flex md:hidden">
  //             <button
  //               onClick={() => setIsOpen(!isOpen)}
  //               className="text-gray-700 hover:text-blue-600 focus:outline-none"
  //             >
  //               <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //                 {isOpen ? (
  //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  //                 ) : (
  //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  //                 )}
  //               </svg>
  //             </button>
  //           </div>

  //           {/* Profile Picture
  //           <img
  //             src={profilePic}
  //             alt="User Profile"
  //             className="h-10 w-10 rounded-full object-cover border border-blue-600"
  //           /> */}
  //         </div>
  //         </div>  

  //       {/* Mobile Menu */}
  //       {isOpen && (
  //         <div className="md:hidden px-2 pt-0 pb-1 space-y-0 bg-transparent shadow-md text-[#C4C6C8]">
  //           <a href="#" className="block px-3 py-2 hover:text-[#1C89EF]">Home</a>
  //           {/* <a href="#" className="block px-3 py-2 hover:text-[#1C89EF]">Dashboard</a> */}
  //           <a href="#" className="block px-3 py-2 hover:text-[#1C89EF]">Features</a>
  //           <a href="#" className="block px-3 py-2 hover:text-[#1C89EF]">About</a>
  //         </div>
  //       )}
  //     </nav>
  //   );
  // }

import { useState } from "react";
import Logo from '../assets/nexync.png';
import UserIcon from '../assets/usericon.png'; // default icon
import { Link } from "react-router-dom";

export default function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  // user.profilePic can be null/undefined
  const profilePic = user?.profilePic || UserIcon;

  return (
    <nav className="bg-transparent shadow-md"> {/* Removed fixed positioning */}
      <div className="max-w-7xl mx-2 px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src={Logo}
            alt="MyApp Logo"
            className="h-12 w-auto"
          />
        </div>

        {/* Center Menu */}
        <div className="absolute left-1/2 transform -translate-x-1/2 font-helvetica hidden md:flex space-x-20 text-[#C4C6C8]">
          <Link to="/" className="hover:text-[#1C89EF]">Home</Link>
          {/* <Link to="/dashboard" className="hover:text-[#1C89EF]">Dashboard</Link> */}
          <Link to="/features" className="hover:text-[#1C89EF]">Features</Link>
          <Link to="/about" className="hover:text-[#1C89EF]">About</Link>
        </div>

        {/* Right Section */}
        <div className="absolute right-12 top-1/2 transform -translate-y-1/2 flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Profile Picture
          <img
            src={profilePic}
            alt="User Profile"
            className="h-10 w-10 rounded-full object-cover border border-blue-600"
          /> */}
        </div>
      </div>  

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-0 pb-1 space-y-0 bg-transparent shadow-md text-[#C4C6C8]">
          <a href="#" className="block px-3 py-2 hover:text-[#1C89EF]">Home</a>
          {/* <a href="#" className="block px-3 py-2 hover:text-[#1C89EF]">Dashboard</a> */}
          <a href="#" className="block px-3 py-2 hover:text-[#1C89EF]">Features</a>
          <a href="#" className="block px-3 py-2 hover:text-[#1C89EF]">About</a>
        </div>
      )}
    </nav>
  );
}