import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:7000";

export default function ChatContainer({ projectId, user }) {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const socketRef = useRef();

  useEffect(() => {
    const projectRoom = projectId;

    // Initialize socket
    socketRef.current = io(SOCKET_URL, { query: { projectId: projectRoom } });
    

    // Join room
    socketRef.current.emit("joinProject", projectRoom);

    // Load old messages
    socketRef.current.on("chatHistory", (msgs) => {
      

      if (!Array.isArray(msgs)) {
        console.error("chatHistory was not an array:", msgs);
        setMessages([]);
        return;
      }

      const formattedMsgs = msgs.map(msg => ({
        ...msg,
        text: msg.message,
        user: msg.user || { id: msg.senderId, name: msg.senderName || "Unknown" },
      }));

      setMessages(formattedMsgs);
    });

    // Receive new messages
   socketRef.current.on("receiveMessage", (messagesArray) => {
  if (!Array.isArray(messagesArray)) {
    console.error("chatHistory was not an array:", messagesArray);
    setMessages([]);
    return;
  }

  // Filter out messages that already exist in state
  const newMessages = messagesArray.filter(
    (msg) => !messages.some((m) => m.id === msg.id)
  );

  if (newMessages.length === 0) return; // nothing new to add

  const formattedMsgs = newMessages.map((msg) => ({
    id: msg.id,
    text: msg.message,
    timestamp: msg.timestamp,
    user: {
      id: msg.senderId,
      name: msg.senderName || "Unknown",
    },
  }));

  setMessages((prev) => [...prev, ...formattedMsgs]);
});

    // Typing indicator
    socketRef.current.on("typing", (isTyping) => setTyping(isTyping));

    return () => {
      socketRef.current.emit("leaveProject", projectRoom);
      socketRef.current.disconnect();
    };
  }, [projectId]);

  // Send a new message
  const sendMessage = (text) => {
    const msg = {
      message: text,
      senderId: user.id || user,
      user: { id: user.id || user, name: user.name || "Me" },
      projectId,
      timestamp: new Date().toISOString(),
    };
    socketRef.current.emit("sendMessage", msg);
  };

  // Send typing indicator
  const sendTyping = (isTyping) => {
    socketRef.current.emit("typing", { projectId, userId: user.id || user, isTyping });
  };

  return (
    <div
      className="flex flex-col h-[420px] bg-transparent backdrop-blur-lg rounded-2xl pt-2 px-0 w-full shadow-[0_4px_30px_rgba(0,0,0,0.6)] border border-white/10 ring-1 ring-white/5 overflow-hidden"
      style={{ minWidth: 200 }}
    >
      <div className="flex flex-col items-center justify-center bg-transparent backdrop-blur-lg pt-0 pb-2 border-b border-white/10">
        <div className="font-bold text-xl text-white tracking-wide drop-shadow">
          Project Chat
        </div>
      </div>

      <MessageList messages={messages} user={user} typing={typing} />

      <MessageInput onSend={sendMessage} onTyping={sendTyping} />
    </div>
  );
}
