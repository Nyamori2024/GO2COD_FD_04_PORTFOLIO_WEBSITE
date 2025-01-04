// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Assume role is stored in local storage after login

  if (!token || !allowedRoles.includes(userRole)) {
    // If no token or user role is not allowed, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If token exists and user role is allowed, render the outlet
  return <Outlet />;
};

export default ProtectedRoute;