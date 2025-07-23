import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Eye, 
  Download,
  Truck,
  DollarSign,
  Calendar,
  User,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Mail,
  Phone,
  CreditCard,
  FileText,
  Printer,
  Send,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Plus,
  MessageSquare
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState('');
  const [filterDateRange, setFilterDateRange] = useState('');
  const [sortBy, setSortBy] = useState('orderDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderStats, setOrderStats] = useState({});

  // Orders data - will be fetched from API
  const sampleOrders = [];

  const orderStatuses = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'returned', label: 'Returned' },
    { value: 'refunded', label: 'Refunded' }
  ];

  const paymentStatuses = [
    { value: '', label: 'All Payment Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'paid', label: 'Paid' },
    { value: 'failed', label: 'Failed' },
    { value: 'refunded', label: 'Refunded' },
    { value: 'partially_refunded', label: 'Partially Refunded' }
  ];

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setOrders(sampleOrders);
      setOrderStats({
        total: sampleOrders.length,
        pending: sampleOrders.filter(o => o.status === 'pending').length,
        processing: sampleOrders.filter(o => o.status === 'processing').length,
        shipped: sampleOrders.filter(o => o.status === 'shipped').length,
        delivered: sampleOrders.filter(o => o.status === 'delivered').length,
        cancelled: sampleOrders.filter(o => o.status === 'cancelled').length,
        totalRevenue: sampleOrders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.total : 0), 0),
        avgOrderValue: sampleOrders.length > 0 ? sampleOrders.reduce((sum, o) => sum + o.total, 0) / sampleOrders.length : 0
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and sort orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !filterStatus || order.status === filterStatus;
    const matchesPaymentStatus = !filterPaymentStatus || order.paymentStatus === filterPaymentStatus;
    
    return matchesSearch && matchesStatus && matchesPaymentStatus;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (sortBy === 'customer') {
      aValue = a.customer.name;
      bValue = b.customer.name;
    }
    
    if (typeof aValue === 'string') {
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    
    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'returned':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      case 'partially_refunded':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Order Management</h1>
            <p className="text-secondary-600 mt-1">Manage and track all customer orders</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="btn-outline btn-sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <Link to="/admin/orders/new" className="btn-primary btn-sm">
              <Plus className="w-4 h-4 mr-2" />
              Create Order
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Total Orders</p>
                  <p className="text-2xl font-bold text-secondary-900">{orderStats.total || 0}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Pending Orders</p>
                  <p className="text-2xl font-bold text-secondary-900">{orderStats.pending || 0}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Revenue</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {formatCurrency(orderStats.totalRevenue || 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Avg Order Value</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {formatCurrency(Math.round(orderStats.avgOrderValue) || 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card mb-8">
          <div className="card-body">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
                  <input
                    type="text"
                    placeholder="Search orders, customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="input-field min-w-[150px]"
                >
                  {orderStatuses.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                
                <select
                  value={filterPaymentStatus}
                  onChange={(e) => setFilterPaymentStatus(e.target.value)}
                  className="input-field min-w-[150px]"
                >
                  {paymentStatuses.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary-200">
                  <th className="text-left py-4 px-6 font-semibold text-secondary-900">Order</th>
                  <th className="text-left py-4 px-6 font-semibold text-secondary-900">Customer</th>
                  <th className="text-left py-4 px-6 font-semibold text-secondary-900">Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-secondary-900">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-secondary-900">Payment</th>
                  <th className="text-left py-4 px-6 font-semibold text-secondary-900">Total</th>
                  <th className="text-left py-4 px-6 font-semibold text-secondary-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedOrders.length === 0 && !isLoading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12">
                      <div className="flex flex-col items-center">
                        <Package className="w-12 h-12 text-secondary-400 mb-4" />
                        <h3 className="text-lg font-medium text-secondary-900 mb-2">No orders found</h3>
                        <p className="text-secondary-600">No orders match your current filters.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  sortedOrders.map((order) => (
                    <tr key={order.id} className="border-b border-secondary-100 hover:bg-secondary-50">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-secondary-900">{order.orderNumber}</p>
                          <p className="text-sm text-secondary-600">{order.items?.length || 0} items</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-secondary-900">{order.customer?.name}</p>
                          <p className="text-sm text-secondary-600">{order.customer?.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-secondary-900">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-medium text-secondary-900">
                          {formatCurrency(order.total)}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button className="btn-outline btn-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </button>
                          <button className="btn-outline btn-xs">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;