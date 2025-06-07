import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, Eye, Users } from 'lucide-react';

const Sidebar = ({ currentUser }) => {
  const navLinkClasses = ({ isActive }) =>
    `w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <nav className="w-64 bg-white shadow-sm h-screen sticky top-0">
      <div className="p-4">
        <div className="space-y-2">
          <NavLink to="/dashboard" className={navLinkClasses}>
            <BarChart3 size={20} />
            <span>Dashboard</span>
          </NavLink>

          {currentUser?.role === 'admin' && (
            <NavLink to="/all-tasks" className={navLinkClasses}>
              <Eye size={20} />
              <span>All Tasks</span>
            </NavLink>
          )}

          <NavLink to="/my-tasks" className={navLinkClasses}>
            <Users size={20} />
            <span>My Tasks</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;