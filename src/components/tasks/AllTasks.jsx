import React, { useState } from 'react';
import { Plus, Edit, Trash2, Filter } from 'lucide-react';
import { useTask } from '../../context/TaskContext';
import { getPriorityColor, getStatusColor, getUserName } from '../../utils/helpers';
import TaskModal from '../tasks/TaskModal';

const AllTasks = () => {
  const { state, dispatch } = useTask();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const openTaskModal = (task = null) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const deleteTask = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  const getFilteredTasks = () => {
    let filtered = state.tasks;

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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">All Tasks</h2>
        <button
          onClick={() => openTaskModal()}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Task</span>
        </button>
      </div>

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

      {/* Tasks Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deadline</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {getFilteredTasks().map(task => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-600">{task.description}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {getUserName(task.assignedTo, state.users)}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{task.deadline}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openTaskModal(task)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <TaskModal
          task={editingTask}
          onClose={() => setShowTaskModal(false)}
          users={state.users}
        />
      )}
    </div>
  );
};

export default AllTasks;