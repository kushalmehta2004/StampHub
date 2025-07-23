import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Settings, BarChart3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminQuickAccess = () => {
  const { user, isAuthenticated } = useAuth();

  // Only show for admin users
  if (!isAuthenticated || (!user?.isAdmin && user?.role !== 'admin')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-secondary-200 p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Shield className="w-5 h-5 text-primary-600" />
          <span className="text-sm font-medium text-secondary-900">Admin Panel</span>
        </div>
        
        <div className="space-y-2">
          <Link 
            to="/admin" 
            className="flex items-center space-x-2 text-sm text-secondary-700 hover:text-primary-600 transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          
          <Link 
            to="/admin/catalog" 
            className="flex items-center space-x-2 text-sm text-secondary-700 hover:text-primary-600 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Manage Content</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminQuickAccess;