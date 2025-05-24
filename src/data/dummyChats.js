const dummyChats = [
  {
    id: 1,
    user: 'Alice',
    lastMessage: 'How can I reset my password?',
    messages: [
      { from: 'user', text: 'How can I reset my password?' },
      { from: 'admin', text: 'Go to Settings > Security > Reset Password.' }
    ]
  },
  {
    id: 2,
    user: 'Bob',
    lastMessage: 'Thank you!',
    messages: [
      { from: 'user', text: 'Thank you!' },
      { from: 'admin', text: 'You’re welcome!' }
    ]
  }
];

export default dummyChats;
