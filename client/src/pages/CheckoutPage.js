import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  CreditCard, 
  Wallet, 
  MapPin, 
  Package, 
  Shield,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('deposit');
  const [loading, setLoading] = useState(false);
  const { items, getCartTotals, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      pincode: user?.address?.pincode || '',
      country: user?.address?.country || 'India'
    }
  });

  const { subtotal, shippingCost, total, itemCount } = getCartTotals();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and redirect to success page
      clearCart();
      navigate('/orders', { 
        state: { 
          orderSuccess: true, 
          orderId: 'ORD-' + Date.now() 
        } 
      });
    } catch (error) {
      console.error('Order failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </button>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Checkout
          </h1>
          <p className="text-secondary-600">
            Complete your order for {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <div className="card">
                <div className="card-header">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-primary-600" />
                    <h2 className="text-xl font-semibold text-secondary-900">Shipping Address</h2>
                  </div>
                </div>
                <div className="card-body">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">First Name</label>
                      <input
                        type="text"
                        className={`input ${errors.firstName ? 'input-error' : ''}`}
                        {...register('firstName', { required: 'First name is required' })}
                      />
                      {errors.firstName && (
                        <p className="error-text">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="label">Last Name</label>
                      <input
                        type="text"
                        className={`input ${errors.lastName ? 'input-error' : ''}`}
                        {...register('lastName', { required: 'Last name is required' })}
                      />
                      {errors.lastName && (
                        <p className="error-text">{errors.lastName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="label">Email</label>
                      <input
                        type="email"
                        className={`input ${errors.email ? 'input-error' : ''}`}
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address'
                          }
                        })}
                      />
                      {errors.email && (
                        <p className="error-text">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="label">Phone</label>
                      <input
                        type="tel"
                        className={`input ${errors.phone ? 'input-error' : ''}`}
                        {...register('phone', { 
                          required: 'Phone is required',
                          pattern: {
                            value: /^[6-9]\d{9}$/,
                            message: 'Invalid phone number'
                          }
                        })}
                      />
                      {errors.phone && (
                        <p className="error-text">{errors.phone.message}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="label">Street Address</label>
                      <input
                        type="text"
                        className={`input ${errors.street ? 'input-error' : ''}`}
                        {...register('street', { required: 'Street address is required' })}
                      />
                      {errors.street && (
                        <p className="error-text">{errors.street.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="label">City</label>
                      <input
                        type="text"
                        className={`input ${errors.city ? 'input-error' : ''}`}
                        {...register('city', { required: 'City is required' })}
                      />
                      {errors.city && (
                        <p className="error-text">{errors.city.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="label">State</label>
                      <input
                        type="text"
                        className={`input ${errors.state ? 'input-error' : ''}`}
                        {...register('state', { required: 'State is required' })}
                      />
                      {errors.state && (
                        <p className="error-text">{errors.state.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="label">Pincode</label>
                      <input
                        type="text"
                        className={`input ${errors.pincode ? 'input-error' : ''}`}
                        {...register('pincode', { 
                          required: 'Pincode is required',
                          pattern: {
                            value: /^[1-9][0-9]{5}$/,
                            message: 'Invalid pincode'
                          }
                        })}
                      />
                      {errors.pincode && (
                        <p className="error-text">{errors.pincode.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="label">Country</label>
                      <input
                        type="text"
                        className="input"
                        value="India"
                        readOnly
                        {...register('country')}
                      />
                    </div>
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
                  <div className="space-y-4">
                    {/* Deposit Account */}
                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === 'deposit'
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-secondary-200 hover:border-secondary-300'
                      }`}
                      onClick={() => setPaymentMethod('deposit')}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="deposit"
                          checked={paymentMethod === 'deposit'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <Wallet className="w-6 h-6 text-primary-600" />
                        <div className="flex-1">
                          <p className="font-medium text-secondary-900">Deposit Account</p>
                          <p className="text-sm text-secondary-600">
                            Current Balance: ₹{user?.depositAccount?.balance?.toFixed(2) || '0.00'}
                          </p>
                        </div>
                        {(user?.depositAccount?.balance || 0) >= total && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      {(user?.depositAccount?.balance || 0) < total && (
                        <p className="text-sm text-red-600 mt-2 ml-9">
                          Insufficient balance. Please add funds to your account.
                        </p>
                      )}
                    </div>

                    {/* Online Payment */}
                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === 'online'
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-secondary-200 hover:border-secondary-300'
                      }`}
                      onClick={() => setPaymentMethod('online')}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="online"
                          checked={paymentMethod === 'online'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <CreditCard className="w-6 h-6 text-primary-600" />
                        <div>
                          <p className="font-medium text-secondary-900">Online Payment</p>
                          <p className="text-sm text-secondary-600">
                            Credit/Debit Card, UPI, Net Banking
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Order Items */}
              <div className="card">
                <div className="card-header">
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-primary-600" />
                    <h2 className="text-xl font-semibold text-secondary-900">Order Summary</h2>
                  </div>
                </div>
                <div className="card-body">
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.catalogItem._id} className="flex items-center space-x-3">
                        <div className="w-12 h-15 bg-gradient-to-br from-primary-100 to-accent-100 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-sm">📮</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-secondary-900 truncate">
                            {item.catalogItem.name}
                          </p>
                          <p className="text-xs text-secondary-600">
                            Qty: {item.quantity} × ₹{item.catalogItem.price}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-secondary-900">
                          ₹{(item.catalogItem.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-secondary-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary-600">Subtotal</span>
                      <span className="text-secondary-900">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary-600">Shipping</span>
                      <span className="text-secondary-900">₹{shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold pt-2 border-t border-secondary-200">
                      <span className="text-secondary-900">Total</span>
                      <span className="text-primary-600">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Features */}
              <div className="card">
                <div className="card-body">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-secondary-900">Secure Checkout</p>
                      <p className="text-xs text-secondary-600">SSL encrypted transaction</p>
                    </div>
                  </div>
                  <ul className="text-xs text-secondary-600 space-y-1">
                    <li>• Your payment information is encrypted</li>
                    <li>• We never store your card details</li>
                    <li>• 100% secure payment processing</li>
                  </ul>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={
                  loading || 
                  (paymentMethod === 'deposit' && (user?.depositAccount?.balance || 0) < total)
                }
                className="btn-primary w-full btn-lg"
              >
                {loading ? (
                  <LoadingSpinner size="sm" color="white" />
                ) : (
                  <>
                    Place Order - ₹{total.toFixed(2)}
                  </>
                )}
              </button>

              <p className="text-xs text-center text-secondary-600">
                By placing your order, you agree to our{' '}
                <a href="/terms" className="text-primary-600 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-primary-600 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;