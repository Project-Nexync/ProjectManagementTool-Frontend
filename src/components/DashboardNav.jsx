import { useState } from "react";
import { MdSearch } from 'react-icons/md';
import { AiFillHome } from 'react-icons/ai';
import { IoMdNotifications } from 'react-icons/io';
import { BsBookmarkFill } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import DefaultUserIcon from '../assets/usericon.png';

function TopNav({ user }) {
  const profilePic = user?.profilePic || DefaultUserIcon;
  return (
    <div className="flex justify-between items-center bg-transparent shadow-md h-16">
      <div className="relative w-1/4 h-12">
        <input
          className="bg-[#D9D9D923] text-white px-4 py-2 rounded-4xl w-full pr-10 border border-zinc-400"
          style={{ fontFamily: 'HelveticaBold, sans-serif', letterSpacing: '0.08em' }}
          placeholder="Search Projects"
        />
        <MdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
      </div>
      <div className="flex gap-20 items-center text-white text-small">
        <a href="/" className="flex flex-col items-center group hover:text-blue-400 transition-colors">
          <AiFillHome className="text-2xl mb-3 group-hover:text-blue-400" />
          <span className="text-xs tracking-widest">home</span>
        </a>
        <a href="#notifications" className="flex flex-col items-center group hover:text-blue-400 transition-colors">
          <IoMdNotifications className="text-2xl mb-3 group-hover:text-blue-400" />
          <span className="text-xs tracking-widest">notifications</span>
        </a>
        <a href="#saved" className="flex flex-col items-center group hover:text-blue-400 transition-colors">
          <BsBookmarkFill className="text-2xl mb-3 group-hover:text-blue-400" />
          <span className="text-xs tracking-widest">saved</span>
        </a>
        <a href="#settings" className="flex flex-col items-center group hover:text-blue-400 transition-colors">
          <FiSettings className="text-2xl mb-3 group-hover:text-blue-400" />
          <span className="text-xs tracking-widest">settings</span>
        </a>
        <span className="font-bold text-blue-400">Steven Smith</span>
        <img src={profilePic} alt="Profile" className="w-10 h-10 rounded-full border-2 border-blue-400" />
      </div>
    </div>
  );
}

export default TopNav;