export default function ChatWindow({ chat }) {
  return (
    <div className="flex-1 flex flex-col justify-between bg-gray-50 p-6">
      <div>
        <h2 className="text-xl font-bold mb-4 border-b pb-2">{chat.name}</h2>
        <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
          {chat.messages.map((msg, idx) => (
            <div key={idx} className="bg-white px-4 py-2 rounded-xl shadow w-fit">
              {msg}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full px-4 py-2 border rounded-xl shadow focus:outline-none"
          disabled
        />
      </div>
    </div>
  );
}
