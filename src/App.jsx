import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import LoginScreen from './components/auth/LoginScreen';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import AllTasks from './components/tasks/AllTasks';
import MyTasks from './components/user/MyTasks';
import { TaskProvider } from './contexts/TaskContext';

// Layout for protected routes
const ProtectedLayout = () => {
  const { currentUser, logout, role } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} onLogout={logout} role={role} />
      <div className="flex">
        <Sidebar currentUser={currentUser} role={role} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Component to protect routes
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return currentUser ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const { currentUser, loading, role } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <TaskProvider>
        <Routes>
          <Route 
            path="/login" 
            element={!currentUser ? <LoginScreen /> : <Navigate to="/dashboard" replace />} 
          />

          <Route 
            path="/*"
            element={
              <ProtectedRoute>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="all-tasks" element={
              role === 'admin' ? <AllTasks /> : <Navigate to="/dashboard" replace />
            } />
            <Route path="my-tasks" element={<MyTasks />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>
        </Routes>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;