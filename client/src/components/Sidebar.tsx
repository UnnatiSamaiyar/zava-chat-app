// src/components/Sidebar.tsx
import React from "react";

export default function Sidebar({ chats, onSelect, selectedId }) {
  return (
    <div className="w-[300px] border-r p-4 overflow-y-auto bg-white shadow">
      <h2 className="text-2xl font-bold mb-4">Zava.chat</h2>
      <div className="space-y-2">
        {chats.map((user) => (
          <div
            key={user.id}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
              selectedId === user.id ? "bg-indigo-100" : "hover:bg-gray-100"
            }`}
            onClick={() => onSelect(user)}
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
  );
}
