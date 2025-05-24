import { useState } from "react";
import axios from "axios";

export default function AICopilot({ selectedUser }) {
  const [suggestion, setSuggestion] = useState("");

  const getAIResponse = async () => {
    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: "How to respond to this customer?" }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );
      setSuggestion(res.data.choices[0].message.content);
    } catch (error) {
      setSuggestion("Something went wrong!");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">AI Copilot</h2>
      <p className="text-sm text-gray-600 mb-2">
        Ask AI about this conversation.
      </p>
      <button
        onClick={getAIResponse}
        className="px-3 py-2 bg-black text-white rounded"
      >
        Get Suggestion
      </button>
      <p className="text-sm mt-3">{suggestion}</p>
    </div>
  );
}
