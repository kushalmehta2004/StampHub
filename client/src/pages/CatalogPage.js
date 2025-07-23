import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Grid, List, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AdvancedSearch from '../components/catalog/AdvancedSearch';

const CatalogPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    postalCircle: '',
    priceRange: '',
    theme: ''
  });
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  // Sample catalog items (in real app, this would come from API)
  const catalogItems = [
    {
      _id: '1',
      name: "Mahatma Gandhi 150th Birth Anniversary",
      description: "Commemorative stamp celebrating 150 years of Mahatma Gandhi's birth.",
      category: "stamps",
      theme: "personalities",
      postalCircle: "Delhi",
      price: 5,
      denomination: "₹5",
      images: [{ url: "/images/gandhi-150.jpg", alt: "Gandhi Stamp", isPrimary: true }],
      stock: { available: 1000 },
      isInStock: true,
      isFeatured: true
    },
    {
      _id: '2',
      name: "Indian Railways Heritage - Steam Locomotives",
      description: "A beautiful set showcasing the heritage steam locomotives of Indian Railways.",
      category: "stamps",
      theme: "technology",
      postalCircle: "Maharashtra",
      price: 25,
      denomination: "₹5 x 5",
      images: [{ url: "/images/railways-heritage.jpg", alt: "Railways Stamp", isPrimary: true }],
      stock: { available: 500 },
      isInStock: true,
      isFeatured: true
    },
    {
      _id: '3',
      name: "Kerala Backwaters",
      description: "Stunning stamp featuring the serene backwaters of Kerala.",
      category: "stamps",
      theme: "nature",
      postalCircle: "Kerala",
      price: 10,
      denomination: "₹10",
      images: [{ url: "/images/kerala-backwaters.jpg", alt: "Kerala Stamp", isPrimary: true }],
      stock: { available: 750 },
      isInStock: true,
      isFeatured: false
    }
  ];

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'stamps', label: 'Stamps' },
    { value: 'first-day-covers', label: 'First Day Covers' },
    { value: 'miniature-sheets', label: 'Miniature Sheets' }
  ];

  const postalCircles = [
    { value: '', label: 'All Postal Circles' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Kerala', label: 'Kerala' },
    { value: 'Karnataka', label: 'Karnataka' }
  ];

  const handleSearch = (searchData) => {
    setSearchTerm(searchData.search || '');
    setFilters({
      category: searchData.category || '',
      postalCircle: searchData.postalCircle || '',
      theme: searchData.theme || '',
      priceRange: searchData.priceRange || { min: '', max: '' },
      yearRange: searchData.yearRange || { min: '', max: '' },
      condition: searchData.condition || '',
      denomination: searchData.denomination || '',
      availability: searchData.availability || ''
    });
  };

  const handleFilterChange = (searchData) => {
    handleSearch(searchData);
  };

  const handleAddToCart = (item) => {
    addToCart(item, 1);
  };

  const filteredItems = catalogItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filters.category || item.category === filters.category;
    const matchesPostalCircle = !filters.postalCircle || item.postalCircle === filters.postalCircle;
    
    return matchesSearch && matchesCategory && matchesPostalCircle;
  });

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <div className="bg-white border-b border-secondary-200">
        <div className="container-custom py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
              Philatelic Catalog
            </h1>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Discover authentic stamps and postal items from all Indian postal circles
            </p>
          </div>

          {/* Advanced Search */}
          <AdvancedSearch 
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            filters={{ search: searchTerm, ...filters }}
          />
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Filter className="w-5 h-5 text-primary-600" />
                <h3 className="text-lg font-semibold text-secondary-900">Filters</h3>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="label">Category</label>
                  <select
                    className="input"
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                {/* Postal Circle Filter */}
                <div>
                  <label className="label">Postal Circle</label>
                  <select
                    className="input"
                    value={filters.postalCircle}
                    onChange={(e) => setFilters({...filters, postalCircle: e.target.value})}
                  >
                    {postalCircles.map(circle => (
                      <option key={circle.value} value={circle.value}>{circle.label}</option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => setFilters({ category: '', postalCircle: '', priceRange: '', theme: '' })}
                  className="btn-outline w-full"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-secondary-600">
                Showing {filteredItems.length} items
              </div>
              
              <div className="flex items-center space-x-4">
                {/* View Mode Toggle */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-secondary-400 hover:text-secondary-600'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-secondary-400 hover:text-secondary-600'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" text="Loading catalog..." />
              </div>
            )}

            {/* Items Grid/List */}
            {!loading && (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
              }>
                {filteredItems.map((item) => (
                  <div key={item._id} className={`card-hover ${viewMode === 'list' ? 'flex' : ''}`}>
                    {/* Item Image */}
                    <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'} bg-secondary-100 rounded-t-xl ${viewMode === 'list' ? 'rounded-l-xl rounded-tr-none' : ''} overflow-hidden relative group`}>
                      <div className="w-full h-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-20 bg-white rounded-lg shadow-sm mx-auto mb-2 flex items-center justify-center">
                            <span className="text-2xl">📮</span>
                          </div>
                          <p className="text-xs text-secondary-600">{item.denomination}</p>
                        </div>
                      </div>
                      
                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
                        <button className="btn-primary btn-sm">
                          <Heart className="w-4 h-4" />
                        </button>
                        <Link to={`/catalog/${item._id}`} className="btn-secondary btn-sm">
                          View Details
                        </Link>
                      </div>

                      {/* Featured Badge */}
                      {item.isFeatured && (
                        <div className="absolute top-2 left-2">
                          <span className="badge-primary">Featured</span>
                        </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className={`${viewMode === 'list' ? 'flex-1' : ''} p-6`}>
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold text-secondary-900 line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-sm text-secondary-600 line-clamp-2">
                            {item.description}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="badge-secondary">{item.postalCircle}</span>
                          <span className="badge-secondary">{item.theme}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold text-primary-600">₹{item.price}</span>
                            <p className="text-xs text-secondary-500">
                              {item.stock.available} in stock
                            </p>
                          </div>

                          <button
                            onClick={() => handleAddToCart(item)}
                            className="btn-primary"
                            disabled={!item.isInStock}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && filteredItems.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-secondary-400" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  No items found
                </h3>
                <p className="text-secondary-600 mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({ category: '', postalCircle: '', priceRange: '', theme: '' });
                  }}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;