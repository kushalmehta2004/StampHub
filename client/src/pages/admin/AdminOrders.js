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

  // Sample orders data with comprehensive information
  const sampleOrders = [
    {
      id: 'ORD-2024-001',
      orderNumber: 'ORD-2024-001',
      customer: {
        id: 'user-1',
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@email.com',
        phone: '+91-98765-43210',
        avatar: null
      },
      orderDate: '2024-01-22T10:30:00Z',
      status: 'processing',
      paymentStatus: 'paid',
      paymentMethod: 'razorpay',
      transactionId: 'txn_1234567890',
      items: [
        {
          id: 'item-1',
          name: 'Gandhi 150th Anniversary Stamp',
          image: '/images/stamps/gandhi-150.jpg',
          quantity: 2,
          price: 25,
          total: 50
        },
        {
          id: 'item-2',
          name: 'Kerala Backwaters Series',
          image: '/images/stamps/kerala-backwaters.jpg',
          quantity: 1,
          price: 15,
          total: 15
        }
      ],
      subtotal: 65,
      shipping: 50,
      tax: 10,
      total: 125,
      currency: 'INR',
      shippingAddress: {
        name: 'Rajesh Kumar',
        street: '123 MG Road',
        city: 'Bangalore',
        state: 'Karnataka',
        country: 'India',
        zipCode: '560001',
        phone: '+91-98765-43210'
      },
      billingAddress: {
        name: 'Rajesh Kumar',
        street: '123 MG Road',
        city: 'Bangalore',
        state: 'Karnataka',
        country: 'India',
        zipCode: '560001',
        phone: '+91-98765-43210'
      },
      tracking: {
        trackingNumber: 'TRK123456789',
        carrier: 'India Post',
        status: 'in_transit',
        estimatedDelivery: '2024-01-25',
        trackingHistory: [
          { status: 'Order Placed', timestamp: '2024-01-22T10:30:00Z', location: 'Bangalore' },
          { status: 'Processing', timestamp: '2024-01-22T14:00:00Z', location: 'Bangalore' },
          { status: 'Shipped', timestamp: '2024-01-23T09:00:00Z', location: 'Bangalore Sorting Office' },
          { status: 'In Transit', timestamp: '2024-01-23T15:30:00Z', location: 'Karnataka Hub' }
        ]
      },
      notes: 'Customer requested careful packaging for commemorative stamps',
      tags: ['premium-customer', 'commemorative'],
      source: 'website',
      discount: 0,
      refundAmount: 0,
      createdAt: '2024-01-22T10:30:00Z',
      updatedAt: '2024-01-23T15:30:00Z'
    },
    {
      id: 'ORD-2024-002',
      orderNumber: 'ORD-2024-002',
      customer: {
        id: 'user-2',
        name: 'Priya Sharma',
        email: 'priya.sharma@email.com',
        phone: '+91-87654-32109',
        avatar: null
      },
      orderDate: '2024-01-21T16:45:00Z',
      status: 'delivered',
      paymentStatus: 'paid',
      paymentMethod: 'card',
      transactionId: 'txn_0987654321',
      items: [
        {
          id: 'item-3',
          name: 'Mysore Palace Heritage Series',
          image: '/images/stamps/mysore-palace.jpg',
          quantity: 3,
          price: 30,
          total: 90
        },
        {
          id: 'item-4',
          name: 'Wildlife Conservation Set',
          image: '/images/stamps/wildlife.jpg',
          quantity: 1,
          price: 45,
          total: 45
        }
      ],
      subtotal: 135,
      shipping: 0,
      tax: 15,
      total: 150,
      currency: 'INR',
      shippingAddress: {
        name: 'Priya Sharma',
        street: '456 CP Road',
        city: 'Delhi',
        state: 'Delhi',
        country: 'India',
        zipCode: '110001',
        phone: '+91-87654-32109'
      },
      billingAddress: {
        name: 'Priya Sharma',
        street: '456 CP Road',
        city: 'Delhi',
        state: 'Delhi',
        country: 'India',
        zipCode: '110001',
        phone: '+91-87654-32109'
      },
      tracking: {
        trackingNumber: 'TRK987654321',
        carrier: 'Blue Dart',
        status: 'delivered',
        estimatedDelivery: '2024-01-22',
        actualDelivery: '2024-01-22T14:30:00Z',
        trackingHistory: [
          { status: 'Order Placed', timestamp: '2024-01-21T16:45:00Z', location: 'Delhi' },
          { status: 'Processed', timestamp: '2024-01-21T18:00:00Z', location: 'Delhi' },
          { status: 'Shipped', timestamp: '2024-01-22T08:00:00Z', location: 'Delhi Warehouse' },
          { status: 'Out for Delivery', timestamp: '2024-01-22T12:00:00Z', location: 'Delhi' },
          { status: 'Delivered', timestamp: '2024-01-22T14:30:00Z', location: 'CP Road, Delhi' }
        ]
      },
      notes: 'Premium customer - free shipping applied',
      tags: ['premium-customer', 'heritage'],
      source: 'mobile-app',
      discount: 50,
      refundAmount: 0,
      createdAt: '2024-01-21T16:45:00Z',
      updatedAt: '2024-01-22T14:30:00Z',
      deliveryRating: 5,
      deliveryFeedback: 'Excellent packaging and fast delivery!'
    },
    {
      id: 'ORD-2024-003',
      orderNumber: 'ORD-2024-003',
      customer: {
        id: 'user-3',
        name: 'Amit Patel',
        email: 'amit.patel@email.com',
        phone: '+91-76543-21098',
        avatar: null
      },
      orderDate: '2024-01-20T11:15:00Z',
      status: 'cancelled',
      paymentStatus: 'refunded',
      paymentMethod: 'upi',
      transactionId: 'txn_1122334455',
      items: [
        {
          id: 'item-5',
          name: 'Freedom Fighters Series',
          image: '/images/stamps/freedom-fighters.jpg',
          quantity: 1,
          price: 75,
          total: 75
        }
      ],
      subtotal: 75,
      shipping: 25,
      tax: 8,
      total: 108,
      currency: 'INR',
      shippingAddress: {
        name: 'Amit Patel',
        street: '789 Ring Road',
        city: 'Ahmedabad',
        state: 'Gujarat',
        country: 'India',
        zipCode: '380001',
        phone: '+91-76543-21098'
      },
      billingAddress: {
        name: 'Amit Patel',
        street: '789 Ring Road',
        city: 'Ahmedabad',
        state: 'Gujarat',
        country: 'India',
        zipCode: '380001',
        phone: '+91-76543-21098'
      },
      tracking: null,
      notes: 'Customer requested cancellation due to duplicate order',
      tags: ['cancelled', 'refunded'],
      source: 'website',
      discount: 0,
      refundAmount: 108,
      refundDate: '2024-01-20T15:30:00Z',
      cancellationReason: 'Customer request - duplicate order',
      createdAt: '2024-01-20T11:15:00Z',
      updatedAt: '2024-01-20T15:30:00Z'
    },
    {
      id: 'ORD-2024-004',
      orderNumber: 'ORD-2024-004',
      customer: {
        id: 'user-4',
        name: 'Sneha Reddy',
        email: 'sneha.reddy@email.com',
        phone: '+91-65432-10987',
        avatar: null
      },
      orderDate: '2024-01-19T14:20:00Z',
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: 'cod',
      transactionId: null,
      items: [
        {
          id: 'item-6',
          name: 'Cricket World Cup Commemorative',
          image: '/images/stamps/cricket-world-cup.jpg',
          quantity: 2,
          price: 40,
          total: 80
        },
        {
          id: 'item-7',
          name: 'Art & Culture Series',
          image: '/images/stamps/art-culture.jpg',
          quantity: 1,
          price: 35,
          total: 35
        }
      ],
      subtotal: 115,
      shipping: 30,
      tax: 12,
      total: 157,
      currency: 'INR',
      shippingAddress: {
        name: 'Sneha Reddy',
        street: '321 Jubilee Hills',
        city: 'Hyderabad',
        state: 'Telangana',
        country: 'India',
        zipCode: '500033',
        phone: '+91-65432-10987'
      },
      billingAddress: {
        name: 'Sneha Reddy',
        street: '321 Jubilee Hills',
        city: 'Hyderabad',
        state: 'Telangana',
        country: 'India',
        zipCode: '500033',
        phone: '+91-65432-10987'
      },
      tracking: null,
      notes: 'COD order - verify customer details before dispatch',
      tags: ['cod', 'high-value'],
      source: 'phone-order',
      discount: 15,
      refundAmount: 0,
      createdAt: '2024-01-19T14:20:00Z',
      updatedAt: '2024-01-19T14:20:00Z'
    },
    {
      id: 'ORD-2024-005',
      orderNumber: 'ORD-2024-005',
      customer: {
        id: 'user-5',
        name: 'Vikram Singh',
        email: 'vikram.singh@email.com',
        phone: '+91-54321-09876',
        avatar: null
      },
      orderDate: '2024-01-18T09:30:00Z',
      status: 'returned',
      paymentStatus: 'refunded',
      paymentMethod: 'wallet',
      transactionId: 'txn_5566778899',
      items: [
        {
          id: 'item-8',
          name: 'Space Mission Series',
          image: '/images/stamps/space-mission.jpg',
          quantity: 1,
          price: 60,
          total: 60
        }
      ],
      subtotal: 60,
      shipping: 20,
      tax: 6,
      total: 86,
      currency: 'INR',
      shippingAddress: {
        name: 'Vikram Singh',
        street: '654 Civil Lines',
        city: 'Jaipur',
        state: 'Rajasthan',
        country: 'India',
        zipCode: '302001',
        phone: '+91-54321-09876'
      },
      billingAddress: {
        name: 'Vikram Singh',
        street: '654 Civil Lines',
        city: 'Jaipur',
        state: 'Rajasthan',
        country: 'India',
        zipCode: '302001',
        phone: '+91-54321-09876'
      },
      tracking: {
        trackingNumber: 'TRK555666777',
        carrier: 'DTDC',
        status: 'returned',
        estimatedDelivery: '2024-01-20',
        actualDelivery: '2024-01-20T10:00:00Z',
        returnDate: '2024-01-21T16:00:00Z',
        trackingHistory: [
          { status: 'Order Placed', timestamp: '2024-01-18T09:30:00Z', location: 'Jaipur' },
          { status: 'Shipped', timestamp: '2024-01-19T10:00:00Z', location: 'Jaipur' },
          { status: 'Delivered', timestamp: '2024-01-20T10:00:00Z', location: 'Civil Lines, Jaipur' },
          { status: 'Return Requested', timestamp: '2024-01-20T14:00:00Z', location: 'Jaipur' },
          { status: 'Returned', timestamp: '2024-01-21T16:00:00Z', location: 'Jaipur Warehouse' }
        ]
      },
      notes: 'Customer reported damaged stamps on arrival',
      tags: ['returned', 'damaged'],
      source: 'website',
      discount: 0,
      refundAmount: 86,
      refundDate: '2024-01-22T10:00:00Z',
      returnReason: 'Damaged product',
      createdAt: '2024-01-18T09:30:00Z',
      updatedAt: '2024-01-22T10:00:00Z'
    }
  ];

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
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = !filterStatus || order.status === filterStatus;
    const matchesPaymentStatus = !filterPaymentStatus || order.paymentStatus === filterPaymentStatus;
    const matchesDateRange = !filterDateRange || order.orderDate >= filterDateRange;
    return matchesSearch && matchesStatus && matchesPaymentStatus && matchesDateRange;
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
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'processing':
        return 'bg-blue-100 text-blue-600';
      case 'shipped':
        return 'bg-purple-100 text-purple-600';
      case 'delivered':
        return 'bg-green-100 text-green-600';
      case 'cancelled':
        return 'bg-red-100 text-red-600';
      case 'returned':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'failed':
        return 'bg-red-100 text-red-600';
      case 'refunded':
        return 'bg-blue-100 text-blue-600';
      case 'partially_refunded':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'processing':
        return <RefreshCw className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'returned':
        return <ArrowLeft className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };

  const handleSelectOrder = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on orders:`, selectedOrders);
    
    switch (action) {
      case 'process':
        setOrders(orders => 
          orders.map(order => 
            selectedOrders.includes(order.id) 
              ? { ...order, status: 'processing', updatedAt: new Date().toISOString() }
              : order
          )
        );
        toast.success(`${selectedOrders.length} order(s) marked as processing`);
        break;
      case 'ship':
        setOrders(orders => 
          orders.map(order => 
            selectedOrders.includes(order.id) 
              ? { ...order, status: 'shipped', updatedAt: new Date().toISOString() }
              : order
          )
        );
        toast.success(`${selectedOrders.length} order(s) marked as shipped`);
        break;
      case 'cancel':
        if (window.confirm(`Are you sure you want to cancel ${selectedOrders.length} order(s)?`)) {
          setOrders(orders => 
            orders.map(order => 
              selectedOrders.includes(order.id) 
                ? { ...order, status: 'cancelled', updatedAt: new Date().toISOString() }
                : order
            )
          );
          toast.success(`${selectedOrders.length} order(s) cancelled`);
        }
        break;
      default:
        break;
    }
    
    setSelectedOrders([]);
    setShowBulkActions(false);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders => 
      orders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
          : order
      )
    );
    toast.success('Order status updated');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  useEffect(() => {
    setShowBulkActions(selectedOrders.length > 0);
  }, [selectedOrders]);

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Order Management</h1>
            <p className="text-secondary-600 mt-1">Track and manage all customer orders</p>
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
              <Plus className="w-4 h-4 mr-2" />
              Manual Order
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-8">
          <div className="card">
            <div className="card-body">
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
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{orderStats.pending || 0}</p>
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
                  <p className="text-sm text-secondary-600 mb-1">Processing</p>
                  <p className="text-2xl font-bold text-blue-600">{orderStats.processing || 0}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Shipped</p>
                  <p className="text-2xl font-bold text-purple-600">{orderStats.shipped || 0}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Truck className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Delivered</p>
                  <p className="text-2xl font-bold text-green-600">{orderStats.delivered || 0}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Cancelled</p>
                  <p className="text-2xl font-bold text-red-600">{orderStats.cancelled || 0}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Revenue</p>
                  <p className="text-xl font-bold text-green-600">
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
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Avg Order</p>
                  <p className="text-xl font-bold text-blue-600">
                    {formatCurrency(orderStats.avgOrderValue || 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
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
                  placeholder="Search orders..."
                  className="input pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select 
                className="input"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                {orderStatuses.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>

              <select 
                className="input"
                value={filterPaymentStatus}
                onChange={(e) => setFilterPaymentStatus(e.target.value)}
              >
                {paymentStatuses.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>

              <input
                type="date"
                className="input"
                value={filterDateRange}
                onChange={(e) => setFilterDateRange(e.target.value)}
                placeholder="From date"
              />

              <select 
                className="input"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="orderDate">Order Date</option>
                <option value="total">Total Amount</option>
                <option value="status">Status</option>
                <option value="customer.name">Customer Name</option>
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
                    {selectedOrders.length} order(s) selected
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleBulkAction('process')}
                    className="btn-outline btn-sm text-blue-600 border-blue-300 hover:bg-blue-50"
                  >
                    Mark Processing
                  </button>
                  <button 
                    onClick={() => handleBulkAction('ship')}
                    className="btn-outline btn-sm text-purple-600 border-purple-300 hover:bg-purple-50"
                  >
                    Mark Shipped
                  </button>
                  <button 
                    onClick={() => handleBulkAction('cancel')}
                    className="btn-outline btn-sm text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Cancel Orders
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Table */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-secondary-900">
                Orders ({filteredOrders.length})
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
                  {selectedOrders.length === filteredOrders.length ? 'Deselect All' : 'Select All'}
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
                          checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                          onChange={handleSelectAll}
                          className="rounded border-secondary-300"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Order
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-secondary-200">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-secondary-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedOrders.includes(order.id)}
                            onChange={() => handleSelectOrder(order.id)}
                            className="rounded border-secondary-300"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-secondary-900">
                              {order.orderNumber}
                            </div>
                            <div className="text-sm text-secondary-500">
                              {formatDate(order.orderDate)}
                            </div>
                            <div className="text-xs text-secondary-400">
                              {order.items.length} item(s)
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
                              {order.customer.name.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-secondary-900">
                                {order.customer.name}
                              </div>
                              <div className="text-sm text-secondary-500">{order.customer.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              className={`text-xs px-2 py-1 rounded-full border-0 ${getStatusColor(order.status)}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                              <option value="returned">Returned</option>
                            </select>
                            {order.tracking && (
                              <div className="text-xs text-secondary-500">
                                Track: {order.tracking.trackingNumber}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                              {order.paymentStatus}
                            </span>
                            <div className="text-xs text-secondary-500 capitalize">
                              {order.paymentMethod}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-secondary-900">
                            {formatCurrency(order.total)}
                          </div>
                          <div className="text-xs text-secondary-500">
                            Items: {formatCurrency(order.subtotal)}
                          </div>
                          <div className="text-xs text-secondary-500">
                            Shipping: {formatCurrency(order.shipping)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => openOrderModal(order)}
                              className="text-primary-600 hover:text-primary-700"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-700">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-700">
                              <Printer className="w-4 h-4" />
                            </button>
                            <button className="text-purple-600 hover:text-purple-700">
                              <Mail className="w-4 h-4" />
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

        {/* Order Detail Modal */}
        {showOrderModal && selectedOrder && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Order Details: {selectedOrder.orderNumber}
                    </h3>
                    <button
                      onClick={() => setShowOrderModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XCircle className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Order Information */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Customer & Order Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">Customer Information</h4>
                          <div className="space-y-2 text-sm">
                            <div><strong>Name:</strong> {selectedOrder.customer.name}</div>
                            <div><strong>Email:</strong> {selectedOrder.customer.email}</div>
                            <div><strong>Phone:</strong> {selectedOrder.customer.phone}</div>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">Order Information</h4>
                          <div className="space-y-2 text-sm">
                            <div><strong>Order Date:</strong> {formatDate(selectedOrder.orderDate)}</div>
                            <div><strong>Status:</strong> <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedOrder.status)}`}>{selectedOrder.status}</span></div>
                            <div><strong>Payment:</strong> <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>{selectedOrder.paymentStatus}</span></div>
                            <div><strong>Method:</strong> {selectedOrder.paymentMethod}</div>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                        <div className="space-y-3">
                          {selectedOrder.items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-2">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                                  <Package className="w-6 h-6 text-gray-500" />
                                </div>
                                <div>
                                  <div className="font-medium">{item.name}</div>
                                  <div className="text-sm text-gray-500">Qty: {item.quantity} × {formatCurrency(item.price)}</div>
                                </div>
                              </div>
                              <div className="font-medium">{formatCurrency(item.total)}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping Address */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Shipping Address</h4>
                        <div className="text-sm">
                          <div>{selectedOrder.shippingAddress.name}</div>
                          <div>{selectedOrder.shippingAddress.street}</div>
                          <div>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</div>
                          <div>{selectedOrder.shippingAddress.country} - {selectedOrder.shippingAddress.zipCode}</div>
                          <div>Phone: {selectedOrder.shippingAddress.phone}</div>
                        </div>
                      </div>

                      {/* Tracking Information */}
                      {selectedOrder.tracking && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">Tracking Information</h4>
                          <div className="space-y-2 text-sm">
                            <div><strong>Tracking Number:</strong> {selectedOrder.tracking.trackingNumber}</div>
                            <div><strong>Carrier:</strong> {selectedOrder.tracking.carrier}</div>
                            <div><strong>Status:</strong> {selectedOrder.tracking.status}</div>
                            {selectedOrder.tracking.estimatedDelivery && (
                              <div><strong>Estimated Delivery:</strong> {formatDate(selectedOrder.tracking.estimatedDelivery)}</div>
                            )}
                          </div>
                          
                          <div className="mt-4">
                            <h5 className="font-medium text-gray-800 mb-2">Tracking History</h5>
                            <div className="space-y-2">
                              {selectedOrder.tracking.trackingHistory.map((event, index) => (
                                <div key={index} className="flex justify-between text-sm border-l-2 border-blue-200 pl-3">
                                  <div>
                                    <div className="font-medium">{event.status}</div>
                                    <div className="text-gray-600">{event.location}</div>
                                  </div>
                                  <div className="text-gray-500">{formatDate(event.timestamp)}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Order Summary & Actions */}
                    <div className="space-y-6">
                      {/* Order Summary */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>{formatCurrency(selectedOrder.subtotal)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Shipping:</span>
                            <span>{formatCurrency(selectedOrder.shipping)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax:</span>
                            <span>{formatCurrency(selectedOrder.tax)}</span>
                          </div>
                          {selectedOrder.discount > 0 && (
                            <div className="flex justify-between text-green-600">
                              <span>Discount:</span>
                              <span>-{formatCurrency(selectedOrder.discount)}</span>
                            </div>
                          )}
                          <div className="border-t pt-2 font-medium flex justify-between">
                            <span>Total:</span>
                            <span>{formatCurrency(selectedOrder.total)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Information */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Payment Information</h4>
                        <div className="space-y-2 text-sm">
                          <div><strong>Method:</strong> {selectedOrder.paymentMethod}</div>
                          <div><strong>Status:</strong> {selectedOrder.paymentStatus}</div>
                          {selectedOrder.transactionId && (
                            <div><strong>Transaction ID:</strong> {selectedOrder.transactionId}</div>
                          )}
                          {selectedOrder.refundAmount > 0 && (
                            <div className="text-red-600"><strong>Refunded:</strong> {formatCurrency(selectedOrder.refundAmount)}</div>
                          )}
                        </div>
                      </div>

                      {/* Order Actions */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Actions</h4>
                        <div className="space-y-2">
                          <button className="w-full btn-primary btn-sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Order
                          </button>
                          <button className="w-full btn-outline btn-sm">
                            <Printer className="w-4 h-4 mr-2" />
                            Print Invoice
                          </button>
                          <button className="w-full btn-outline btn-sm">
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email
                          </button>
                          <button className="w-full btn-outline btn-sm">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Add Note
                          </button>
                        </div>
                      </div>

                      {/* Notes */}
                      {selectedOrder.notes && (
                        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                          <h4 className="font-medium text-gray-900 mb-2">Order Notes</h4>
                          <div className="text-sm text-gray-700">{selectedOrder.notes}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setShowOrderModal(false)}
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

export default AdminOrders;