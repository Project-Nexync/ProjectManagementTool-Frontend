
import React, { useState } from "react";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { BiSolidBookmarkAltMinus } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { AiFillPieChart } from "react-icons/ai";

export default function ProjectMainContent() {
  const [saved, setSaved] = useState(false);
  return (
    <main className="flex-1 flex flex-col px-0 py-2 bg-transparent">
      {/* Project Header & Task Table only (no right column) */}
      {/* Header Section */}
      <div className="flex flex-col mb-4">
        <div className="flex items-center gap-2">
          <span className="text-white text-3xl font-extrabold tracking-wide">Website Redesign Project</span>
          <button
            className="focus:outline-none"
            title={saved ? "Remove from Saved Projects" : "Add to Saved Projects"}
            onClick={() => setSaved(s => !s)}
          >
            {saved ? (
              <BiSolidBookmarkAltMinus className="text-white w-7 h-7 hover:scale-110 transition-transform" />
            ) : (
              <BsFillBookmarkHeartFill className="text-white w-7 h-7 hover:scale-110 transition-transform" />
            )}
          </button>
        </div>
        <div className="text-lg mt-1" style={{ color: '#BCB4B4', fontFamily: 'HelveticaNeueLight, Helvetica Neue, Helvetica, Arial, sans-serif', fontWeight: 300 }}>
          Revamping the company’s main website for improved UX, modern UI, and mobile responsiveness to create more engaging user experiences and also increase conversion rates.
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="bg-[#9D1C1D] text-[#FFAEAE] px-3 py-1 rounded-lg font-bold text-sm">
            <FaCalendarAlt className="inline-block mr-2 w-4 h-4 text-[#FFAEAE] -mt-1" />
            <span>Deadline : 20th August 2025 at 3.00 p.m.</span>
          </div>
          <div className="bg-[#1e293b] text-blue-300 px-3 py-1 rounded-lg font-bold text-sm">
            <AiFillPieChart className="inline-block mr-2 w-4 h-4 text-blue-300 -mt-1" />
            <span>Task Completion Percentage : 28%</span>
          </div>
        </div>
        <div className="flex flex-col items-start mt-4 md:mt-4">
          <div className="flex items-center gap-2">
            <span className="text-blue-200 font-bold text-sm">TEAM :</span>
            {/* Team avatars placeholder */}
            <div className="flex -space-x-2">
              <img src="/src/assets/usericon.png" alt="A" className="w-8 h-8 rounded-full border-2 border-white" />
              <img src="/src/assets/usericon.png" alt="B" className="w-8 h-8 rounded-full border-2 border-white" />
              <img src="/src/assets/usericon.png" alt="C" className="w-8 h-8 rounded-full border-2 border-white" />
              <img src="/src/assets/usericon.png" alt="D" className="w-8 h-8 rounded-full border-2 border-white" />
            </div>
          </div>
        </div>
      </div>
  {/* Task Table moved to ProjectDashboard */}
    </main>
  );
}
