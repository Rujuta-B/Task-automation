import React from 'react';
import { getPriorityColor, getStatusColor, getUserName } from '../../utils/helpers';

const RecentTasks = ({ tasks, users }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Tasks</h3>
      <div className="space-y-3">
        {tasks.slice(0, 5).map(task => (
          <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">{task.title}</h4>
              <p className="text-sm text-gray-600">
                Assigned to: {getUserName(task.assignedTo, users)}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No tasks available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTasks;