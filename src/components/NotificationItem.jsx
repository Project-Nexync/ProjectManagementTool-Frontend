import React from "react";

export default function NotificationItem({ project, task, description, date, time }) {
  return (
    <div className="bg-[#101e36] rounded-xl shadow p-4 flex flex-col border border-[#294372] hover:bg-[#16294a] transition">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-base font-semibold text-blue-200">
            Project: {project}
            {task && <span className="text-blue-100 font-normal"> | Task: <span className="font-semibold text-blue-100">{task}</span></span>}
          </div>
          <div className="text-sm text-gray-200 mt-1">{description}</div>
        </div>
        <div className="flex flex-col items-end mt-2 md:mt-0">
          <span className="text-xs text-gray-400 font-mono">{date}</span>
          {time && <span className="text-xs text-gray-500 font-mono">{time}</span>}
        </div>
      </div>
    </div>
  );
}
