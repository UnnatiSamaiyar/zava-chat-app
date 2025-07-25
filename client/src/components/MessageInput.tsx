import React, { useState } from "react";

export default function MessageInput({ onSend }) {
const [text, setText] = useState("");

const handleSend = () => {
if (text.trim()) {
onSend(text);
setText("");
}
};

return (
<div className="p-4 border-t border-gray-200 flex gap-2 bg-white">
<input
type="text"
className="flex-1 px-4 py-2 border rounded-full outline-none focus:ring-2 ring-indigo-300"
placeholder="Type a message..."
value={text}
onChange={(e) => setText(e.target.value)}
onKeyDown={(e) => e.key === "Enter" && handleSend()}
/>
<button onClick={handleSend} className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition" >
Send
</button>
</div>
);
}