import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChatPanel from '../components/ChatPanel';
import MessageInput from '../components/MessageInput';
import dummyChats from '../data/dummyChats';

const Dashboard = () => {
  const [chats, setChats] = useState(dummyChats);
  const [selectedChat, setSelectedChat] = useState(chats[0]);

  const handleSend = (msg) => {
    const updatedChats = chats.map(chat =>
      chat.id === selectedChat.id
        ? {
            ...chat,
            messages: [...chat.messages, { from: 'admin', text: msg }],
            lastMessage: msg
          }
        : chat
    );
    setChats(updatedChats);
    setSelectedChat(updatedChats.find(c => c.id === selectedChat.id));
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex flex-1">
          <div className="w-1/3 border-r p-4 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-2 rounded cursor-pointer hover:bg-gray-100 ${
                  chat.id === selectedChat.id ? 'bg-gray-200' : ''
                }`}
              >
                <h3 className="font-medium">{chat.user}</h3>
                <p className="text-sm text-gray-600">{chat.lastMessage}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col flex-1">
            <ChatPanel chat={selectedChat} />
            <MessageInput onSend={handleSend} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
