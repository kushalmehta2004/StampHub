import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Ban, 
  Mail, 
  Phone, 
  Calendar,
  MapPin,
  Star,
  TrendingUp,
  UserCheck,
  UserX,
  Eye,
  Download,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Package,
  MessageCircle,
  Settings,
  BarChart3,
  FileText,
  Trash2,
  UserPlus,
  Activity,
  Globe,
  CreditCard,
  Heart,
  ShoppingCart,
  ChevronDown,
  Plus,
  Export
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterRegistrationDate, setFilterRegistrationDate] = useState('');
  const [sortBy, setSortBy] = useState('registrationDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userStats, setUserStats] = useState({});

  // Sample users data with comprehensive information
  const sampleUsers = [
    {
      id: '1',
      firstName: 'Rajesh',
      lastName: 'Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91-98765-43210',
      role: 'user',
      status: 'active',
      avatar: null,
      registrationDate: '2024-01-15',
      lastLogin: '2024-01-22',
      lastActivity: '2024-01-22T10:30:00Z',
      emailVerified: true,
      phoneVerified: true,
      address: {
        street: '123 MG Road',
        city: 'Bangalore',
        state: 'Karnataka',
        country: 'India',
        zipCode: '560001'
      },
      preferences: {
        newsletter: true,
        notifications: true,
        marketing: false
      },
      statistics: {
        totalOrders: 12,
        totalSpent: 4500,
        averageOrderValue: 375,
        wishlistItems: 8,
        reviewsCount: 5,
        averageRating: 4.2,
        referrals: 2,
        loyaltyPoints: 450
      },
      recentActivity: [
        { action: 'Placed order', details: 'Order #ORD-1234', timestamp: '2024-01-22T10:30:00Z' },
        { action: 'Added to wishlist', details: 'Gandhi Memorial Stamp', timestamp: '2024-01-21T15:20:00Z' },
        { action: 'Left review', details: '5 stars for Kerala Backwaters', timestamp: '2024-01-20T12:10:00Z' }
      ],
      loginHistory: [
        { ip: '192.168.1.100', location: 'Bangalore, India', timestamp: '2024-01-22T09:00:00Z' },
        { ip: '192.168.1.100', location: 'Bangalore, India', timestamp: '2024-01-21T18:30:00Z' }
      ]
    },
    {
      id: '2',
      firstName: 'Priya',
      lastName: 'Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91-87654-32109',
      role: 'premium',
      status: 'active',
      avatar: null,
      registrationDate: '2024-01-10',
      lastLogin: '2024-01-22',
      lastActivity: '2024-01-22T14:15:00Z',
      emailVerified: true,
      phoneVerified: false,
      address: {
        street: '456 CP Road',
        city: 'Delhi',
        state: 'Delhi',
        country: 'India',
        zipCode: '110001'
      },
      preferences: {
        newsletter: true,
        notifications: true,
        marketing: true
      },
      statistics: {
        totalOrders: 28,
        totalSpent: 12500,
        averageOrderValue: 446,
        wishlistItems: 15,
        reviewsCount: 12,
        averageRating: 4.8,
        referrals: 5,
        loyaltyPoints: 1250
      },
      recentActivity: [
        { action: 'Premium upgrade', details: 'Upgraded to premium membership', timestamp: '2024-01-22T14:15:00Z' },
        { action: 'Bulk purchase', details: 'Bought 5 commemorative stamps', timestamp: '2024-01-22T11:00:00Z' }
      ],
      loginHistory: [
        { ip: '203.192.1.50', location: 'Delhi, India', timestamp: '2024-01-22T08:30:00Z' }
      ]
    },
    {
      id: '3',
      firstName: 'Amit',
      lastName: 'Patel',
      email: 'amit.patel@email.com',
      phone: '+91-76543-21098',
      role: 'user',
      status: 'suspended',
      avatar: null,
      registrationDate: '2024-01-08',
      lastLogin: '2024-01-18',
      lastActivity: '2024-01-18T16:45:00Z',
      emailVerified: true,
      phoneVerified: true,
      address: {
        street: '789 Ring Road',
        city: 'Ahmedabad',
        state: 'Gujarat',
        country: 'India',
        zipCode: '380001'
      },
      preferences: {
        newsletter: false,
        notifications: true,
        marketing: false
      },
      statistics: {
        totalOrders: 3,
        totalSpent: 750,
        averageOrderValue: 250,
        wishlistItems: 2,
        reviewsCount: 1,
        averageRating: 2.0,
        referrals: 0,
        loyaltyPoints: 75
      },
      recentActivity: [
        { action: 'Account suspended', details: 'Violation of terms', timestamp: '2024-01-19T10:00:00Z' },
        { action: 'Disputed order', details: 'Order #ORD-5678', timestamp: '2024-01-18T16:45:00Z' }
      ],
      loginHistory: [
        { ip: '110.235.1.75', location: 'Ahmedabad, India', timestamp: '2024-01-18T14:00:00Z' }
      ]
    },
    {
      id: '4',
      firstName: 'Sneha',
      lastName: 'Reddy',
      email: 'sneha.reddy@email.com',
      phone: '+91-65432-10987',
      role: 'collector',
      status: 'active',
      avatar: null,
      registrationDate: '2024-01-20',
      lastLogin: '2024-01-22',
      lastActivity: '2024-01-22T16:20:00Z',
      emailVerified: true,
      phoneVerified: true,
      address: {
        street: '321 Jubilee Hills',
        city: 'Hyderabad',
        state: 'Telangana',
        country: 'India',
        zipCode: '500033'
      },
      preferences: {
        newsletter: true,
        notifications: true,
        marketing: true
      },
      statistics: {
        totalOrders: 45,
        totalSpent: 25000,
        averageOrderValue: 556,
        wishlistItems: 25,
        reviewsCount: 22,
        averageRating: 4.9,
        referrals: 8,
        loyaltyPoints: 2500
      },
      recentActivity: [
        { action: 'Expert consultation', details: 'Booked stamp valuation session', timestamp: '2024-01-22T16:20:00Z' },
        { action: 'Collection update', details: 'Added 10 rare stamps', timestamp: '2024-01-22T12:30:00Z' }
      ],
      loginHistory: [
        { ip: '115.245.1.25', location: 'Hyderabad, India', timestamp: '2024-01-22T15:00:00Z' }
      ]
    },
    {
      id: '5',
      firstName: 'Vikram',
      lastName: 'Singh',
      email: 'vikram.singh@email.com',
      phone: '+91-54321-09876',
      role: 'dealer',
      status: 'pending',
      avatar: null,
      registrationDate: '2024-01-22',
      lastLogin: '2024-01-22',
      lastActivity: '2024-01-22T17:00:00Z',
      emailVerified: true,
      phoneVerified: false,
      address: {
        street: '654 Civil Lines',
        city: 'Jaipur',
        state: 'Rajasthan',
        country: 'India',
        zipCode: '302001'
      },
      preferences: {
        newsletter: true,
        notifications: true,
        marketing: true
      },
      statistics: {
        totalOrders: 0,
        totalSpent: 0,
        averageOrderValue: 0,
        wishlistItems: 0,
        reviewsCount: 0,
        averageRating: 0,
        referrals: 0,
        loyaltyPoints: 0
      },
      recentActivity: [
        { action: 'Registration', details: 'Dealer account created', timestamp: '2024-01-22T17:00:00Z' },
        { action: 'Document upload', details: 'Business license submitted', timestamp: '2024-01-22T17:10:00Z' }
      ],
      loginHistory: [
        { ip: '122.155.1.88', location: 'Jaipur, India', timestamp: '2024-01-22T17:00:00Z' }
      ]
    }
  ];

  const roles = [
    { value: '', label: 'All Roles' },
    { value: 'user', label: 'Regular User' },
    { value: 'premium', label: 'Premium User' },
    { value: 'collector', label: 'Collector' },
    { value: 'dealer', label: 'Dealer' },
    { value: 'admin', label: 'Admin' }
  ];

  const statuses = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'banned', label: 'Banned' },
    { value: 'inactive', label: 'Inactive' }
  ];

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setUsers(sampleUsers);
      setUserStats({
        total: sampleUsers.length,
        active: sampleUsers.filter(u => u.status === 'active').length,
        pending: sampleUsers.filter(u => u.status === 'pending').length,
        suspended: sampleUsers.filter(u => u.status === 'suspended').length,
        newToday: 2,
        totalRevenue: sampleUsers.reduce((sum, u) => sum + u.statistics.totalSpent, 0)
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and sort users
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    const matchesRole = !filterRole || user.role === filterRole;
    const matchesStatus = !filterStatus || user.status === filterStatus;
    const matchesDate = !filterRegistrationDate || user.registrationDate >= filterRegistrationDate;
    return matchesSearch && matchesRole && matchesStatus && matchesDate;
  }).sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'suspended':
        return 'bg-red-100 text-red-600';
      case 'banned':
        return 'bg-red-100 text-red-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-600';
      case 'dealer':
        return 'bg-blue-100 text-blue-600';
      case 'collector':
        return 'bg-indigo-100 text-indigo-600';
      case 'premium':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'suspended':
        return <XCircle className="w-4 h-4" />;
      case 'banned':
        return <Ban className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on users:`, selectedUsers);
    
    switch (action) {
      case 'activate':
        setUsers(users => 
          users.map(user => 
            selectedUsers.includes(user.id) 
              ? { ...user, status: 'active' }
              : user
          )
        );
        toast.success(`${selectedUsers.length} user(s) activated`);
        break;
      case 'suspend':
        setUsers(users => 
          users.map(user => 
            selectedUsers.includes(user.id) 
              ? { ...user, status: 'suspended' }
              : user
          )
        );
        toast.success(`${selectedUsers.length} user(s) suspended`);
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${selectedUsers.length} user(s)?`)) {
          setUsers(users => users.filter(user => !selectedUsers.includes(user.id)));
          toast.success(`${selectedUsers.length} user(s) deleted`);
        }
        break;
      default:
        break;
    }
    
    setSelectedUsers([]);
    setShowBulkActions(false);
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users => 
      users.map(user => 
        user.id === userId 
          ? { ...user, status: newStatus }
          : user
      )
    );
    toast.success('User status updated');
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users => users.filter(user => user.id !== userId));
      toast.success('User deleted successfully');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const openUserModal = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  useEffect(() => {
    setShowBulkActions(selectedUsers.length > 0);
  }, [selectedUsers]);

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">User Management</h1>
            <p className="text-secondary-600 mt-1">Manage all users, roles, and permissions</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="btn-outline btn-sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button className="btn-outline btn-sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </button>
            <button className="btn-primary">
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Total Users</p>
                  <p className="text-2xl font-bold text-secondary-900">{userStats.total || 0}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Active Users</p>
                  <p className="text-2xl font-bold text-green-600">{userStats.active || 0}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{userStats.pending || 0}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Suspended</p>
                  <p className="text-2xl font-bold text-red-600">{userStats.suspended || 0}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <UserX className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">New Today</p>
                  <p className="text-2xl font-bold text-purple-600">{userStats.newToday || 0}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Total Revenue</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(userStats.totalRevenue || 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card mb-6">
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="input pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select 
                className="input"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>

              <select 
                className="input"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                {statuses.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>

              <input
                type="date"
                className="input"
                value={filterRegistrationDate}
                onChange={(e) => setFilterRegistrationDate(e.target.value)}
                placeholder="Registration date from"
              />

              <select 
                className="input"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="registrationDate">Registration Date</option>
                <option value="lastLogin">Last Login</option>
                <option value="firstName">Name</option>
                <option value="totalSpent">Total Spent</option>
                <option value="totalOrders">Total Orders</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {showBulkActions && (
          <div className="card mb-6 bg-blue-50 border-blue-200">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-blue-900">
                    {selectedUsers.length} user(s) selected
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleBulkAction('activate')}
                    className="btn-outline btn-sm text-green-600 border-green-300 hover:bg-green-50"
                  >
                    Activate
                  </button>
                  <button 
                    onClick={() => handleBulkAction('suspend')}
                    className="btn-outline btn-sm text-yellow-600 border-yellow-300 hover:bg-yellow-50"
                  >
                    Suspend
                  </button>
                  <button 
                    onClick={() => handleBulkAction('delete')}
                    className="btn-outline btn-sm text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-secondary-900">
                Users ({filteredUsers.length})
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="btn-outline btn-sm"
                >
                  {sortOrder === 'asc' ? '↑' : '↓'} Sort
                </button>
                <button
                  onClick={handleSelectAll}
                  className="btn-outline btn-sm"
                >
                  {selectedUsers.length === filteredUsers.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>
            </div>
          </div>
          <div className="card-body p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary-50 border-b border-secondary-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        <input
                          type="checkbox"
                          checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                          onChange={handleSelectAll}
                          className="rounded border-secondary-300"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Role & Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Activity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Statistics
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-secondary-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-secondary-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleSelectUser(user.id)}
                            className="rounded border-secondary-300"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-white font-medium">
                              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-secondary-900">
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="text-sm text-secondary-500">{user.email}</div>
                              <div className="text-xs text-secondary-400">{user.phone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                              {user.role}
                            </span>
                            <div className="flex items-center">
                              <select
                                value={user.status}
                                onChange={(e) => handleStatusChange(user.id, e.target.value)}
                                className={`text-xs px-2 py-1 rounded-full border-0 ${getStatusColor(user.status)}`}
                              >
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="suspended">Suspended</option>
                                <option value="banned">Banned</option>
                                <option value="inactive">Inactive</option>
                              </select>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                          <div className="space-y-1">
                            <div>Registered: {formatDate(user.registrationDate)}</div>
                            <div>Last Login: {formatDate(user.lastLogin)}</div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{user.address.city}, {user.address.state}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1">
                              <ShoppingCart className="w-3 h-3" />
                              <span>{user.statistics.totalOrders} orders</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-3 h-3" />
                              <span>{formatCurrency(user.statistics.totalSpent)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3" />
                              <span>{user.statistics.averageRating}/5</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => openUserModal(user)}
                              className="text-primary-600 hover:text-primary-700"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-700">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-700">
                              <Mail className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* User Detail Modal */}
        {showUserModal && selectedUser && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      User Details: {selectedUser.firstName} {selectedUser.lastName}
                    </h3>
                    <button
                      onClick={() => setShowUserModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XCircle className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Basic Information</h4>
                        <div className="space-y-2 text-sm">
                          <div><strong>Email:</strong> {selectedUser.email}</div>
                          <div><strong>Phone:</strong> {selectedUser.phone}</div>
                          <div><strong>Role:</strong> {selectedUser.role}</div>
                          <div><strong>Status:</strong> {selectedUser.status}</div>
                          <div><strong>Email Verified:</strong> {selectedUser.emailVerified ? 'Yes' : 'No'}</div>
                          <div><strong>Phone Verified:</strong> {selectedUser.phoneVerified ? 'Yes' : 'No'}</div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Address</h4>
                        <div className="text-sm">
                          <div>{selectedUser.address.street}</div>
                          <div>{selectedUser.address.city}, {selectedUser.address.state}</div>
                          <div>{selectedUser.address.country} - {selectedUser.address.zipCode}</div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Statistics</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div><strong>Orders:</strong> {selectedUser.statistics.totalOrders}</div>
                          <div><strong>Spent:</strong> {formatCurrency(selectedUser.statistics.totalSpent)}</div>
                          <div><strong>Avg Order:</strong> {formatCurrency(selectedUser.statistics.averageOrderValue)}</div>
                          <div><strong>Reviews:</strong> {selectedUser.statistics.reviewsCount}</div>
                          <div><strong>Rating:</strong> {selectedUser.statistics.averageRating}/5</div>
                          <div><strong>Referrals:</strong> {selectedUser.statistics.referrals}</div>
                        </div>
                      </div>
                    </div>

                    {/* Activity and History */}
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Recent Activity</h4>
                        <div className="space-y-2">
                          {selectedUser.recentActivity.map((activity, index) => (
                            <div key={index} className="text-sm border-l-2 border-blue-200 pl-3">
                              <div className="font-medium">{activity.action}</div>
                              <div className="text-gray-600">{activity.details}</div>
                              <div className="text-xs text-gray-500">
                                {new Date(activity.timestamp).toLocaleString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Login History</h4>
                        <div className="space-y-2">
                          {selectedUser.loginHistory.map((login, index) => (
                            <div key={index} className="text-sm">
                              <div className="flex justify-between">
                                <span>{login.location}</span>
                                <span className="text-gray-500">{login.ip}</span>
                              </div>
                              <div className="text-xs text-gray-500">
                                {new Date(login.timestamp).toLocaleString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Preferences</h4>
                        <div className="space-y-2 text-sm">
                          <div><strong>Newsletter:</strong> {selectedUser.preferences.newsletter ? 'Yes' : 'No'}</div>
                          <div><strong>Notifications:</strong> {selectedUser.preferences.notifications ? 'Yes' : 'No'}</div>
                          <div><strong>Marketing:</strong> {selectedUser.preferences.marketing ? 'Yes' : 'No'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setShowUserModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;