import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp,
  Eye,
  Plus,
  AlertCircle,
  FileText,
  Calendar,
  Star,
  DollarSign,
  Activity,
  BarChart3,
  Settings,
  Bell,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [recentActivity, setRecentActivity] = useState([]);
  const [pendingActions, setPendingActions] = useState([]);

  // Sample dashboard data - In real app, this would come from API
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Catalog Items',
      value: '856',
      change: '+5%',
      changeType: 'positive',
      icon: Package,
      color: 'green'
    },
    {
      title: 'Total Orders',
      value: '2,341',
      change: '+18%',
      changeType: 'positive',
      icon: ShoppingCart,
      color: 'purple'
    },
    {
      title: 'Revenue',
      value: '₹1,23,450',
      change: '+25%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'yellow'
    },
    {
      title: 'News Articles',
      value: '42',
      change: '+3%',
      changeType: 'positive',
      icon: FileText,
      color: 'indigo'
    },
    {
      title: 'Active Events',
      value: '8',
      change: '+2%',
      changeType: 'positive',
      icon: Calendar,
      color: 'red'
    }
  ];

  const quickActions = [
    {
      title: 'Add New Stamp',
      description: 'Add stamps to catalog',
      icon: Plus,
      color: 'bg-blue-100 text-blue-600',
      href: '/admin/catalog/new',
      action: 'create'
    },
    {
      title: 'Manage Orders',
      description: 'View and update orders',
      icon: ShoppingCart,
      color: 'bg-green-100 text-green-600',
      href: '/admin/orders',
      action: 'manage'
    },
    {
      title: 'Create News Article',
      description: 'Publish news and updates',
      icon: FileText,
      color: 'bg-purple-100 text-purple-600',
      href: '/admin/news/new',
      action: 'create'
    },
    {
      title: 'Add Event',
      description: 'Create new events',
      icon: Calendar,
      color: 'bg-orange-100 text-orange-600',
      href: '/admin/events/new',
      action: 'create'
    },
    {
      title: 'User Management',
      description: 'Manage user accounts',
      icon: Users,
      color: 'bg-indigo-100 text-indigo-600',
      href: '/admin/users',
      action: 'manage'
    },
    {
      title: 'Site Settings',
      description: 'Configure platform settings',
      icon: Settings,
      color: 'bg-gray-100 text-gray-600',
      href: '/admin/settings',
      action: 'configure'
    }
  ];

  const recentActivityData = [
    {
      id: '1',
      type: 'order',
      message: 'New order #ORD-001 received',
      user: 'Priya Sharma',
      timestamp: '5 minutes ago',
      status: 'pending',
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      id: '2',
      type: 'user',
      message: 'New user registration',
      user: 'Amit Kumar',
      timestamp: '15 minutes ago',
      status: 'completed',
      icon: Users,
      color: 'text-green-600'
    },
    {
      id: '3',
      type: 'inventory',
      message: 'Gandhi Anniversary stamp out of stock',
      user: 'System',
      timestamp: '1 hour ago',
      status: 'warning',
      icon: AlertCircle,
      color: 'text-yellow-600'
    },
    {
      id: '4',
      type: 'article',
      message: 'News article published',
      user: 'Admin',
      timestamp: '2 hours ago',
      status: 'completed',
      icon: FileText,
      color: 'text-purple-600'
    }
  ];

  const pendingActionsData = [
    {
      id: '1',
      title: 'Review Order Cancellation',
      description: 'Order #ORD-045 cancellation request',
      priority: 'high',
      action: 'review'
    },
    {
      id: '2',
      title: 'Approve New Stamp Listing',
      description: 'Mysore State stamp pending approval',
      priority: 'medium',
      action: 'approve'
    },
    {
      id: '3',
      title: 'Update Stock Levels',
      description: '12 items need stock updates',
      priority: 'low',
      action: 'update'
    }
  ];

  const contentSummary = [
    {
      category: 'Stamps',
      total: 856,
      published: 798,
      draft: 45,
      outOfStock: 13,
      color: 'blue'
    },
    {
      category: 'News',
      total: 42,
      published: 38,
      draft: 4,
      archived: 12,
      color: 'purple'
    },
    {
      category: 'Events',
      total: 15,
      active: 8,
      upcoming: 5,
      completed: 2,
      color: 'green'
    }
  ];

  useEffect(() => {
    setRecentActivity(recentActivityData);
    setPendingActions(pendingActionsData);
  }, []);

  const getStatColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      indigo: 'bg-indigo-100 text-indigo-600',
      red: 'bg-red-100 text-red-600'
    };
    return colors[color] || 'bg-gray-100 text-gray-600';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-600 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-600 border-green-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'pending':
        return <Activity className="w-4 h-4 text-blue-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Admin Dashboard</h1>
            <p className="text-secondary-600 mt-1">Manage your philatelic platform</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="relative p-2 text-secondary-600 hover:text-primary-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
            <Link to="/admin/settings" className="btn-outline btn-sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="card">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStatColor(stat.color)}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-1">{stat.value}</h3>
                  <p className="text-sm text-secondary-600">{stat.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="card mb-8">
          <div className="card-header">
            <h2 className="text-xl font-semibold text-secondary-900">Quick Actions</h2>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={index}
                    to={action.href}
                    className="p-4 border border-secondary-200 rounded-lg hover:border-primary-300 hover:shadow-sm transition-all duration-200 group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-secondary-600 mt-1">{action.description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Activity */}
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-secondary-900">Recent Activity</h2>
                <Link to="/admin/activity" className="text-sm text-primary-600 hover:text-primary-700">
                  View All
                </Link>
              </div>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center ${activity.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-secondary-900">{activity.message}</p>
                          {getStatusIcon(activity.status)}
                        </div>
                        <p className="text-xs text-secondary-600 mt-1">
                          by {activity.user} • {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pending Actions */}
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-secondary-900">Pending Actions</h2>
                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                  {pendingActions.length}
                </span>
              </div>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                {pendingActions.map((action) => (
                  <div key={action.id} className={`p-3 border rounded-lg ${getPriorityColor(action.priority)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{action.title}</h4>
                      <span className="text-xs font-medium uppercase">{action.priority}</span>
                    </div>
                    <p className="text-xs opacity-80 mb-3">{action.description}</p>
                    <div className="flex items-center space-x-2">
                      <button className="btn-primary btn-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approve
                      </button>
                      <button className="btn-outline btn-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Summary */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-semibold text-secondary-900">Content Management Summary</h2>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contentSummary.map((content, index) => (
                <div key={index} className="p-4 border border-secondary-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-secondary-900">{content.category}</h3>
                    <Link 
                      to={`/admin/${content.category.toLowerCase()}`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary-600">Total:</span>
                      <span className="font-medium">{content.total}</span>
                    </div>
                    {content.published && (
                      <div className="flex justify-between text-sm">
                        <span className="text-secondary-600">Published:</span>
                        <span className="font-medium text-green-600">{content.published}</span>
                      </div>
                    )}
                    {content.active && (
                      <div className="flex justify-between text-sm">
                        <span className="text-secondary-600">Active:</span>
                        <span className="font-medium text-green-600">{content.active}</span>
                      </div>
                    )}
                    {content.draft && (
                      <div className="flex justify-between text-sm">
                        <span className="text-secondary-600">Draft:</span>
                        <span className="font-medium text-yellow-600">{content.draft}</span>
                      </div>
                    )}
                    {content.outOfStock && (
                      <div className="flex justify-between text-sm">
                        <span className="text-secondary-600">Out of Stock:</span>
                        <span className="font-medium text-red-600">{content.outOfStock}</span>
                      </div>
                    )}
                    {content.upcoming && (
                      <div className="flex justify-between text-sm">
                        <span className="text-secondary-600">Upcoming:</span>
                        <span className="font-medium text-blue-600">{content.upcoming}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;