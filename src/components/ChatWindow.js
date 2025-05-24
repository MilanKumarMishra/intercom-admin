import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Message from "./Message";

export default function ChatWindow({ selectedUser }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem(selectedUser.id)) || []
  );
  const bottomRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(selectedUser.id, JSON.stringify(messages));
  }, [messages, selectedUser.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { sender: "agent", text: input, timestamp: new Date() };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 relative">
      <div className="overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.03 }}
          >
            <Message msg={msg} />
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
