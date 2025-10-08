import React from "react";

export default function MessageItem({ message, isOwn }) {
  const isMention = message.text && message.text.startsWith("@");

  return (
    <div className={`flex w-full mb-2 ${isOwn ? "justify-end" : "justify-start"}`}>
      <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"} w-full max-w-[80%]`}>
        <div className={`relative flex flex-col`}>
          {/* Sender Name */}
          {!isOwn && (
            <span className="font-bold text-white mb-1 drop-shadow">
              {message.user?.name || "Unknown"}
            </span>
          )}

          {/* Message Bubble */}
          <div
            className={`${
              isOwn
                ? "bg-gradient-to-br from-[#2563eb] to-[#1e40af] text-white rounded-2xl rounded-br-none px-5 py-2 text-base shadow-lg border border-[#294372]"
                : "bg-gradient-to-br from-[#1e293b] to-[#12244a] text-white rounded-2xl rounded-bl-none px-5 py-2 text-base shadow-lg border border-[#294372]"
            }`}
          >
            {isMention ? (
              <>
                <span className="font-bold">{message.text.split(" ")[0]}</span>
                <span className="ml-1">{message.text.split(" ").slice(1).join(" ")}</span>
              </>
            ) : (
              message.text
            )}
          </div>

          {/* Timestamp */}
          <span
            className={`text-xs mt-1 ${
              isOwn ? "text-right text-blue-200" : "text-left text-gray-400"
            } font-mono tracking-wide`}
          >
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }).replace(/am|pm/i, (m) => m.toUpperCase())}
          </span>
        </div>
      </div>
    </div>
  );
}
