import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, Truck, MapPin, CreditCard, Download } from 'lucide-react';

const OrderDetailPage = () => {
  const { id } = useParams();

  // Sample order data (in real app, this would come from API)
  const order = {
    id: id,
    date: '2024-01-15',
    status: 'delivered',
    total: 25.00,
    subtotal: 20.00,
    shipping: 5.00,
    paymentMethod: 'Deposit Account',
    shippingAddress: {
      name: 'John Collector',
      street: '123 Collector Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India'
    },
    items: [
      {
        id: '1',
        name: 'Gandhi 150th Anniversary',
        description: 'Commemorative stamp celebrating 150 years of Mahatma Gandhi\'s birth.',
        quantity: 1,
        price: 5,
        denomination: '₹5'
      },
      {
        id: '2',
        name: 'Kerala Backwaters',
        description: 'Stunning stamp featuring the serene backwaters of Kerala.',
        quantity: 2,
        price: 10,
        denomination: '₹10'
      }
    ],
    tracking: {
      number: 'TRK123456789',
      updates: [
        { date: '2024-01-15', status: 'Delivered', description: 'Package delivered successfully' },
        { date: '2024-01-14', status: 'Out for delivery', description: 'Package is out for delivery' },
        { date: '2024-01-13', status: 'In transit', description: 'Package is in transit' },
        { date: '2024-01-12', status: 'Shipped', description: 'Package has been shipped' }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/orders"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 mb-2">
                Order {order.id}
              </h1>
              <p className="text-secondary-600">
                Placed on {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-600 border border-green-200">
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="card">
              <div className="card-header">
                <div className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-primary-600" />
                  <h2 className="text-xl font-semibold text-secondary-900">Order Items</h2>
                </div>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-secondary-50 rounded-lg">
                      <div className="w-16 h-20 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="text-center">
                          <div className="w-10 h-12 bg-white rounded shadow-sm mx-auto mb-1 flex items-center justify-center">
                            <span className="text-lg">📮</span>
                          </div>
                          <p className="text-xs text-secondary-600">{item.denomination}</p>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-secondary-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-secondary-600 mb-2">
                          {item.description}
                        </p>
                        <p className="text-sm text-secondary-600">
                          Quantity: {item.quantity} × ₹{item.price}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-secondary-900">
                          ₹{(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tracking Information */}
            <div className="card">
              <div className="card-header">
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-primary-600" />
                  <h2 className="text-xl font-semibold text-secondary-900">Tracking Information</h2>
                </div>
              </div>
              <div className="card-body">
                <div className="mb-4">
                  <p className="text-sm text-secondary-600">Tracking Number</p>
                  <p className="font-mono text-lg font-semibold text-secondary-900">
                    {order.tracking.number}
                  </p>
                </div>
                
                <div className="space-y-4">
                  {order.tracking.updates.map((update, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        index === 0 ? 'bg-green-600' : 'bg-secondary-300'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-secondary-900">{update.status}</p>
                          <p className="text-sm text-secondary-500">
                            {new Date(update.date).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="text-sm text-secondary-600">{update.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-semibold text-secondary-900">Order Summary</h2>
              </div>
              <div className="card-body">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Subtotal</span>
                    <span className="text-secondary-900">₹{order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Shipping</span>
                    <span className="text-secondary-900">₹{order.shipping.toFixed(2)}</span>
                  </div>
                  <hr className="border-secondary-200" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-secondary-900">Total</span>
                    <span className="text-primary-600">₹{order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="card">
              <div className="card-header">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  <h2 className="text-xl font-semibold text-secondary-900">Shipping Address</h2>
                </div>
              </div>
              <div className="card-body">
                <div className="text-sm text-secondary-900">
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                  <p>{order.shippingAddress.pincode}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="card">
              <div className="card-header">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-primary-600" />
                  <h2 className="text-xl font-semibold text-secondary-900">Payment Method</h2>
                </div>
              </div>
              <div className="card-body">
                <p className="text-sm text-secondary-900">{order.paymentMethod}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button className="btn-outline w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Invoice
              </button>
              {order.status === 'delivered' && (
                <button className="btn-primary w-full">
                  Reorder Items
                </button>
              )}
              <Link to="/contact" className="btn-outline w-full text-center">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;