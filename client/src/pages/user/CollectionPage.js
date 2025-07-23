import React, { useState } from 'react';
import { 
  Plus, 
  Grid3X3, 
  List, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Eye,
  Star,
  Calendar,
  MapPin,
  TrendingUp,
  Share2,
  Download
} from 'lucide-react';

const CollectionPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Sample collection data
  const collections = [
    {
      id: '1',
      name: 'Independence Day Series',
      description: 'Complete collection of Independence Day commemorative stamps',
      itemCount: 15,
      totalValue: 450,
      category: 'commemorative',
      lastUpdated: '2024-01-15',
      visibility: 'private',
      coverImage: '📮'
    },
    {
      id: '2',
      name: 'Wildlife of India',
      description: 'Stamps featuring Indian wildlife and endangered species',
      itemCount: 23,
      totalValue: 780,
      category: 'nature',
      lastUpdated: '2024-01-12',
      visibility: 'public',
      coverImage: '🐅'
    },
    {
      id: '3',
      name: 'Mahatma Gandhi Collection',
      description: 'All stamps issued in honor of Mahatma Gandhi',
      itemCount: 8,
      totalValue: 320,
      category: 'personality',
      lastUpdated: '2024-01-10',
      visibility: 'public',
      coverImage: '🕊️'
    }
  ];

  const recentItems = [
    {
      id: '1',
      name: 'Gandhi 150th Anniversary',
      denomination: '₹5',
      addedDate: '2024-01-15',
      collection: 'Mahatma Gandhi Collection',
      value: 25
    },
    {
      id: '2',
      name: 'Bengal Tiger',
      denomination: '₹10',
      addedDate: '2024-01-14',
      collection: 'Wildlife of India',
      value: 45
    }
  ];

  const stats = {
    totalCollections: collections.length,
    totalItems: collections.reduce((sum, col) => sum + col.itemCount, 0),
    totalValue: collections.reduce((sum, col) => sum + col.totalValue, 0),
    publicCollections: collections.filter(col => col.visibility === 'public').length
  };

  const filteredCollections = collections.filter(collection => {
    const matchesSearch = collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collection.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || collection.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'commemorative', label: 'Commemorative' },
    { value: 'nature', label: 'Nature & Wildlife' },
    { value: 'personality', label: 'Personalities' },
    { value: 'culture', label: 'Art & Culture' },
    { value: 'sports', label: 'Sports' }
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">
              My Collection
            </h1>
            <p className="text-secondary-600">
              Manage and showcase your philatelic treasures
            </p>
          </div>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Create Collection
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="card-body text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Grid3X3 className="w-6 h-6 text-primary-600" />
              </div>
              <p className="text-2xl font-bold text-secondary-900">{stats.totalCollections}</p>
              <p className="text-sm text-secondary-600">Collections</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-secondary-900">{stats.totalItems}</p>
              <p className="text-sm text-secondary-600">Total Items</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-secondary-900">₹{stats.totalValue}</p>
              <p className="text-sm text-secondary-600">Estimated Value</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Share2 className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-secondary-900">{stats.publicCollections}</p>
              <p className="text-sm text-secondary-600">Public</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Collections */}
          <div className="lg:col-span-2">
            {/* Search and Controls */}
            <div className="card mb-6">
              <div className="card-body">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search collections..."
                      className="input pl-10 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-48">
                    <select
                      className="input w-full"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-secondary-600 hover:bg-secondary-100'}`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-secondary-600 hover:bg-secondary-100'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Collections Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredCollections.map((collection) => (
                  <div key={collection.id} className="card-hover">
                    <div className="aspect-video bg-gradient-to-br from-primary-100 to-accent-100 rounded-t-xl flex items-center justify-center">
                      <span className="text-4xl">{collection.coverImage}</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-secondary-900">
                          {collection.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          collection.visibility === 'public' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-secondary-100 text-secondary-600'
                        }`}>
                          {collection.visibility}
                        </span>
                      </div>
                      <p className="text-sm text-secondary-600 mb-4 line-clamp-2">
                        {collection.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-secondary-600 mb-4">
                        <span>{collection.itemCount} items</span>
                        <span>₹{collection.totalValue}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-secondary-500">
                          Updated {new Date(collection.lastUpdated).toLocaleDateString()}
                        </span>
                        <div className="flex items-center space-x-1">
                          <button className="p-1 text-secondary-600 hover:text-primary-600">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-secondary-600 hover:text-primary-600">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-secondary-600 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCollections.map((collection) => (
                  <div key={collection.id} className="card">
                    <div className="card-body">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">{collection.coverImage}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                                {collection.name}
                              </h3>
                              <p className="text-sm text-secondary-600 mb-2">
                                {collection.description}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-secondary-600">
                                <span>{collection.itemCount} items</span>
                                <span>₹{collection.totalValue}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  collection.visibility === 'public' 
                                    ? 'bg-green-100 text-green-600' 
                                    : 'bg-secondary-100 text-secondary-600'
                                }`}>
                                  {collection.visibility}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <button className="p-1 text-secondary-600 hover:text-primary-600">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-secondary-600 hover:text-primary-600">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-secondary-600 hover:text-red-600">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredCollections.length === 0 && (
              <div className="card">
                <div className="card-body text-center py-12">
                  <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Grid3X3 className="w-12 h-12 text-secondary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                    No collections found
                  </h3>
                  <p className="text-secondary-600 mb-4">
                    {searchTerm || selectedCategory 
                      ? 'Try adjusting your search or filters.'
                      : 'Start building your first collection of philatelic treasures.'
                    }
                  </p>
                  <button className="btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Collection
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-semibold text-secondary-900">Quick Actions</h2>
              </div>
              <div className="card-body">
                <div className="space-y-3">
                  <button className="btn-primary w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Items to Collection
                  </button>
                  <button className="btn-outline w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export Collection
                  </button>
                  <button className="btn-outline w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Collection
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Additions */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-semibold text-secondary-900">Recent Additions</h2>
              </div>
              <div className="card-body">
                <div className="space-y-3">
                  {recentItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                      <div className="w-10 h-12 bg-gradient-to-br from-primary-100 to-accent-100 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-xs">📮</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-secondary-900 text-sm truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-secondary-600 truncate">
                          {item.collection}
                        </p>
                        <p className="text-xs text-secondary-500">
                          Added {new Date(item.addedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-secondary-900">
                        ₹{item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Collection Tips */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-semibold text-secondary-900">Collection Tips</h2>
              </div>
              <div className="card-body">
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-primary-50 rounded-lg">
                    <p className="font-medium text-primary-800 mb-1">Organize by Theme</p>
                    <p className="text-primary-700">Group stamps by subjects like wildlife, monuments, or personalities for better organization.</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-800 mb-1">Document Condition</p>
                    <p className="text-blue-700">Always note the condition of your stamps to track their value accurately.</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-800 mb-1">Share Public Collections</p>
                    <p className="text-green-700">Make collections public to connect with other collectors and share knowledge.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;