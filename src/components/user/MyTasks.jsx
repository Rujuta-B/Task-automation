import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { useTask } from '../../context/TaskContext';
import { getPriorityColor, getStatusColor } from '../../utils/helpers';

const MyTasks = ({ currentUser }) => {
  const { state, dispatch } = useTask();
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const updateTaskStatus = (taskId, newStatus) => {
    dispatch({
      type: 'UPDATE_TASK_STATUS',
      payload: { id: taskId, status: newStatus }
    });
  };

  const getFilteredTasks = () => {
    let filtered = state.tasks.filter(task => task.assignedTo === currentUser.id);

    if (filterStatus !== 'all') {
      filtered = filtered.filter(task => task.status === filterStatus);
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter(task => task.priority === filterPriority);
    }

    return filtered;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Tasks</h2>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredTasks().map(task => (
          <div key={task.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{task.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{task.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Deadline:</span>
                <span className="text-gray-900">{task.deadline}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={task.status}
                onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm flex-1"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        ))}
        
        {getFilteredTasks().length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No tasks assigned to you yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTasks;