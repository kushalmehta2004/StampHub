import React, { useState, useEffect } from 'react';
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
  Download,
  Package
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const CollectionPage = () => {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [collections, setCollections] = useState([]);
  const [recentItems, setRecentItems] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCollection, setNewCollection] = useState({
    name: '',
    description: '',
    category: '',
    visibility: 'private'
  });

  useEffect(() => {
    // Load collections from localStorage
    const storedCollections = localStorage.getItem(`collections_${user?.id}`);
    if (storedCollections) {
      setCollections(JSON.parse(storedCollections));
    }

    // Load recent items
    const storedRecentItems = localStorage.getItem(`recent_items_${user?.id}`);
    if (storedRecentItems) {
      setRecentItems(JSON.parse(storedRecentItems));
    }
  }, [user]);

  const handleCreateCollection = () => {
    if (!newCollection.name.trim()) {
      toast.error('Collection name is required');
      return;
    }

    const collection = {
      id: Date.now().toString(),
      name: newCollection.name,
      description: newCollection.description,
      category: newCollection.category,
      visibility: newCollection.visibility,
      itemCount: 0,
      totalValue: 0,
      lastUpdated: new Date().toISOString(),
      coverImage: '📮',
      items: []
    };

    const updatedCollections = [...collections, collection];
    setCollections(updatedCollections);
    localStorage.setItem(`collections_${user?.id}`, JSON.stringify(updatedCollections));
    
    setNewCollection({ name: '', description: '', category: '', visibility: 'private' });
    setShowCreateModal(false);
    toast.success('Collection created successfully!');
  };

  const handleDeleteCollection = (collectionId) => {
    if (window.confirm('Are you sure you want to delete this collection?')) {
      const updatedCollections = collections.filter(col => col.id !== collectionId);
      setCollections(updatedCollections);
      localStorage.setItem(`collections_${user?.id}`, JSON.stringify(updatedCollections));
      toast.success('Collection deleted successfully!');
    }
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
    { value: 'sports', label: 'Sports' },
    { value: 'historical', label: 'Historical' },
    { value: 'modern', label: 'Modern' }
  ];

  const stats = {
    totalCollections: collections.length,
    totalItems: collections.reduce((sum, col) => sum + (col.itemCount || 0), 0),
    totalValue: collections.reduce((sum, col) => sum + (col.totalValue || 0), 0),
    publicCollections: collections.filter(col => col.visibility === 'public').length
  };

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">My Collections</h1>
          <p className="text-secondary-600">
            Organize and manage your philatelic treasures
          </p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn-primary"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Collection
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="card-body text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {stats.totalCollections}
            </div>
            <div className="text-sm text-secondary-600">Collections</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {stats.totalItems}
            </div>
            <div className="text-sm text-secondary-600">Total Items</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              ₹{stats.totalValue}
            </div>
            <div className="text-sm text-secondary-600">Total Value</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {stats.publicCollections}
            </div>
            <div className="text-sm text-secondary-600">Public</div>
          </div>
        </div>
      </div>

      {/* Filters and View Controls */}
      <div className="card mb-6">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search collections..."
                  className="input pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="input w-full md:w-48"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${
                  viewMode === 'grid' 
                    ? 'bg-primary-600 text-white' 
                    : 'text-secondary-600 hover:bg-secondary-100'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${
                  viewMode === 'list' 
                    ? 'bg-primary-600 text-white' 
                    : 'text-secondary-600 hover:bg-secondary-100'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Collections */}
      {filteredCollections.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
        }>
          {filteredCollections.map((collection) => (
            viewMode === 'grid' ? (
              <div key={collection.id} className="card card-hover">
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-accent-100 rounded-t-xl flex items-center justify-center">
                  <span className="text-4xl">{collection.coverImage}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="badge-secondary text-xs capitalize">
                      {collection.category || 'uncategorized'}
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${
                        collection.visibility === 'public' ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                      <span className="text-xs text-secondary-600 capitalize">
                        {collection.visibility}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                    {collection.name}
                  </h3>
                  
                  <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
                    {collection.description || 'No description available'}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-center text-sm">
                    <div>
                      <div className="text-secondary-900 font-medium">
                        {collection.itemCount || 0}
                      </div>
                      <div className="text-secondary-600 text-xs">Items</div>
                    </div>
                    <div>
                      <div className="text-secondary-900 font-medium">
                        ₹{collection.totalValue || 0}
                      </div>
                      <div className="text-secondary-600 text-xs">Value</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-secondary-500">
                      Updated {new Date(collection.lastUpdated).toLocaleDateString()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="btn-outline btn-sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                      <button 
                        onClick={() => handleDeleteCollection(collection.id)}
                        className="btn-outline btn-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div key={collection.id} className="card">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center text-2xl">
                        {collection.coverImage}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                          {collection.name}
                        </h3>
                        <p className="text-secondary-600 text-sm mb-2">
                          {collection.description || 'No description available'}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-secondary-600">
                          <span>{collection.itemCount || 0} items</span>
                          <span>₹{collection.totalValue || 0} value</span>
                          <span className="capitalize">{collection.category || 'uncategorized'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="btn-outline btn-sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                      <button 
                        onClick={() => handleDeleteCollection(collection.id)}
                        className="btn-outline btn-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="card-body text-center py-16">
            <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-secondary-400" />
            </div>
            <h3 className="text-2xl font-semibold text-secondary-900 mb-3">
              No collections yet
            </h3>
            <p className="text-secondary-600 mb-6 max-w-md mx-auto">
              Create your first collection to organize your stamps and philatelic items. 
              You can categorize them by theme, country, or any way you prefer.
            </p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="btn-primary inline-flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Collection
            </button>
          </div>
        </div>
      )}

      {/* Create Collection Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">
              Create New Collection
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Collection Name *
                </label>
                <input
                  type="text"
                  className="input w-full"
                  value={newCollection.name}
                  onChange={(e) => setNewCollection({...newCollection, name: e.target.value})}
                  placeholder="e.g., Independence Day Series"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Description
                </label>
                <textarea
                  className="input w-full"
                  rows="3"
                  value={newCollection.description}
                  onChange={(e) => setNewCollection({...newCollection, description: e.target.value})}
                  placeholder="Describe your collection..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Category
                </label>
                <select
                  className="input w-full"
                  value={newCollection.category}
                  onChange={(e) => setNewCollection({...newCollection, category: e.target.value})}
                >
                  <option value="">Select a category</option>
                  {categories.slice(1).map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Visibility
                </label>
                <select
                  className="input w-full"
                  value={newCollection.visibility}
                  onChange={(e) => setNewCollection({...newCollection, visibility: e.target.value})}
                >
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="btn-outline"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateCollection}
                className="btn-primary"
              >
                Create Collection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionPage;