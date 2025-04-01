import React from 'react';

const LogoutButton = ({ handleLogout }) => {
  return (
    <button
      onClick={handleLogout}
      className="bg-gray-500 text-white px-6 py-3 rounded-full mb-6 ml-4 hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
    >
      Logga ut
    </button>
  );
};

export default LogoutButton;
