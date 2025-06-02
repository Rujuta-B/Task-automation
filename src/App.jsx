import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { useAuth } from './hooks/useAuth';
import LoginScreen from './components/auth/LoginScreen';
import MainLayout from './components/layout/MainLayout';

const AppRoutes = () => {
  const { currentUser, loginAsAdmin, loginAsUser, logout, users } = useAuth();

  return (
    <Routes>
      {/* Login route */}
      <Route
        path="/login"
        element={
          !currentUser ? (
            <LoginScreen
              onLoginAsAdmin={loginAsAdmin}
              onLoginAsUser={loginAsUser}
              users={users}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Protected routes */}
      <Route
        path="/*"
        element={
          currentUser ? (
            <MainLayout currentUser={currentUser} onLogout={logout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <TaskProvider>
        <AppRoutes />
      </TaskProvider>
    </Router>
  );
};

export default App;
