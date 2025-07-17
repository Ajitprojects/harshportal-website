import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ allowAdmin }: { allowAdmin: boolean }) => {
  const { currentUser, authLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // This effect runs after the component renders, safely showing toasts.
    // We also wait for the initial auth check to complete before showing a toast.
    if (!authLoading) {
      if (!currentUser) {
        // Give the toast a unique ID to prevent duplicates if this effect runs again.
        toast.error("You must be logged in to view this page.", { id: 'auth-toast' });
      } else if (allowAdmin && currentUser.role !== 'Admin') {
        toast.error("You do not have permission to access this page.", { id: 'auth-toast' });
      }
    }
  }, [currentUser, authLoading, location, allowAdmin]); // Dependencies for the effect

  // If the initial authentication check is still loading, don't render anything yet.
  // This prevents redirects before the user's status is known.
  if (authLoading) {
    // You can replace this with a full-page loading spinner for a better UX
    return null; 
  }
  
  // --- Navigation Logic ---
  // This part runs during the render but no longer contains side effects.

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowAdmin && currentUser.role !== 'Admin') {
    return <Navigate to="/" replace />;
  }

  // If all checks pass, render the child page.
  return <Outlet />;
};

export default ProtectedRoute;