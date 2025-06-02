export const getPriorityColor = (priority) => {
  switch(priority) {
    case 'high': return 'bg-red-100 text-red-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusColor = (status) => {
  switch(status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'in-progress': return 'bg-blue-100 text-blue-800';
    case 'pending': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getUserName = (userId, users) => {
  return users.find(u => u.id === userId)?.name || 'Unknown';
};

export const getStats = (tasks) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const overdueTasks = tasks.filter(t => 
    new Date(t.deadline) < new Date() && t.status !== 'completed'
  ).length;

  return { totalTasks, completedTasks, pendingTasks, inProgressTasks, overdueTasks };
};