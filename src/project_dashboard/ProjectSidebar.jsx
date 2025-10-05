import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DateTimeDisplay from "../dashboard/DateTimeDisplay";
import Logo from "../dashboard/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import CreateTask from "../components/CreateTask";
import api from "../API.jsx"; // axios instance

export default function ProjectSidebar() {
  const { projectId } = useParams();
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [userRole, setUserRole] = useState(""); // store role
  const [loadingRole, setLoadingRole] = useState(true);

  // Fetch user role from backend
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await api.get(`/project/${projectId}`);
        setUserRole(res.data.userRole || "Member");
      } catch (err) {
        console.error("Failed to fetch user role", err);
        setUserRole("Member");
      } finally {
        setLoadingRole(false);
      }
    };
    fetchUserRole();
  }, [projectId]);

  const canAddTask = userRole === "Admin" || userRole === "manager";

  return (
    <div className="mt-0 relative">
      {showCreateTask && (
        <CreateTask
          onFinish={(tasks, assignees) => {
            setShowCreateTask(false);
            if (tasks && assignees) {
              console.log("Tasks:", tasks);
              console.log("Assignees:", assignees);
              // Add logic to update the task table if needed
            }
          }}
        />
      )}
      <Logo />
      <DateTimeDisplay />

      {canAddTask && (
        <button
          className=" mt-6 w-fit
                      bg-gradient-to-b from-[#3c63e8] to-[#1452d5]
                      text-white font-bold py-1 px-4 rounded-xl text-xl
                      shadow-[0_4px_0_#0f3eb4,0_8px_16px_rgba(0,0,0,0.2)]
                      hover:translate-y-[2px] hover:shadow-[0_2px_0_#0f3eb4,0_6px_12px_rgba(0,0,0,0.2)]
                      active:translate-y-[4px] active:shadow-[0_0px_0_#0f3eb4,0_4px_8px_rgba(0,0,0,0.2)]
                      transition-all duration-200 ease-in-out"
          onClick={() => setShowCreateTask(true)}
        >
          + Add tasks
        </button>
      )}

      <div className="flex items-center gap-2 w-fit bg-[#7AB8FF] text-[#0A3363] px-3 py-0.5 rounded-lg font-bold text-m mt-6">
        <FontAwesomeIcon icon={faGraduationCap} className="text-[#0A3363] w-4 h-4" />
        <span>
          Role : {loadingRole ? "Loading..." : userRole}
        </span>
      </div>
    </div>
  );
}
