// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check if token exists in localStorage
  // You can also add more logic here (e.g., check token expiry)
  const token = localStorage.getItem('token');

  if (!token) {
    // If not logged in, redirect to Login page
    // 'replace' prevents them from hitting 'Back' to return to the protected page
    return <Navigate to="/login" replace />;
  }

  // If logged in, return the child routes
  return <Outlet />;
};

export default ProtectedRoute;