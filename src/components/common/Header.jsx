import React from 'react';

const Header = ({ currentUser, onLogout, role }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
          <span className="text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
            {role}
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Welcome, {currentUser.name}</span>
          <button
            onClick={onLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;