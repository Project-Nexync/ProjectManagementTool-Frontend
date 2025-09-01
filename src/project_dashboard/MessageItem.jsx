import React from "react";

// Helper: get initials from name
function getInitials(name) {
  if (!name) return "?";
  return name.split(" ").map(n => n[0]).join("").toUpperCase();
}

export default function MessageItem({ message, isOwn }) {
  const isMention = message.text && message.text.startsWith("@");
  return (
    <div className={`flex w-full mb-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>
      {!isOwn && (
        <div className="flex flex-col items-end mr-2">
          {message.user?.avatar ? (
            <img src={message.user.avatar} alt={message.user.name} className="w-8 h-8 rounded-full border-2 border-white" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#e0e7ef] flex items-center justify-center text-lg font-bold text-[#7b2ff2] border-2 border-white">
              {getInitials(message.user?.name)}
            </div>
          )}
        </div>
      )}
      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} w-full max-w-[80%]`}>
        <div className={`relative flex flex-col ${isOwn ? '' : 'pl-10'}`}>
          {/* Bubble */}
            <div
              className={
                isOwn
                  ? "bg-gradient-to-br from-[#2563eb] to-[#1e40af] text-white rounded-2xl rounded-br-none px-5 py-2 text-base shadow-lg self-end border border-[#294372]"
                  : isMention
                  ? "bg-gradient-to-br from-[#1e293b] to-[#12244a] text-white rounded-2xl rounded-bl-none px-5 py-2 text-base shadow-lg border border-[#294372]"
                  : "bg-gradient-to-br from-[#1e293b] to-[#12244a] text-white rounded-2xl rounded-bl-none px-5 py-2 text-base shadow-lg border border-[#294372]"
              }
              style={{ marginLeft: isOwn ? 0 : 0 }}
            >
              {/* Name for non-own messages */}
              {!isOwn && (
                <span className="font-bold text-white block mb-0.5 drop-shadow">{message.user?.name}</span>
              )}
              {/* Mention bold */}
              {isMention ? (
                <span className="font-bold">{message.text.split(" ")[0]}</span>
              ) : null}
              <span className={isMention ? "ml-1" : ""}>
                {isMention ? message.text.split(" ").slice(1).join(" ") : message.text}
              </span>
            </div>
            {/* Timestamp */}
            <span className={`text-xs mt-1 ${isOwn ? 'text-right text-blue-200' : 'text-left text-gray-400'} font-mono tracking-wide`}>
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).replace(/am|pm/i, m => m.toUpperCase())}
            </span>
        </div>
      </div>
      {isOwn && (
        <div className="flex flex-col items-end ml-2">
          {message.user?.avatar ? (
            <img src={message.user.avatar} alt={message.user.name} className="w-8 h-8 rounded-full border-2 border-white" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#e0e7ef] flex items-center justify-center text-lg font-bold text-[#7b2ff2] border-2 border-black">
              {getInitials(message.user?.name)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
