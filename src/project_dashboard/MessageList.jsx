import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";

export default function MessageList({ messages, user, typing }) {

  const bottomRef = useRef();

  // Scroll to bottom when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-2 py-2 bg-white/5 backdrop-blur-lg rounded-b-2xl" style={{ minHeight: 0 }}>
      {messages.map((msg, idx) => (
        <MessageItem key={idx} message={msg} isOwn={msg.user?.id === (user.id || user)} />

      ))}

      {typing && <div className="text-xs text-gray-400 italic pl-4">Someone is typing...</div>}
      <div ref={bottomRef} />
    </div>
  );
}
