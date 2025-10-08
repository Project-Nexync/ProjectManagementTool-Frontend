import React, { useEffect, useState } from "react";
import NotificationItem from "../components/NotificationItem";
import { IoClose } from "react-icons/io5";
import api from "../API.jsx";

export default function NotificationPanel({ open, onClose }) {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications from API
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";

      api.get("/project/user/notification")
        .then(res => {
          if (res.data.success) {
            const mappedNotifications = res.data.data.map(n => ({
              id: n.notification_id,
              project: n.type,
              description: n.content,
              date: new Date(n.created_at).toLocaleDateString(),
              time: new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isNew: !n.is_read
            }));
            setNotifications(mappedNotifications);
          }
        })
        .catch(err => console.error(err));
    } else {
      document.body.style.overflow = "";
    }

    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Handle click on a notification
  const handleClick = async (id) => {
    try {
      await api.put("/project/user/notification/isRead", { notification_id: id });

      // Update local state to remove the red dot
      setNotifications(prev =>
        prev.map(n =>
          n.id === id ? { ...n, isNew: false } : n
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

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
            <div
              key={n.id}
              className="relative cursor-pointer"
              onClick={() => handleClick(n.id)}
            >
              {n.isNew && (
                <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              )}
              <NotificationItem {...n} />
            </div>
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
