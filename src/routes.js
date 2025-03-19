import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Attendance from './components/attendance/Attendance';
import Reports from './components/reports/Reports';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import ProfilePage from './pages/Profile/Profile';
import Leave from './components/leave/leave';
import Payroll from './components/payroll/Payroll';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Redirect based on authentication */}
      <Route 
        path="/" 
        element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
      />
      
      {/* Authentication Routes */}
      <Route 
        path="/login" 
        element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Register />} 
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <Attendance />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

<Route
  path="/leave"
  element={
    <ProtectedRoute>
      <Leave />
    </ProtectedRoute>
  }
/>


<Route
  path="/payroll"
  element={
    <ProtectedRoute>
      <Payroll />
    </ProtectedRoute>
  }
/>



      {/* Fallback Route for Undefined Paths */}
      <Route 
        path="*" 
        element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} replace />} 
      />
    </Routes>
  );
};

export default AppRoutes;
