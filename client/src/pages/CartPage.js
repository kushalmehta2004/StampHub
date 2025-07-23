import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight,
  ShoppingBag,
  Truck,
  Shield
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const CartPage = () => {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getCartTotals 
  } = useCart();
  const { isAuthenticated } = useAuth();

  const { subtotal, shippingCost, total, itemCount } = getCartTotals();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-secondary-50">
        <div className="container-custom py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-secondary-400" />
            </div>
            <h1 className="text-2xl font-bold text-secondary-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-secondary-600 mb-8">
              Looks like you haven't added any items to your cart yet. 
              Start exploring our philatelic collection!
            </p>
            <Link to="/catalog" className="btn-primary btn-lg">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Browse Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-secondary-600">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-secondary-900">Cart Items</h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.catalogItem._id} className="flex items-center space-x-4 p-4 bg-secondary-50 rounded-lg">
                      {/* Item Image */}
                      <div className="w-20 h-24 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="text-center">
                          <div className="w-12 h-15 bg-white rounded shadow-sm mx-auto mb-1 flex items-center justify-center">
                            <span className="text-lg">📮</span>
                          </div>
                          <p className="text-xs text-secondary-600">{item.catalogItem.denomination}</p>
                        </div>
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                          {item.catalogItem.name}
                        </h3>
                        <p className="text-sm text-secondary-600 mb-2 line-clamp-2">
                          {item.catalogItem.description}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="badge-secondary">{item.catalogItem.postalCircle}</span>
                          <span className="badge-secondary">{item.catalogItem.theme}</span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.catalogItem._id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg border border-secondary-300 flex items-center justify-center hover:bg-secondary-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.catalogItem._id, item.quantity + 1)}
                            disabled={item.quantity >= item.catalogItem.stock.available}
                            className="w-8 h-8 rounded-lg border border-secondary-300 flex items-center justify-center hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right min-w-0">
                          <p className="text-lg font-bold text-primary-600">
                            ₹{(item.catalogItem.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-secondary-500">
                            ₹{item.catalogItem.price} each
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.catalogItem._id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                to="/catalog"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-semibold text-secondary-900">Order Summary</h2>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Subtotal ({itemCount} items)</span>
                    <span className="font-medium text-secondary-900">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Shipping</span>
                    <span className="font-medium text-secondary-900">₹{shippingCost.toFixed(2)}</span>
                  </div>
                  <hr className="border-secondary-200" />
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold text-secondary-900">Total</span>
                    <span className="font-bold text-primary-600">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <div className="mt-6">
                  {isAuthenticated ? (
                    <Link to="/checkout" className="btn-primary w-full btn-lg">
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  ) : (
                    <div className="space-y-3">
                      <Link to="/login" className="btn-primary w-full btn-lg">
                        Login to Checkout
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                      <p className="text-sm text-center text-secondary-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                          Sign up
                        </Link>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-secondary-200">
                <Shield className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-secondary-900">Secure Checkout</p>
                  <p className="text-xs text-secondary-600">Your payment information is protected</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-secondary-200">
                <Truck className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-secondary-900">Fast Delivery</p>
                  <p className="text-xs text-secondary-600">3-5 business days nationwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;