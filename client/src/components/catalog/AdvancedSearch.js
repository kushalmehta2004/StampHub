import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  Calendar,
  MapPin,
  Tag,
  DollarSign,
  SlidersHorizontal
} from 'lucide-react';

const AdvancedSearch = ({ onSearch, onFilterChange, filters = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [localFilters, setLocalFilters] = useState({
    category: filters.category || '',
    postalCircle: filters.postalCircle || '',
    theme: filters.theme || '',
    yearRange: filters.yearRange || { min: '', max: '' },
    priceRange: filters.priceRange || { min: '', max: '' },
    denomination: filters.denomination || '',
    condition: filters.condition || '',
    availability: filters.availability || ''
  });

  const categories = [
    'stamps', 'first-day-covers', 'miniature-sheets', 'postal-stationery'
  ];

  const postalCircles = [
    'Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Karnataka', 'Kerala', 
    'Maharashtra', 'Gujarat', 'Rajasthan', 'Punjab', 'Haryana'
  ];

  const themes = [
    'nature', 'culture', 'technology', 'sports', 'monuments', 'freedom-fighters',
    'festivals', 'art', 'wildlife', 'space', 'railways', 'defense'
  ];

  const conditions = [
    'mint', 'very-fine', 'fine', 'good', 'fair'
  ];

  const handleSearch = () => {
    const searchData = {
      search: searchTerm,
      ...localFilters
    };
    onSearch(searchData);
  };

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFilterChange({ search: searchTerm, ...updatedFilters });
  };

  const handleRangeChange = (rangeType, field, value) => {
    const updatedRange = { ...localFilters[rangeType], [field]: value };
    handleFilterChange(rangeType, updatedRange);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocalFilters({
      category: '',
      postalCircle: '',
      theme: '',
      yearRange: { min: '', max: '' },
      priceRange: { min: '', max: '' },
      denomination: '',
      condition: '',
      availability: ''
    });
    onSearch({ search: '' });
  };

  const activeFiltersCount = Object.values(localFilters).filter(value => {
    if (typeof value === 'object') {
      return value.min || value.max;
    }
    return value;
  }).length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200">
      {/* Basic Search */}
      <div className="p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search stamps, covers, themes..."
              className="input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={handleSearch}
            className="btn-primary"
          >
            Search
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`btn-outline relative ${activeFiltersCount > 0 ? 'bg-primary-50 border-primary-300' : ''}`}
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="border-t border-secondary-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Category */}
            <div>
              <label className="label">Category</label>
              <select
                className="input text-sm"
                value={localFilters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            {/* Postal Circle */}
            <div>
              <label className="label">Postal Circle</label>
              <select
                className="input text-sm"
                value={localFilters.postalCircle}
                onChange={(e) => handleFilterChange('postalCircle', e.target.value)}
              >
                <option value="">All Circles</option>
                {postalCircles.map(circle => (
                  <option key={circle} value={circle}>{circle}</option>
                ))}
              </select>
            </div>

            {/* Theme */}
            <div>
              <label className="label">Theme</label>
              <select
                className="input text-sm"
                value={localFilters.theme}
                onChange={(e) => handleFilterChange('theme', e.target.value)}
              >
                <option value="">All Themes</option>
                {themes.map(theme => (
                  <option key={theme} value={theme}>
                    {theme.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition */}
            <div>
              <label className="label">Condition</label>
              <select
                className="input text-sm"
                value={localFilters.condition}
                onChange={(e) => handleFilterChange('condition', e.target.value)}
              >
                <option value="">Any Condition</option>
                {conditions.map(condition => (
                  <option key={condition} value={condition}>
                    {condition.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Range Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {/* Price Range */}
            <div>
              <label className="label flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                Price Range (₹)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="input text-sm"
                  value={localFilters.priceRange.min}
                  onChange={(e) => handleRangeChange('priceRange', 'min', e.target.value)}
                />
                <span className="text-secondary-600">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="input text-sm"
                  value={localFilters.priceRange.max}
                  onChange={(e) => handleRangeChange('priceRange', 'max', e.target.value)}
                />
              </div>
            </div>

            {/* Year Range */}
            <div>
              <label className="label flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Year Range
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="From"
                  className="input text-sm"
                  min="1947"
                  max={new Date().getFullYear()}
                  value={localFilters.yearRange.min}
                  onChange={(e) => handleRangeChange('yearRange', 'min', e.target.value)}
                />
                <span className="text-secondary-600">to</span>
                <input
                  type="number"
                  placeholder="To"
                  className="input text-sm"
                  min="1947"
                  max={new Date().getFullYear()}
                  value={localFilters.yearRange.max}
                  onChange={(e) => handleRangeChange('yearRange', 'max', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label">Denomination</label>
              <input
                type="text"
                placeholder="e.g., ₹5, ₹10"
                className="input text-sm"
                value={localFilters.denomination}
                onChange={(e) => handleFilterChange('denomination', e.target.value)}
              />
            </div>

            <div>
              <label className="label">Availability</label>
              <select
                className="input text-sm"
                value={localFilters.availability}
                onChange={(e) => handleFilterChange('availability', e.target.value)}
              >
                <option value="">All Items</option>
                <option value="in-stock">In Stock Only</option>
                <option value="low-stock">Low Stock</option>
                <option value="pre-order">Pre-order</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-secondary-200">
            <button
              onClick={clearFilters}
              className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center"
            >
              <X className="w-4 h-4 mr-1" />
              Clear All Filters
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsExpanded(false)}
                className="btn-outline btn-sm"
              >
                Collapse
              </button>
              <button
                onClick={handleSearch}
                className="btn-primary btn-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;