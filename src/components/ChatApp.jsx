import React, { useEffect, useRef, useState } from 'react';
import { Smile, Send, User, Bot, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const DUMMY_USERS = [
  { id: 'user1', name: 'Akanksha', avatar: <User className="text-pink-500" /> },
  { id: 'user2', name: 'Rahul', avatar: <User className="text-green-500" /> },
];

const ChatApp = () => {
  const [currentUser, setCurrentUser] = useState(DUMMY_USERS[0]);
  const [allChats, setAllChats] = useState(() => {
    const saved = localStorage.getItem('intercom-chats');
    return saved ? JSON.parse(saved) : {};
  });
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  const currentUserId = currentUser.id;
  const chats = allChats[currentUserId] || [];

  const updateChat = (updatedChat) => {
    const newChats = { ...allChats, [currentUserId]: updatedChat };
    setAllChats(newChats);
    localStorage.setItem('intercom-chats', JSON.stringify(newChats));
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats, typing]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = {
      sender: currentUser.name,
      avatar: currentUser.avatar,
      message: input,
      fromUser: true,
      timestamp: new Date().toISOString(),
    };

    const updated = [...chats, userMsg];
    updateChat(updated);
    setInput('');
    setTyping(true);

    try {
      // Realistic AI copilot context using chat history
      const messagesForAI = updated.map((m) => ({
        role: m.fromUser ? 'user' : 'assistant',
        content: m.message,
      }));

      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: messagesForAI,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer YOUR_OPENAI_API_KEY`,
          },
        }
      );

      const reply = res.data.choices[0].message.content;

      const aiReply = {
        sender: 'AI Copilot',
        avatar: <Bot className="text-blue-500" />,
        message: reply,
        fromUser: false,
        timestamp: new Date().toISOString(),
      };

      updateChat([...updated, aiReply]);
    } catch (err) {
      console.error('AI error', err);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="h-screen flex flex-col sm:w-full md:w-[80%] lg:w-[60%] mx-auto border rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 flex justify-between items-center">
        <h1 className="font-semibold text-lg text-gray-800 dark:text-gray-200">AI Copilot Chat</h1>
        <select
          value={currentUser.id}
          onChange={(e) => setCurrentUser(DUMMY_USERS.find(u => u.id === e.target.value))}
          className="border rounded px-2 py-1 text-sm dark:bg-gray-700 dark:text-white"
        >
          {DUMMY_USERS.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white dark:bg-gray-900">
        {chats.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: msg.fromUser ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex ${msg.fromUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex items-end gap-2 max-w-[75%]">
              {!msg.fromUser && <div className="w-6 h-6">{msg.avatar}</div>}
              <div
                className={`px-3 py-2 rounded-xl text-sm ${
                  msg.fromUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                }`}
              >
                {msg.message}
              </div>
              {msg.fromUser && <div className="w-6 h-6">{msg.avatar}</div>}
            </div>
          </motion.div>
        ))}
        {typing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-400 flex items-center gap-2"
          >
            <Loader className="w-4 h-4 animate-spin" />
            AI is typing...
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t flex items-center bg-gray-50 dark:bg-gray-800 gap-2">
        <Smile className="text-gray-500" />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 rounded-lg border text-sm focus:outline-none"
        />
        <button onClick={handleSend} className="text-blue-600 hover:text-blue-800">
          <Send />
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
