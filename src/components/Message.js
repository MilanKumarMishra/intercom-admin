export default function Message({ msg }) {
  const isAgent = msg.sender === "agent";
  return (
    <div
      className={`flex items-start gap-2 ${
        isAgent ? "justify-end" : "justify-start"
      }`}
    >
      {!isAgent && (
        <img
          src="/avatar-user.png"
          alt="user"
          className="w-8 h-8 rounded-full"
        />
      )}
      <div
        className={`max-w-xs p-2 rounded-lg ${
          isAgent ? "bg-blue-100" : "bg-gray-200"
        }`}
      >
        <p className="text-sm">{msg.text}</p>
        <p className="text-xs text-gray-500 text-right mt-1">
          {new Date(msg.timestamp).toLocaleTimeString()}
        </p>
      </div>
      {isAgent && (
        <img
          src="/avatar-agent.png"
          alt="agent"
          className="w-8 h-8 rounded-full"
        />
      )}
    </div>
  );
}
