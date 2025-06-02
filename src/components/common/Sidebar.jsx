import React from 'react';
import { BarChart3, Eye, Users } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, currentUser }) => {
  return (
    <nav className="w-64 bg-white shadow-sm h-screen sticky top-0">
      <div className="p-4">
        <div className="space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'dashboard' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <BarChart3 size={20} />
            <span>Dashboard</span>
          </button>

          {currentUser.role === 'admin' && (
            <button
              onClick={() => setActiveTab('all-tasks')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'all-tasks' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Eye size={20} />
              <span>All Tasks</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('my-tasks')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'my-tasks' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users size={20} />
            <span>My Tasks</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;