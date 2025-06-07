import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getAllTasks, getEmployeeTasks } from '../../api/action';
import StatsCard from './StatsCard';
import RecentTasks from './RecentTasks';
import { getStats } from '../../utils/helpers';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
console.log('cc',currentUser)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        let fetchedTasks = [];

        if (currentUser?.role === 'admin') {
          // Admins can see all tasks
          fetchedTasks = await getAllTasks();
        } else {
          // Regular users only see their assigned tasks
          fetchedTasks = await getEmployeeTasks(currentUser.uid);
        }

        setTasks(fetchedTasks);
        setError(null);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to load tasks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchTasks();
    }
  }, [currentUser]);

  const stats = getStats(tasks);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {currentUser?.role === 'admin' ? 'Dashboard Overview' : 'My Tasks Overview'}
        </h2>
        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
          {currentUser?.role === 'admin' ? 'Admin View' : 'Employee View'}
        </span>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatsCard
          title="Total Tasks"
          value={stats.totalTasks}
          icon={Calendar}
          color="gray"
        />
        <StatsCard
          title="Completed"
          value={stats.completedTasks}
          icon={CheckCircle}
          color="green"
        />
        <StatsCard
          title="In Progress"
          value={stats.inProgressTasks}
          icon={Clock}
          color="blue"
        />
        <StatsCard
          title="Pending"
          value={stats.pendingTasks}
          icon={Clock}
          color="orange"
        />
        <StatsCard
          title="Overdue"
          value={stats.overdueTasks}
          icon={AlertCircle}
          color="red"
        />
      </div>

      {/* Recent Tasks */}
      <RecentTasks 
        tasks={tasks.slice(0, 5)} 
        isAdmin={currentUser?.role === 'admin'} 
      />
    </div>
  );
};

export default Dashboard;