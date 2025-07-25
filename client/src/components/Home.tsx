import React, { useState, useRef, useEffect } from "react";
import { Smile, CheckCheck } from "lucide-react";

const Home = () => {
const users = [
{
id: 1,
name: "Alice",
lastMessage: "Hey there!",
online: true,
lastSeen: "Today at 4:00 PM",
},
{
id: 2,
name: "Bob",
lastMessage: "How’s it going?",
online: false,
lastSeen: "Today at 3:15 PM",
},
{
id: 3,
name: "Charlie",
lastMessage: "Let’s meet tomorrow.",
online: true,
lastSeen: "Today at 2:00 PM",
},
];

const [selectedUser, setSelectedUser] = useState(users[0]);
const [messages, setMessages] = useState([
{
id: 1,
text: "Hey, how are you?",
sender: "user",
time: "4:01 PM",
status: "sent",
},
{
id: 2,
text: "I'm good! You?",
sender: "receiver",
time: "4:02 PM",
},
]);
const [input, setInput] = useState("");
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
};

useEffect(() => {
messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages, selectedUser]);

return (
<div className="h-screen w-screen flex bg-white text-gray-900">
{/* Sidebar */}
<div className="w-[300px] border-r p-4 overflow-y-auto">
<h2 className="text-2xl font-bold mb-4">Zava.chat</h2>
<div className="space-y-2">
{users.map((user) => (
  <div
    key={user.id}
    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
      selectedUser.id === user.id ? "bg-indigo-100" : "hover:bg-gray-100"
    }`}
    onClick={() => setSelectedUser(user)}
  >
    <div className="relative">
      <div className="w-10 h-10 rounded-full bg-gray-300" />
      <span
        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
          user.online ? "bg-green-500" : "bg-gray-400"
        }`}
      />
    </div>
    <div>
      <p className="font-semibold">{user.name}</p>
      <p className="text-sm text-gray-500">{user.lastMessage}</p>
    </div>
  </div>
))}

</div>
</div>
  {/* Chat */}
  <div className="flex-1 flex flex-col">
    {/* Header */}
    <div className="border-b px-6 py-4 flex justify-between items-center bg-white">
      <div>
        <h2 className="text-lg font-semibold">{selectedUser.name}</h2>
        <p className="text-sm text-gray-500">
          {selectedUser.online ? "Online" : `Last seen: ${selectedUser.lastSeen}`}
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
          <div className="text-sm">{msg.text}</div>
          <div className="text-xs text-gray-500 mt-1 flex justify-end items-center gap-1">
            {msg.time}
            {msg.sender === "user" && <CheckCheck size={14} className="text-indigo-500" />}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>

    {/* Message Input */}
    <div className="border-t px-6 py-3 flex items-center gap-3 bg-white">
      <button className="text-gray-500 hover:text-indigo-600 transition">
        <Smile size={22} />
      </button>
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
</div>
);
};

export default Home;