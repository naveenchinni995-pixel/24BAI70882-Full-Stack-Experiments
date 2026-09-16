import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getRole } from "../utils/token";

function ProtectedRoute({ children, allowedRoles }) {

  // Check if user is logged in
  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }

  // Get current user's role
  const role = getRole();

  // Check if role is allowed
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  // Allow access
  return children;
}

export default ProtectedRoute;