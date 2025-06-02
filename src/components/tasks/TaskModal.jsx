import React, { useState, useEffect } from 'react';
import { useTask } from '../../context/TaskContext';

const TaskModal = ({ task, onClose, users }) => {
  const { dispatch } = useTask();
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'medium',
    deadline: '',
    status: 'pending'
  });

  useEffect(() => {
    if (task) {
      setTaskForm({
        title: task.title,
        description: task.description,
        assignedTo: task.assignedTo,
        priority: task.priority,
        deadline: task.deadline,
        status: task.status
      });
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!taskForm.title || !taskForm.assignedTo || !taskForm.deadline) {
      alert('Please fill in all required fields');
      return;
    }

    if (task) {
      // Update existing task
      dispatch({
        type: 'UPDATE_TASK',
        payload: {
          ...task,
          ...taskForm,
          assignedTo: parseInt(taskForm.assignedTo)
        }
      });
    } else {
      // Create new task
      dispatch({
        type: 'ADD_TASK',
        payload: {
          ...taskForm,
          assignedTo: parseInt(taskForm.assignedTo),
          createdAt: new Date().toISOString().split('T')[0],
          createdBy: 1 // Assuming admin creates tasks
        }
      });
    }
    
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {task ? 'Edit Task' : 'Create New Task'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={taskForm.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter task title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={taskForm.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="3"
                placeholder="Enter task description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assign To *
              </label>
              <select
                name="assignedTo"
                value={taskForm.assignedTo}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select user</option>
                {users.filter(u => u.role === 'user').map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  name="priority"
                  value={taskForm.priority}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={taskForm.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deadline *
              </label>
              <input
                type="date"
                name="deadline"
                value={taskForm.deadline}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                {task ? 'Update' : 'Create'} Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;