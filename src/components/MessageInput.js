export default function MessageInput() {
  return (
    <div className="p-4 border-t bg-white flex gap-2">
      <input
        className="flex-grow px-4 py-2 border rounded-full outline-none"
        placeholder="Type a message..."
      />
      <button className="bg-black text-white px-4 py-2 rounded-full">
        Send
      </button>
    </div>
  );
}
