import React, { useState } from 'react';
import { useTask } from '../../contexts/TaskContext';
import { useAuth } from '../../hooks/useAuth';
import { getPriorityColor, getStatusColor } from '../../utils/helpers';

const MyTasks = () => {
  const { state } = useTask();
  const { currentUser } = useAuth();
  const [filterStatus, setFilterStatus] = useState('all');

  // Show loading state
  if (state.loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Show error state
  if (state.error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        {state.error}
      </div>
    );
  }

  // Filter tasks for current user
  const myTasks = state.tasks.filter(task => task.assignedTo === currentUser?.uid);

  // Filter by status if needed
  const filteredTasks = filterStatus === 'all' 
    ? myTasks 
    : myTasks.filter(task => task.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No tasks found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredTasks.map(task => (
            <div 
              key={task.id} 
              className="p-4 bg-white rounded-lg shadow-sm border border-gray-100"
            >
              <h3 className="font-medium text-gray-900">{task.title}</h3>
              <p className="mt-1 text-gray-600 text-sm">{task.description}</p>
              
              <div className="mt-4 flex items-center gap-3">
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                {task.dueDate && (
                  <span className="text-sm text-gray-500">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTasks;