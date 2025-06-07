import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.jsx';
import LoginScreen from './components/auth/LoginScreen';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import AllTasks from './components/tasks/AllTasks';
import MyTasks from './components/user/MyTasks';


// Layout for protected routes
const ProtectedLayout = () => {
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    // This should ideally not be reached if ProtectedRoute is working,
    // but as a fallback.
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} onLogout={logout} />
      <div className="flex">
        <Sidebar currentUser={currentUser} /> {/* Sidebar will use NavLink */}
        <main className="flex-1 p-6">
          <Outlet /> {/* Nested routes render here */}
        </main>
      </div>
    </div>
  );
};

// Component to protect routes
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading authentication status...</div>; // Or a proper loader/spinner
  }

  return currentUser ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const { currentUser, loading } = useAuth();
console.log(currentUser)
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
        <Route 
          path="all-tasks" 
          element={
            currentUser?.role === 'admin' 
              ? <AllTasks /> 
              : <Navigate to="/dashboard" replace />
          } 
        />
        <Route path="my-tasks" element={<MyTasks />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};


export default App;