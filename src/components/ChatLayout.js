import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import AICopilot from "./AICopilot";
import { useState } from "react";
import { users } from "../data/users";

export default function ChatLayout() {
  const [selectedUser, setSelectedUser] = useState(users[0]);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <ChatWindow selectedUser={selectedUser} />
      <div className="hidden md:block lg:w-[30%] border-l">
        <AICopilot selectedUser={selectedUser} />
      </div>
    </div>
  );
}
