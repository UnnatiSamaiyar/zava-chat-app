// src/pages/Home.tsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

const users = [
  { id: 1, name: "Alice", lastMessage: "Hey there!", online: true, lastSeen: "Today at 4:00 PM" },
  { id: 2, name: "Bob", lastMessage: "How’s it going?", online: false, lastSeen: "Today at 3:15 PM" },
  { id: 3, name: "Charlie", lastMessage: "Let’s meet tomorrow.", online: true, lastSeen: "Today at 2:00 PM" },
];

export default function Home() {
  const [selectedUser, setSelectedUser] = useState(users[0]);

  return (
    <div className="h-screen w-screen flex bg-white text-gray-900 relative">
      <Sidebar chats={users} selectedId={selectedUser.id} onSelect={setSelectedUser} />
      <ChatWindow chat={selectedUser} />
    </div>
  );
}
