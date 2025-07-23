import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'user' // 'user' or 'admin'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if this is an admin login route
  const isAdminLogin = location.pathname === '/admin/login';

  useEffect(() => {
    if (isAdminLogin) {
      setFormData(prev => ({ ...prev, userType: 'admin' }));
    }
  }, [isAdminLogin]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = location.state?.from?.pathname || (isAdminLogin ? '/admin' : '/');
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state, isAdminLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      
      // Demo credentials check
      const success = await handleDemoLogin();
      
      if (success) {
        toast.success(`Welcome${formData.userType === 'admin' ? ' Admin' : ''}!`);
        const redirectTo = location.state?.from?.pathname || (formData.userType === 'admin' ? '/admin' : '/');
        navigate(redirectTo, { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    // Simple validation - accept any email/password for demo
    if (!formData.email || !formData.password) {
      throw new Error('Please enter email and password');
    }

    // Create user based on input
    const mockUser = {
      id: formData.userType === 'admin' ? 'admin-' + Date.now() : 'user-' + Date.now(),
      name: formData.email.split('@')[0], // Use email prefix as name
      email: formData.email,
      role: formData.userType,
      isAdmin: formData.userType === 'admin',
      avatar: null,
      joinDate: new Date().toISOString().split('T')[0],
      walletBalance: formData.userType === 'user' ? 0 : undefined // Only users have wallets
    };

    const mockToken = 'jwt-token-' + formData.userType + '-' + Date.now();

    // Save to localStorage
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));

    // Call login from context
    await login({ user: mockUser, token: mockToken });
    
    return true;
  };

  const handleQuickLogin = (type) => {
    setFormData({
      email: '',
      password: '',
      userType: type
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-block">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">📮</span>
              </div>
              <span className="text-xl font-bold text-secondary-900">Philately</span>
            </div>
          </Link>
          
          <h2 className="text-3xl font-bold text-secondary-900">
            {isAdminLogin ? 'Admin Login' : 'Welcome Back'}
          </h2>
          <p className="mt-2 text-sm text-secondary-600">
            {isAdminLogin 
              ? 'Access the admin dashboard' 
              : 'Sign in to your philatelic account'
            }
          </p>
        </div>

        {/* Login Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Getting Started:</h3>
          <div className="text-sm text-blue-700">
            <p>• Enter any valid email address</p>
            <p>• Use any password to login</p>
            <p>• Choose User for shopping or Admin for management</p>
          </div>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* User Type Selection */}
            {!isAdminLogin && (
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Login as
                </label>
                <div className="flex rounded-lg border border-secondary-300 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, userType: 'user' }))}
                    className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                      formData.userType === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-secondary-700 hover:bg-secondary-50'
                    }`}
                  >
                    <User className="w-4 h-4 inline mr-2" />
                    User
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, userType: 'admin' }))}
                    className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                      formData.userType === 'admin'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-secondary-700 hover:bg-secondary-50'
                    }`}
                  >
                    <Shield className="w-4 h-4 inline mr-2" />
                    Admin
                  </button>
                </div>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input pl-10 w-full"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="input pl-10 pr-10 w-full"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Remember me and Forgot password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="btn-primary w-full flex items-center justify-center"
            >
              {isSubmitting || loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  {formData.userType === 'admin' ? <Shield className="w-5 h-5 mr-2" /> : <User className="w-5 h-5 mr-2" />}
                  Sign In {formData.userType === 'admin' ? 'as Admin' : ''}
                </>
              )}
            </button>
          </div>

          {/* Sign up link */}
          {!isAdminLogin && (
            <div className="text-center">
              <p className="text-sm text-secondary-600">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          )}

          {/* Back to main site for admin login */}
          {isAdminLogin && (
            <div className="text-center">
              <Link
                to="/"
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                ← Back to main site
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;