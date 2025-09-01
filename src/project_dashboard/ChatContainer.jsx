import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";

export default function ChatContainer({ projectId, taskId = null, user }) {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      query: { projectId, taskId },
    });

    socketRef.current.emit("joinRoom", { projectId, taskId });

    socketRef.current.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socketRef.current.on("typing", (isTyping) => {
      setTyping(isTyping);
    });

    return () => {
      socketRef.current.emit("leaveRoom", { projectId, taskId });
      socketRef.current.disconnect();
    };
  }, [projectId, taskId]);

  const sendMessage = (text) => {
    const msg = {
      text,
      user,
      timestamp: new Date().toISOString(),
      taskId,
    };
    setMessages((prev) => [...prev, msg]); // Optimistic update
    socketRef.current.emit("message", msg);
  };

  const sendTyping = (isTyping) => {
    socketRef.current.emit("typing", isTyping);
  };

  return (
  <div className="flex flex-col h-[420px] bg-transparent backdrop-blur-lg rounded-2xl pt-2 px-0 w-full shadow-[0_4px_30px_rgba(0,0,0,0.6)] border border-white/10 ring-1 ring-white/5 overflow-hidden" style={{ minWidth: 340 }}>
      {/* Header */}
  <div className="flex flex-col items-center justify-center bg-transparent backdrop-blur-lg pt-0 pb-2 border-b border-white/10">
        <div className="font-bold text-xl text-white tracking-wide drop-shadow">Website Redesign Project</div>
        <div className="flex items-center mt-2 mb-1 gap-2">
          {/* Example avatars, replace with real avatars if available */}
          <img src="/src/assets/usericon.png" alt="A" className="w-9 h-9 rounded-full border-2 border-[#294372] shadow -ml-2 first:ml-0" />
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#2563eb] flex items-center justify-center text-lg font-bold text-white border-2 border-[#294372] shadow -ml-2">K</div>
          <img src="/src/assets/usericon.png" alt="B" className="w-9 h-9 rounded-full border-2 border-[#294372] shadow -ml-2" />
          <img src="/src/assets/usericon.png" alt="C" className="w-9 h-9 rounded-full border-2 border-[#294372] shadow -ml-2" />
        </div>
      </div>
      <MessageList messages={messages} user={user} typing={typing} />
      <MessageInput onSend={sendMessage} onTyping={sendTyping} />
    </div>
  );
}
