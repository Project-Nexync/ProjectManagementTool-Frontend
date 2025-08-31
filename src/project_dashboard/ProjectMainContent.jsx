import React, { useState } from "react";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { BiSolidBookmarkAltMinus } from "react-icons/bi";

export default function ProjectMainContent() {
  const [saved, setSaved] = useState(false);
  return (
    <main className="flex-1 flex flex-col px-0 py-6 bg-transparent">
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
          Revamping the company’s main website for improved UX, modern UI, and mobile responsiveness.
        </div>
        <div className="flex items-center gap-4 mt-2">
          <span className="bg-red-600 text-white px-3 py-1 rounded-lg font-bold text-sm">Deadline : 20th August 2025 at 3.00 p.m.</span>
          <span className="bg-[#1e293b] text-blue-300 px-3 py-1 rounded-lg font-bold text-sm">Task Completion Percentage : 28%</span>
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
      {/* Task Table */}
      <div className="bg-[#12244a] rounded-xl p-4 shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full text-white text-sm">
            <thead>
              <tr className="bg-[#1e293b]">
                <th className="py-3 px-4 text-left font-bold">Task</th>
                <th className="py-3 px-4 text-left font-bold">Status</th>
                <th className="py-3 px-4 text-left font-bold">Deadline</th>
                <th className="py-3 px-4 text-left font-bold">Assignees</th>
                <th className="py-3 px-4 text-left font-bold">Attachments</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row */}
              <tr className="border-b border-[#294372]">
                <td className="py-2 px-4">Update Homepage Design</td>
                <td className="py-2 px-4"><span className="bg-blue-700 px-2 py-1 rounded text-xs font-bold">In Progress</span></td>
                <td className="py-2 px-4">2025-08-10<br/>3.00 p.m.</td>
                <td className="py-2 px-4">
                  <div className="flex -space-x-2">
                    <img src="/src/assets/usericon.png" alt="A" className="w-6 h-6 rounded-full border-2 border-white" />
                    <img src="/src/assets/usericon.png" alt="B" className="w-6 h-6 rounded-full border-2 border-white" />
                  </div>
                </td>
                <td className="py-2 px-4">-</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
