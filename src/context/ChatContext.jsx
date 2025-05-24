// src/context/ChatContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAIResponse } from '../utils/openai';

const ChatContext = createContext();

const USERS = [
  { id: 'user1', name: 'Akanksha', avatar: '🧕' },
  { id: 'user2', name: 'Milan', avatar: '👨‍💼' }
];

export const ChatProvider = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState(USERS[0].id);
  const [chatHistory, setChatHistory] = useState({});
  const [isAITyping, setIsAITyping] = useState(false);

  // Load from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem('chatHistory');
    if (stored) {
      setChatHistory(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const sendMessage = async (text) => {
    const timestamp = new Date().toISOString();
    const newMessage = { sender: 'user', text, timestamp };
    const updated = {
      ...chatHistory,
      [currentUserId]: [...(chatHistory[currentUserId] || []), newMessage]
    };
    setChatHistory(updated);

    setIsAITyping(true);
    const aiText = await getAIResponse(text);
    const aiMessage = { sender: 'ai', text: aiText, timestamp: new Date().toISOString() };

    setChatHistory((prev) => ({
      ...prev,
      [currentUserId]: [...(prev[currentUserId] || []), newMessage, aiMessage]
    }));
    setIsAITyping(false);
  };

  return (
    <ChatContext.Provider value={{
      USERS,
      currentUserId,
      setCurrentUserId,
      chatHistory: chatHistory[currentUserId] || [],
      sendMessage,
      isAITyping
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
