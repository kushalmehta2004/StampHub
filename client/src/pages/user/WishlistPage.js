import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, Eye, Package } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const WishlistPage = () => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    // Load wishlist from localStorage
    const storedWishlist = localStorage.getItem(`wishlist_${user?.id}`);
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, [user]);

  const handleRemoveFromWishlist = (itemId) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== itemId);
    setWishlistItems(updatedWishlist);
    localStorage.setItem(`wishlist_${user?.id}`, JSON.stringify(updatedWishlist));
    toast.success('Item removed from wishlist');
  };

  const handleAddToCart = (item) => {
    // Add to cart logic
    const existingCart = JSON.parse(localStorage.getItem(`cart_${user?.id}`) || '[]');
    const existingItem = existingCart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({ ...item, quantity: 1 });
    }
    
    localStorage.setItem(`cart_${user?.id}`, JSON.stringify(existingCart));
    toast.success('Item added to cart');
  };

  return (
    <div className="container-custom py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">My Wishlist</h1>
          <p className="text-secondary-600">
            {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved for later
          </p>
        </div>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="card card-hover relative">
              {/* Wishlist Heart */}
              <button 
                onClick={() => handleRemoveFromWishlist(item.id)}
                className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
              >
                <Heart className="w-5 h-5 text-red-500 fill-current" />
              </button>

              {/* Item Image Placeholder */}
              <div className="aspect-square bg-gradient-to-br from-primary-100 to-accent-100 rounded-t-xl flex items-center justify-center">
                <span className="text-4xl">🏛️</span>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="badge-secondary text-xs">{item.theme}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.isInStock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.isInStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {item.name}
                </h3>
                
                <p className="text-secondary-600 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary-600">Denomination:</span>
                    <span className="font-medium text-secondary-900">{item.denomination}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary-600">Postal Circle:</span>
                    <span className="font-medium text-secondary-900">{item.postalCircle}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary-600">Added:</span>
                    <span className="font-medium text-secondary-900">
                      {new Date(item.dateAdded).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-primary-600">
                    ₹{item.price}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link 
                      to={`/catalog/${item.id}`}
                      className="btn-outline btn-sm"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Link>
                    <button 
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.isInStock}
                      className={`btn-sm ${
                        item.isInStock 
                          ? 'btn-primary' 
                          : 'btn-secondary opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      {item.isInStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="card-body text-center py-16">
            <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-secondary-400" />
            </div>
            <h3 className="text-2xl font-semibold text-secondary-900 mb-3">
              Your wishlist is empty
            </h3>
            <p className="text-secondary-600 mb-6 max-w-md mx-auto">
              Start adding stamps and philatelic items you love to your wishlist. 
              You can save them for later or purchase when ready.
            </p>
            <Link to="/catalog" className="btn-primary inline-flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Explore Catalog
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;