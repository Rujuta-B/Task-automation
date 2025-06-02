import React from 'react';
import { Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import StatsCard from './StatsCard';
import RecentTasks from './RecentTasks';
import { getStats } from '../../utils/helpers';

const Dashboard = ({ tasks, users }) => {
  const stats = getStats(tasks);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
      
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
      {/* <RecentTasks tasks={tasks} users={users} /> */}
    </div>
  );
};

export default Dashboard;