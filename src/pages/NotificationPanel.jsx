import React, { useEffect } from "react";
import NotificationItem from "../components/NotificationItem";
import { IoClose } from "react-icons/io5";

const notifications = [
  {
    id: 1,
    project: "Website Redesign",
    task: "Revamp Navigation Structure",
    description: "Kallis Jaques added an attachment to the task",
    date: "06-08-2025",
    time: "11:30 AM"
  },
  {
    id: 2,
    project: "Marketing Campaign Q4",
    task: "",
    description: "Mahela Jay added you to this project",
    date: "06-08-2025",
    time: "10:15 AM"
  },
  // ...more static notifications
];

export default function NotificationPanel({ open, onClose }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Blur overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[6px] transition-opacity duration-300"
        onClick={onClose}
      />
      {/* Slide-in panel */}
      <aside className="relative ml-auto w-2/5 h-full bg-[#0a1834] shadow-2xl border-l border-[#294372] flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between px-8 pt-8 pb-4 border-b border-[#294372]">
          <span className="text-3xl font-bold text-white">Notifications</span>
          <button
            onClick={onClose}
            className="text-white border-2 rounded-2xl border-white hover:text-blue-200 hover:border-blue-200 text-xl font-bold">
            <IoClose />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
          {notifications.map(n => (
            <NotificationItem key={n.id} {...n} />
          ))}
        </div>
      </aside>
      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
    </div>
  );
}
