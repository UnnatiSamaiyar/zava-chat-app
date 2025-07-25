export default function Sidebar({ chats, onSelect, selectedId }) {
  return (
    <div className="w-1/4 bg-white border-r shadow-lg p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Chats</h2>
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onSelect(chat)}
          className={`cursor-pointer p-3 rounded-lg mb-2 hover:bg-indigo-100 ${
            selectedId === chat.id ? "bg-indigo-200" : ""
          }`}
        >
          <h3 className="font-semibold">{chat.name}</h3>
          <p className="text-sm text-gray-600 truncate">{chat.messages.slice(-1)[0]}</p>
        </div>
      ))}
    </div>
  );
}
