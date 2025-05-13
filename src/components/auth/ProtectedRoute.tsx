import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: 'coach' | 'client';
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    // If user is coach but tries to access client route, redirect to coach dashboard
    if (user.role === 'coach') {
      return <Navigate to="/coach" replace />;
    }
    // If user is client but tries to access coach route, redirect to client dashboard
    if (user.role === 'client') {
      return <Navigate to="/client" replace />;
    }
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;