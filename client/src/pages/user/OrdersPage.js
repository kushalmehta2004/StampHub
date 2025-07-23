import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Eye, Clock, CheckCircle, Truck, AlertCircle } from 'lucide-react';

const OrdersPage = () => {
  // Sample orders data
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 25.00,
      items: [
        { name: 'Gandhi 150th Anniversary', quantity: 1, price: 5 },
        { name: 'Kerala Backwaters', quantity: 2, price: 10 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-12',
      status: 'shipped',
      total: 15.00,
      items: [
        { name: 'Railways Heritage Set', quantity: 1, price: 15 }
      ]
    },
    {
      id: 'ORD-003',
      date: '2024-01-10',
      status: 'processing',
      total: 45.00,
      items: [
        { name: 'Diwali Festival', quantity: 3, price: 8 },
        { name: 'Yoga Miniature Sheet', quantity: 1, price: 21 }
      ]
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-secondary-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'shipped':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'processing':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-secondary-600 bg-secondary-50 border-secondary-200';
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            My Orders
          </h1>
          <p className="text-secondary-600">
            Track and manage your philatelic orders
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-secondary-400" />
            </div>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              No orders yet
            </h2>
            <p className="text-secondary-600 mb-8">
              Start exploring our philatelic collection and place your first order!
            </p>
            <Link to="/catalog" className="btn-primary btn-lg">
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="card">
                <div className="card-header">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-secondary-900">
                          Order {order.id}
                        </h3>
                        <p className="text-sm text-secondary-600">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary-600">
                        ₹{order.total.toFixed(2)}
                      </p>
                      <p className="text-sm text-secondary-600">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="card-body">
                  {/* Order Items */}
                  <div className="space-y-3 mb-6">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 bg-secondary-50 rounded-lg">
                        <div className="w-12 h-15 bg-gradient-to-br from-primary-100 to-accent-100 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-sm">📮</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-secondary-900">{item.name}</p>
                          <p className="text-sm text-secondary-600">
                            Quantity: {item.quantity} × ₹{item.price}
                          </p>
                        </div>
                        <p className="font-semibold text-secondary-900">
                          ₹{(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Order Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-secondary-200">
                    <div className="flex items-center space-x-4">
                      <Link
                        to={`/orders/${order.id}`}
                        className="btn-outline btn-sm"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Link>
                      {order.status === 'delivered' && (
                        <button className="btn-outline btn-sm">
                          Reorder
                        </button>
                      )}
                    </div>
                    
                    {order.status === 'processing' && (
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Status Guide */}
        <div className="mt-12 card">
          <div className="card-header">
            <h2 className="text-xl font-semibold text-secondary-900">Order Status Guide</h2>
          </div>
          <div className="card-body">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-yellow-600" />
                <div>
                  <p className="font-medium text-secondary-900">Processing</p>
                  <p className="text-sm text-secondary-600">Order is being prepared</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Truck className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-medium text-secondary-900">Shipped</p>
                  <p className="text-sm text-secondary-600">Order is on the way</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-medium text-secondary-900">Delivered</p>
                  <p className="text-sm text-secondary-600">Order has been delivered</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <div>
                  <p className="font-medium text-secondary-900">Cancelled</p>
                  <p className="text-sm text-secondary-600">Order was cancelled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;