import React from 'react';

const Header = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Inbox</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        New Chat
      </button>
    </div>
  );
};

export default Header;
