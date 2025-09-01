import React, { useState } from "react";
import DateTimeDisplay from "../dashboard/DateTimeDisplay";
import Logo from "../dashboard/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import CreateTask from "../components/CreateTask";

export default function ProjectSidebar() {
  const [showCreateTask, setShowCreateTask] = useState(false);

  return (
    <div className="mt-0 relative">
      {showCreateTask && (
        <CreateTask
          onFinish={(tasks, assignees) => {
            setShowCreateTask(false);
            if (tasks && assignees) {
              console.log("Tasks:", tasks);
              console.log("Assignees:", assignees);
              // Add logic to update the task table
            }
          }}
        />
      )}
      <Logo />
      <DateTimeDisplay />
      <button
        className="mt-6 w-fit bg-gradient-to-b from-[#2ecc40] to-[#27ae38] text-blue-950 font-bold py-1 px-4 rounded-xl text-xl 
                  shadow-[0_4px_0_#1e8c2d,0_8px_16px_rgba(0,0,0,0.2)] 
                  hover:translate-y-[2px] hover:shadow-[0_2px_0_#1e8c2d,0_6px_12px_rgba(0,0,0,0.2)] 
                  active:translate-y-[4px] active:shadow-[0_0px_0_#1e8c2d,0_4px_8px_rgba(0,0,0,0.2)] 
                  transition-all duration-200 ease-in-out"
        onClick={() => setShowCreateTask(true)}
      >
        + Add tasks
      </button>
      <div className="flex items-center gap-2 w-fit bg-[#7AB8FF] text-[#0A3363] px-3 py-0.5 rounded-lg font-bold text-m mt-6">
        <FontAwesomeIcon icon={faGraduationCap} className="text-[#0A3363] w-4 h-4" />
        <span>Role : Project Manager</span>
      </div>
    </div>
  );
}
