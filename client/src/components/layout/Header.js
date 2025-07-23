import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ShoppingCart, 
  User, 
  Search,
  Mail,
  LogOut,
  Settings,
  Heart,
  Package,
  Star,
  Wallet
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartTotals } = useCart();
  const navigate = useNavigate();

  const { itemCount } = getCartTotals();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Catalog', href: '/catalog' },
    { name: 'Community', href: '/community' },
    { name: 'Events', href: '/events' },
    { name: 'Experts', href: '/experts' },
    { name: 'Learn', href: '/learn' },
    { name: 'News', href: '/news' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Minimal Header Bar */}
      <header className="bg-white shadow-sm border-b border-secondary-200 sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-secondary-900">
                  National Philately
                </h1>
                <p className="text-xs text-secondary-600">Community Platform</p>
              </div>
            </Link>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Sliding Panel Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sliding Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Panel Header */}
          <div className="flex items-center justify-between p-6 border-b border-secondary-200">
            <h2 className="text-lg font-semibold text-secondary-900">Menu</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto">
            {/* User Section */}
            {isAuthenticated ? (
              <div className="p-6 border-b border-secondary-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary-900">{user?.firstName} {user?.lastName}</p>
                    <p className="text-sm text-secondary-600">{user?.email}</p>
                  </div>
                </div>
                
                {/* User Menu Items */}
                <div className="space-y-1">
                  <Link
                    to="/dashboard"
                    className="flex items-center px-3 py-2 text-sm text-secondary-700 hover:bg-secondary-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4 mr-3" />
                    Dashboard
                  </Link>
                  <Link
                    to="/orders"
                    className="flex items-center px-3 py-2 text-sm text-secondary-700 hover:bg-secondary-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Package className="w-4 h-4 mr-3" />
                    My Orders
                  </Link>
                  <Link
                    to="/wishlist"
                    className="flex items-center px-3 py-2 text-sm text-secondary-700 hover:bg-secondary-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="w-4 h-4 mr-3" />
                    Wishlist
                  </Link>
                  <Link
                    to="/collection"
                    className="flex items-center px-3 py-2 text-sm text-secondary-700 hover:bg-secondary-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Star className="w-4 h-4 mr-3" />
                    My Collection
                  </Link>
                  <Link
                    to="/wallet"
                    className="flex items-center px-3 py-2 text-sm text-secondary-700 hover:bg-secondary-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Wallet className="w-4 h-4 mr-3" />
                    My Wallet
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center px-3 py-2 text-sm text-secondary-700 hover:bg-secondary-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Profile
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-6 border-b border-secondary-200">
                <div className="space-y-3">
                  <Link
                    to="/login"
                    className="btn-outline w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="p-6 border-b border-secondary-200">
              <h3 className="text-sm font-semibold text-secondary-900 mb-3">Quick Actions</h3>
              <div className="space-y-1">
                <button className="flex items-center w-full px-3 py-2 text-sm text-secondary-700 hover:bg-secondary-50 rounded-lg transition-colors">
                  <Search className="w-4 h-4 mr-3" />
                  Search Catalog
                </button>
                <Link
                  to="/cart"
                  className="flex items-center px-3 py-2 text-sm text-secondary-700 hover:bg-secondary-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart className="w-4 h-4 mr-3" />
                  Cart {itemCount > 0 && (
                    <span className="ml-auto bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {itemCount > 99 ? '99+' : itemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {/* Main Navigation */}
            <div className="p-6">
              <h3 className="text-sm font-semibold text-secondary-900 mb-3">Navigation</h3>
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center px-3 py-2 text-sm text-secondary-700 hover:bg-secondary-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Panel Footer */}
          {isAuthenticated && (
            <div className="p-6 border-t border-secondary-200">
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;