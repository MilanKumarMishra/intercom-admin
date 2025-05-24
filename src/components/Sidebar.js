export default function Sidebar({ selectedUser, setSelectedUser }) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  return (
    <div className="w-full lg:w-[25%] border-r p-4 space-y-2">
      <h2 className="text-lg font-semibold mb-4">Your Inbox</h2>
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => setSelectedUser(user)}
          className={`cursor-pointer p-2 rounded ${
            selectedUser.id === user.id ? "bg-gray-200" : ""
          }`}
        >
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-gray-500">{user.lastMessage}</div>
        </div>
      ))}
    </div>
  );
}
