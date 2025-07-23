import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, Eye } from 'lucide-react';

const WishlistPage = () => {
  // Sample wishlist data
  const wishlistItems = [
    {
      id: '1',
      name: 'Chandrayaan-3 Mission',
      description: 'Commemorative stamp celebrating India\'s successful lunar mission.',
      price: 12,
      denomination: '₹12',
      postalCircle: 'Karnataka',
      theme: 'technology',
      isInStock: true,
      dateAdded: '2024-01-10'
    },
    {
      id: '2',
      name: 'Warli Art Heritage',
      description: 'Artistic stamp showcasing traditional Warli paintings of Maharashtra.',
      price: 6,
      denomination: '₹6',
      postalCircle: 'Maharashtra',
      theme: 'art',
      isInStock: true,
      dateAdded: '2024-01-08'
    },
    {
      id: '3',
      name: 'Red Fort First Day Cover',
      description: 'Special first day cover featuring the iconic Red Fort in Delhi.',
      price: 15,
      denomination: 'FDC',
      postalCircle: 'Delhi',
      theme: 'monuments',
      isInStock: false,
      dateAdded: '2024-01-05'
    }
  ];

  const handleRemoveFromWishlist = (itemId) => {
    // In real app, this would call API to remove from wishlist
    console.log('Remove from wishlist:', itemId);
  };

  const handleAddToCart = (item) => {
    // In real app, this would call cart context
    console.log('Add to cart:', item);
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            My Wishlist
          </h1>
          <p className="text-secondary-600">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-secondary-400" />
            </div>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-secondary-600 mb-8">
              Start adding items to your wishlist by clicking the heart icon on any product.
            </p>
            <Link to="/catalog" className="btn-primary btn-lg">
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Wishlist Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="btn-outline">
                  Add All to Cart
                </button>
                <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                  Clear Wishlist
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm text-secondary-600">Sort by:</label>
                <select className="input text-sm">
                  <option>Date Added</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Name: A to Z</option>
                </select>
              </div>
            </div>

            {/* Wishlist Items */}
            <div className="grid gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="card">
                  <div className="card-body">
                    <div className="flex items-center space-x-6">
                      {/* Item Image */}
                      <div className="w-24 h-30 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="text-center">
                          <div className="w-16 h-20 bg-white rounded-lg shadow-sm mx-auto mb-2 flex items-center justify-center">
                            <span className="text-2xl">📮</span>
                          </div>
                          <p className="text-xs text-secondary-600">{item.denomination}</p>
                        </div>
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                              {item.name}
                            </h3>
                            <p className="text-secondary-600 mb-3 line-clamp-2">
                              {item.description}
                            </p>
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="badge-secondary">{item.postalCircle}</span>
                              <span className="badge-secondary">{item.theme}</span>
                              {!item.isInStock && (
                                <span className="badge-error">Out of Stock</span>
                              )}
                            </div>
                            <p className="text-sm text-secondary-500">
                              Added on {new Date(item.dateAdded).toLocaleDateString()}
                            </p>
                          </div>

                          {/* Price and Actions */}
                          <div className="text-right ml-6">
                            <p className="text-2xl font-bold text-primary-600 mb-4">
                              ₹{item.price}
                            </p>
                            <div className="flex items-center space-x-2">
                              <Link
                                to={`/catalog/${item.id}`}
                                className="btn-outline btn-sm"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => handleAddToCart(item)}
                                disabled={!item.isInStock}
                                className="btn-primary btn-sm"
                              >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                {item.isInStock ? 'Add to Cart' : 'Out of Stock'}
                              </button>
                              <button
                                onClick={() => handleRemoveFromWishlist(item.id)}
                                className="btn-outline btn-sm text-red-600 hover:text-red-700 hover:border-red-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <button className="btn-outline">Previous</button>
                <button className="btn-primary">1</button>
                <button className="btn-outline">2</button>
                <button className="btn-outline">3</button>
                <button className="btn-outline">Next</button>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-secondary-900 mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-hover">
                <div className="aspect-square bg-secondary-100 rounded-t-xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-20 bg-white rounded-lg shadow-sm mx-auto mb-2 flex items-center justify-center">
                        <span className="text-2xl">📮</span>
                      </div>
                      <p className="text-xs text-secondary-600">₹{5 + i}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-secondary-900 mb-2">
                    Recommended Item {i}
                  </h3>
                  <p className="text-sm text-secondary-600 mb-3">
                    Sample description for recommended item
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary-600">₹{5 + i}</span>
                    <div className="flex items-center space-x-1">
                      <button className="btn-outline btn-sm">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="btn-primary btn-sm">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;