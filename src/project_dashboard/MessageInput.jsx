import React, { useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";

export default function MessageInput({ onSend, onTyping }) {
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const inputRef = useRef();

  const handleChange = (e) => {
    setText(e.target.value);
    if (!typing) {
      setTyping(true);
      onTyping(true);
    }
    if (e.target.value === "") {
      setTyping(false);
      onTyping(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText("");
      setTyping(false);
      onTyping(false);
    }
  };

  const handleEmojiClick = (emojiData) => {
    const cursor = inputRef.current.selectionStart;
    const newText = text.slice(0, cursor) + emojiData.emoji + text.slice(cursor);
    setText(newText);
    setShowEmoji(false);
    setTimeout(() => {
      inputRef.current.focus();
      inputRef.current.selectionEnd = cursor + emojiData.emoji.length;
    }, 0);
  };

  return (
    <form onSubmit={handleSend} className="flex items-center px-2 py-3 bg-transparent backdrop-blur rounded-b-xl relative">
      <span
        className="text-2xl text-gray-500 mr-2 cursor-pointer hover:text-indigo-400 transition"
        onClick={() => setShowEmoji((v) => !v)}
        tabIndex={0}
        aria-label="Open emoji picker"
      >
        😊
      </span>
      {showEmoji && (
        <div className="absolute bottom-12 left-0 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
        </div>
      )}
      <input
        ref={inputRef}
        className="flex-1 bg-transparent text-indigo-300 px-2 py-2 rounded-full focus:outline-none placeholder-indigo-400"
        placeholder="Start typing..."
        value={text}
        onChange={handleChange}
        onBlur={() => { setTyping(false); onTyping(false); }}
      />
      <button type="submit" className="ml-2 text-2xl text-indigo-500 hover:text-indigo-900 transition" aria-label="Send">&#x27A4;</button>
    </form>
  );
}
