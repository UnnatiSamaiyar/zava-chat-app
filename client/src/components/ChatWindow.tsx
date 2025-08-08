import React, { useEffect, useRef, useState } from "react";
import { Smile, CheckCheck } from "lucide-react";
import EmojiPickerComponent from "./Features/EmojiPickerComponent";
import FileUploaderComponent from "./Features/FileUploaderComponent";
import VoiceRecorderComponent from "./Features/VoiceRecorderComponent ";
import Meeting from "./Features/Meeting"; // ✅ Renamed GoogleMeetLauncher to Meeting

export default function ChatWindow({ chat }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey, how are you?", sender: "user", time: "4:01 PM", status: "sent" },
    { id: 2, text: "I'm good! You?", sender: "receiver", time: "4:02 PM" },
  ]);
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: input,
        sender: "user",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "sent",
      },
    ]);
    setInput("");
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
  };

  const handleFileUpload = (file) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: `📎 ${file.name}`,
        sender: "user",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "sent",
      },
    ]);
  };

  const handleVoiceNote = (audioUrl, duration) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: `🎤 Voice Message (${duration})`,
        audio: audioUrl,
        sender: "user",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "sent",
      },
    ]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chat]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "e") {
        e.preventDefault();
        setShowEmojiPicker((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="border-b px-6 py-4 flex justify-between items-center bg-white">
        <div>
          <h2 className="text-lg font-semibold">{chat.name}</h2>
          <p className="text-sm text-gray-500">
            {chat.online ? "Online" : `Last seen: ${chat.lastSeen}`}
          </p>
        </div>
        <div className="text-gray-500 text-xl">⋮</div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-xl shadow-sm relative ${
              msg.sender === "user"
                ? "bg-indigo-100 self-end text-right ml-auto"
                : "bg-white self-start text-left"
            }`}
          >
            {msg.audio ? (
              <audio controls src={msg.audio} className="w-full" />
            ) : (
              <div className="text-sm">{msg.text}</div>
            )}
            <div className="text-xs text-gray-500 mt-1 flex justify-end items-center gap-1">
              {msg.time}
              {msg.sender === "user" && <CheckCheck size={14} className="text-indigo-500" />}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && <EmojiPickerComponent onEmojiClick={handleEmojiClick} />}

      {/* Input Area */}
      <div className="border-t px-6 py-3 flex items-center gap-3 bg-white flex-wrap">
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="text-gray-500 hover:text-indigo-600 transition"
        >
          <Smile size={22} />
        </button>

        <FileUploaderComponent onFileUpload={handleFileUpload} />
        <VoiceRecorderComponent onSend={handleVoiceNote} />
        <Meeting /> {/* ✅ Added here */}

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
