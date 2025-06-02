export const initialUsers = [
  { id: 1, name: 'Admin User', email: 'admin@company.com', role: 'admin' },
  { id: 2, name: 'John Doe', email: 'john@company.com', role: 'user' },
  { id: 3, name: 'Jane Smith', email: 'jane@company.com', role: 'user' },
  { id: 4, name: 'Mike Johnson', email: 'mike@company.com', role: 'user' }
];

export const initialTasks = [
  {
    id: 1,
    title: 'Design Landing Page',
    description: 'Create responsive landing page for new product launch',
    assignedTo: 2,
    priority: 'high',
    status: 'in-progress',
    deadline: '2025-06-05',
    createdAt: '2025-05-28',
    createdBy: 1
  },
  {
    id: 2,
    title: 'API Integration',
    description: 'Integrate payment gateway API with checkout system',
    assignedTo: 3,
    priority: 'medium',
    status: 'pending',
    deadline: '2025-06-10',
    createdAt: '2025-05-29',
    createdBy: 1
  },
  {
    id: 3,
    title: 'Database Optimization',
    description: 'Optimize database queries for better performance',
    assignedTo: 2,
    priority: 'low',
    status: 'completed',
    deadline: '2025-06-01',
    createdAt: '2025-05-25',
    createdBy: 1
  }
];