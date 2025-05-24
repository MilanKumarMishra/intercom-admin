export const users = [
  {
    id: "u1",
    name: "Luis - Github",
    lastMessage: "Hey! I have a question...",
  },
  {
    id: "u2",
    name: "Ivan - Nike",
    lastMessage: "Hi there, I have a qu...",
  },
  {
    id: "u3",
    name: "Lead from New York",
    lastMessage: "Good morning, let me...",
  },
];
localStorage.setItem("users", JSON.stringify(users));
