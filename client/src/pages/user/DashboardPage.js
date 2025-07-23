import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wallet, 
  Package, 
  Heart, 
  User, 
  TrendingUp, 
  ShoppingCart,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import QuickActions from '../../components/dashboard/QuickActions';

const DashboardPage = () => {
  const { user } = useAuth();
  const [walletBalance, setWalletBalance] = useState(0);
  const [dashboardData, setDashboardData] = useState({
    balance: 0,
    recentOrders: [],
    wishlistCount: 0,
    totalOrders: 0,
    totalSpent: 0
  });

  useEffect(() => {
    if (!user?.id) return;

    // Get wallet balance from localStorage
    const storedBalance = localStorage.getItem(`wallet_${user?.id}`);
    const balance = storedBalance ? parseFloat(storedBalance) : (user?.walletBalance || 0);
    setWalletBalance(balance);

    // Get orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem(`orders_${user?.id}`) || '[]');
    
    // Get wishlist from localStorage (assuming you have a wishlist system)
    const storedWishlist = JSON.parse(localStorage.getItem(`wishlist_${user?.id}`) || '[]');

    // Calculate dashboard stats
    const totalSpent = storedOrders.reduce((sum, order) => sum + order.total, 0);
    const recentOrders = storedOrders.slice(0, 3).map(order => ({
      id: order.id,
      items: order.items.length,
      total: order.total,
      status: order.status,
      date: order.date,
      itemName: order.items[0]?.name || 'Multiple items'
    }));

    setDashboardData({
      balance: balance,
      recentOrders: recentOrders,
      wishlistCount: storedWishlist.length,
      totalOrders: storedOrders.length,
      totalSpent: totalSpent
    });
  }, [user]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'shipped':
        return <Package className="w-4 h-4 text-blue-600" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-secondary-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'shipped':
        return 'text-blue-600 bg-blue-50';
      case 'processing':
        return 'text-yellow-600 bg-yellow-50';
      case 'confirmed':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-secondary-600 bg-secondary-50';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-secondary-600">
            Here's what's happening with your philatelic collection
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Account Balance */}
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Account Balance</p>
                  <p className="text-2xl font-bold text-primary-600">
                    {formatCurrency(dashboardData.balance)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-primary-600" />
                </div>
              </div>
              <Link to="/wallet" className="text-sm text-primary-600 hover:text-primary-700 font-medium mt-2 inline-block">
                Manage Wallet →
              </Link>
            </div>
          </div>

          {/* Total Orders */}
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Total Orders</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {dashboardData.totalOrders}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <Link to="/orders" className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-2 inline-block">
                View All →
              </Link>
            </div>
          </div>

          {/* Wishlist Items */}
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Wishlist Items</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {dashboardData.wishlistCount}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <Link to="/wishlist" className="text-sm text-red-600 hover:text-red-700 font-medium mt-2 inline-block">
                View Wishlist →
              </Link>
            </div>
          </div>

          {/* Total Spent */}
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Total Spent</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    ₹{dashboardData.totalSpent.toFixed(2)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-sm text-green-600 mt-2">
                +12% from last month
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-secondary-900">Recent Orders</h2>
                  <Link to="/orders" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View All
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  {dashboardData.recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-secondary-600" />
                        </div>
                        <div>
                          <p className="font-medium text-secondary-900">Order {order.id}</p>
                          <p className="text-sm text-secondary-600">{order.itemName}</p>
                          <p className="text-xs text-secondary-500">{order.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          {getStatusIcon(order.status)}
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-secondary-900">₹{order.total}</p>
                        <p className="text-xs text-secondary-500">{order.items} items</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {dashboardData.recentOrders.length === 0 && (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-secondary-300 mx-auto mb-4" />
                    <p className="text-secondary-600 mb-4">No orders yet</p>
                    <Link to="/catalog" className="btn-primary">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Quick Actions */}
          <div className="space-y-6">
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;