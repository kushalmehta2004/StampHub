import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  MoreVertical,
  Package,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  Download,
  Upload,
  Copy,
  Archive,
  RefreshCw
} from 'lucide-react';

const AdminCatalog = () => {
  const [catalogItems, setCatalogItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('dateAdded');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Catalog data - will be fetched from API
  const sampleCatalogItems = [];

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'stamps', label: 'Stamps' },
    { value: 'postcards', label: 'Postcards' },
    { value: 'covers', label: 'First Day Covers' },
    { value: 'sheets', label: 'Miniature Sheets' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'draft', label: 'Draft' },
    { value: 'archived', label: 'Archived' },
    { value: 'discontinued', label: 'Discontinued' }
  ];

  const availabilityOptions = [
    { value: '', label: 'All Availability' },
    { value: 'in-stock', label: 'In Stock' },
    { value: 'low-stock', label: 'Low Stock' },
    { value: 'out-of-stock', label: 'Out of Stock' },
    { value: 'coming-soon', label: 'Coming Soon' }
  ];

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setCatalogItems(sampleCatalogItems);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and sort items
  const filteredItems = catalogItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    const matchesStatus = !selectedStatus || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  }).sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-600';
      case 'draft':
        return 'bg-yellow-100 text-yellow-600';
      case 'archived':
        return 'bg-gray-100 text-gray-600';
      case 'discontinued':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'in-stock':
        return 'bg-green-100 text-green-600';
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-600';
      case 'out-of-stock':
        return 'bg-red-100 text-red-600';
      case 'coming-soon':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getAvailabilityIcon = (availability) => {
    switch (availability) {
      case 'in-stock':
        return <CheckCircle className="w-4 h-4" />;
      case 'low-stock':
        return <AlertTriangle className="w-4 h-4" />;
      case 'out-of-stock':
        return <XCircle className="w-4 h-4" />;
      case 'coming-soon':
        return <Package className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  const handleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on items:`, selectedItems);
    // In real app, this would make API calls
    setSelectedItems([]);
    setShowBulkActions(false);
  };

  const handleStatusChange = (itemId, newStatus) => {
    setCatalogItems(items => 
      items.map(item => 
        item.id === itemId 
          ? { ...item, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
          : item
      )
    );
  };

  const handleStockUpdate = (itemId, newStock) => {
    setCatalogItems(items => 
      items.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              stock: newStock, 
              availability: newStock === 0 ? 'out-of-stock' : 
                          newStock <= item.lowStockThreshold ? 'low-stock' : 'in-stock',
              lastUpdated: new Date().toISOString().split('T')[0]
            }
          : item
      )
    );
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setCatalogItems(items => items.filter(item => item.id !== itemId));
    }
  };

  useEffect(() => {
    setShowBulkActions(selectedItems.length > 0);
  }, [selectedItems]);

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Catalog Management</h1>
            <p className="text-secondary-600 mt-1">Manage stamps, postcards, and other philatelic items</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="btn-outline btn-sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button className="btn-outline btn-sm">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </button>
            <Link to="/admin/catalog/new" className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add New Item
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card mb-6">
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search items..."
                  className="input pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select 
                className="input"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              <select 
                className="input"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statusOptions.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>

              <select 
                className="input"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="dateAdded">Date Added</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="stock">Stock</option>
                <option value="views">Views</option>
                <option value="orders">Orders</option>
              </select>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="btn-outline btn-sm"
                >
                  {sortOrder === 'asc' ? '↑' : '↓'} Sort
                </button>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('');
                    setSelectedStatus('');
                    setSortBy('dateAdded');
                    setSortOrder('desc');
                  }}
                  className="btn-outline btn-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {showBulkActions && (
          <div className="card mb-6 bg-blue-50 border-blue-200">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-blue-900">
                    {selectedItems.length} item(s) selected
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleBulkAction('activate')}
                    className="btn-outline btn-sm text-green-600 border-green-300 hover:bg-green-50"
                  >
                    Activate
                  </button>
                  <button 
                    onClick={() => handleBulkAction('deactivate')}
                    className="btn-outline btn-sm text-yellow-600 border-yellow-300 hover:bg-yellow-50"
                  >
                    Deactivate
                  </button>
                  <button 
                    onClick={() => handleBulkAction('archive')}
                    className="btn-outline btn-sm text-gray-600 border-gray-300 hover:bg-gray-50"
                  >
                    Archive
                  </button>
                  <button 
                    onClick={() => handleBulkAction('delete')}
                    className="btn-outline btn-sm text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Catalog Items Table */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-secondary-900">
                Catalog Items ({filteredItems.length})
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-secondary-600">
                  Showing {filteredItems.length} of {catalogItems.length} items
                </span>
              </div>
            </div>
          </div>
          <div className="card-body p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary-50">
                    <tr>
                      <th className="text-left py-3 px-6">
                        <input
                          type="checkbox"
                          checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                          onChange={handleSelectAll}
                          className="rounded border-secondary-300"
                        />
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-secondary-600">Item</th>
                      <th className="text-left py-3 px-6 font-medium text-secondary-600">Category</th>
                      <th className="text-left py-3 px-6 font-medium text-secondary-600">Price</th>
                      <th className="text-left py-3 px-6 font-medium text-secondary-600">Stock</th>
                      <th className="text-left py-3 px-6 font-medium text-secondary-600">Status</th>
                      <th className="text-left py-3 px-6 font-medium text-secondary-600">Availability</th>
                      <th className="text-left py-3 px-6 font-medium text-secondary-600">Performance</th>
                      <th className="text-left py-3 px-6 font-medium text-secondary-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="border-b border-secondary-100 hover:bg-secondary-50">
                        <td className="py-4 px-6">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                            className="rounded border-secondary-300"
                          />
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center">
                              <span className="text-lg">📮</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-secondary-900">{item.name}</h4>
                              <p className="text-sm text-secondary-600">{item.description}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                {item.featured && (
                                  <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full">
                                    Featured
                                  </span>
                                )}
                                <span className="text-xs text-secondary-500">{item.year}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm">
                            <p className="font-medium text-secondary-900 capitalize">{item.category}</p>
                            <p className="text-secondary-600 capitalize">{item.subcategory}</p>
                            <p className="text-secondary-500">{item.postalCircle}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm">
                            <p className="font-semibold text-secondary-900">₹{item.price}</p>
                            {item.originalPrice !== item.price && (
                              <p className="text-secondary-500 line-through">₹{item.originalPrice}</p>
                            )}
                            <p className="text-secondary-600">{item.denomination}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm">
                            <p className={`font-medium ${item.stock <= item.lowStockThreshold ? 'text-red-600' : 'text-secondary-900'}`}>
                              {item.stock} units
                            </p>
                            <p className="text-secondary-600">
                              Min: {item.lowStockThreshold}
                            </p>
                            <button 
                              onClick={() => {
                                const newStock = prompt('Enter new stock quantity:', item.stock);
                                if (newStock !== null && !isNaN(newStock)) {
                                  handleStockUpdate(item.id, parseInt(newStock));
                                }
                              }}
                              className="text-primary-600 hover:text-primary-700 text-xs"
                            >
                              Update
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <select
                            value={item.status}
                            onChange={(e) => handleStatusChange(item.id, e.target.value)}
                            className={`text-xs px-2 py-1 rounded-full border-0 ${getStatusColor(item.status)}`}
                          >
                            <option value="active">Active</option>
                            <option value="draft">Draft</option>
                            <option value="archived">Archived</option>
                            <option value="discontinued">Discontinued</option>
                          </select>
                        </td>
                        <td className="py-4 px-6">
                          <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getAvailabilityColor(item.availability)}`}>
                            {getAvailabilityIcon(item.availability)}
                            <span className="capitalize">{item.availability.replace('-', ' ')}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm">
                            <div className="flex items-center space-x-2 mb-1">
                              <Eye className="w-3 h-3 text-secondary-500" />
                              <span className="text-secondary-600">{item.views}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Package className="w-3 h-3 text-secondary-500" />
                              <span className="text-secondary-600">{item.orders} orders</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <Link
                              to={`/admin/catalog/${item.id}/edit`}
                              className="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <Link
                              to={`/catalog/${item.id}`}
                              className="p-2 text-secondary-600 hover:text-secondary-700 hover:bg-secondary-50 rounded-lg transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="card">
            <div className="card-body text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {catalogItems.filter(item => item.status === 'active').length}
              </div>
              <div className="text-sm text-secondary-600">Active Items</div>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {catalogItems.filter(item => item.availability === 'low-stock').length}
              </div>
              <div className="text-sm text-secondary-600">Low Stock</div>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">
                {catalogItems.filter(item => item.availability === 'out-of-stock').length}
              </div>
              <div className="text-sm text-secondary-600">Out of Stock</div>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {catalogItems.filter(item => item.status === 'draft').length}
              </div>
              <div className="text-sm text-secondary-600">Draft Items</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCatalog;