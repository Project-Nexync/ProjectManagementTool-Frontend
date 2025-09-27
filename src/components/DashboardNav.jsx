import { useState } from "react";
import NotificationPanel from "../pages/NotificationPanel";
import { MdSearch } from 'react-icons/md';
import { AiFillHome } from 'react-icons/ai';
import { IoMdNotifications } from 'react-icons/io';
import { BsBookmarkFill } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import DefaultUserIcon from '../assets/usericon.png';

function TopNav() {
  const [showNotifications, setShowNotifications] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const profilePic = user?.profilePic || DefaultUserIcon;

  return (
    <>
      <div className="flex justify-between items-center bg-transparent shadow-md h-16 px-4">
        {/* Search Bar */}
        <div className="relative w-1/4 h-12">
          <input
            className="bg-[#D9D9D923] text-white px-4 py-2 rounded-4xl w-full pr-10 border border-zinc-400"
            style={{ fontFamily: 'HelveticaBold, sans-serif', letterSpacing: '0.08em' }}
            placeholder="Search Projects"
          />
          <MdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
        </div>

        {/* Nav Icons */}
        <div className="flex gap-20 items-center text-white text-small">
          <a href="/" className="flex flex-col items-center group hover:text-blue-400 transition-colors">
            <AiFillHome className="text-2xl mb-3 group-hover:text-blue-400" />
            <span className="text-xs tracking-widest">Home</span>
          </a>

          <button
            type="button"
            className="flex flex-col items-center group hover:text-blue-400 transition-colors focus:outline-none"
            onClick={() => setShowNotifications(true)}
            aria-label="Show notifications"
          >
            <IoMdNotifications className="text-2xl mb-3 group-hover:text-blue-400" />
            <span className="text-xs tracking-widest">Notifications</span>
          </button>

          <a href="#saved" className="flex flex-col items-center group hover:text-blue-400 transition-colors">
            <BsBookmarkFill className="text-2xl mb-3 group-hover:text-blue-400" />
            <span className="text-xs tracking-widest">Saved</span>
          </a>

          <a href="#settings" className="flex flex-col items-center group hover:text-blue-400 transition-colors">
            <FiSettings className="text-2xl mb-3 group-hover:text-blue-400" />
            <span className="text-xs tracking-widest">Settings</span>
          </a>

          {/* Username + Avatar (slightly spaced) */}
          <div className="flex items-center ml-2 gap-4">
            <span className="font-bold text-white">{user?.username || "Guest"}</span>
            <img src={profilePic} alt="Profile" className="w-10 h-10 rounded-full border-2 border-blue-400" />
          </div>
        </div>
      </div>

      {/* Notification Panel */}
      <NotificationPanel open={showNotifications} onClose={() => setShowNotifications(false)} />
    </>
  );
}

export default TopNav;
