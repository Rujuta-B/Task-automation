import React from 'react';

const StatsCard = ({ title, value, icon: Icon, color = 'gray' }) => {
  const colorClasses = {
    gray: 'text-gray-400',
    green: 'text-green-400',
    blue: 'text-blue-400',
    orange: 'text-orange-400',
    red: 'text-red-400'
  };

  const valueColorClasses = {
    gray: 'text-gray-900',
    green: 'text-green-600',
    blue: 'text-blue-600',
    orange: 'text-orange-600',
    red: 'text-red-600'
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className={`text-2xl font-bold ${valueColorClasses[color]}`}>{value}</p>
        </div>
        <Icon className={colorClasses[color]} size={24} />
      </div>
    </div>
  );
};

export default StatsCard;