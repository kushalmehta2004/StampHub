import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  User,
  FileText,
  Image,
  Globe,
  Clock,
  TrendingUp,
  MessageSquare,
  Share2,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  Archive,
  Send,
  Save,
  Bookmark
} from 'lucide-react';

const AdminNewsManagement = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [sortBy, setSortBy] = useState('publishDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // News articles data - will be fetched from API
  const sampleNewsArticles = [];

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'releases', label: 'New Releases' },
    { value: 'awards', label: 'Awards & Recognition' },
    { value: 'technology', label: 'Technology' },
    { value: 'auctions', label: 'Auctions & Sales' },
    { value: 'education', label: 'Education' },
    { value: 'events', label: 'Events' },
    { value: 'community', label: 'Community' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'archived', label: 'Archived' }
  ];

  const authors = [
    { value: '', label: 'All Authors' },
    { value: 'admin-1', label: 'Admin Team' },
    { value: 'author-2', label: 'Priya Sharma' },
    { value: 'tech-1', label: 'Tech Team' },
    { value: 'reporter-1', label: 'Auction Reporter' },
    { value: 'edu-1', label: 'Education Team' }
  ];

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setNewsArticles(sampleNewsArticles);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and sort articles
  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    const matchesStatus = !selectedStatus || article.status === selectedStatus;
    const matchesAuthor = !selectedAuthor || article.authorId === selectedAuthor;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesAuthor;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (sortBy === 'publishDate') {
      aValue = new Date(aValue || 0);
      bValue = new Date(bValue || 0);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-600';
      case 'draft':
        return 'bg-yellow-100 text-yellow-600';
      case 'scheduled':
        return 'bg-blue-100 text-blue-600';
      case 'archived':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-600';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600';
      case 'low':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">News Management</h1>
            <p className="text-secondary-600 mt-1">Create and manage news articles</p>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/admin/news/analytics" className="btn-outline btn-sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </Link>
            <Link to="/admin/news/new" className="btn-primary btn-sm">
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Total Articles</p>
                  <p className="text-2xl font-bold text-secondary-900">{newsArticles.length || 0}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Published</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {newsArticles.filter(a => a.status === 'published').length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Draft Articles</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {newsArticles.filter(a => a.status === 'draft').length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Edit className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Total Views</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {newsArticles.reduce((sum, a) => sum + (a.views || 0), 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card mb-8">
          <div className="card-body">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field min-w-[150px]"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="input-field min-w-[120px]"
                >
                  {statusOptions.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                  className="input-field min-w-[150px]"
                >
                  {authors.map(author => (
                    <option key={author.value} value={author.value}>
                      {author.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary-200">
                  <th className="text-left py-4 px-6 font-semibold text-secondary-900">Article</th>
                  <th className="text-left py-4 px-6 font-semibold text-secondary-900">Category</th>
                  <th className="text-left py-4 px-6 font-semibold text-secondary-900">Author</th>
                  <th className="text-left py-4 px-6 font-semibold text-secondary-900">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-secondary-900">Published</th>
                  <th className="text-left py-4 px-6 font-semibold text-secondary-900">Views</th>
                  <th className="text-left py-4 px-6 font-semibold text-secondary-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedArticles.length === 0 && !isLoading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12">
                      <div className="flex flex-col items-center">
                        <FileText className="w-12 h-12 text-secondary-400 mb-4" />
                        <h3 className="text-lg font-medium text-secondary-900 mb-2">No articles found</h3>
                        <p className="text-secondary-600">Create your first news article to get started.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  sortedArticles.map((article) => (
                    <tr key={article.id} className="border-b border-secondary-100 hover:bg-secondary-50">
                      <td className="py-4 px-6">
                        <div>
                          <h3 className="font-medium text-secondary-900 mb-1">{article.title}</h3>
                          <p className="text-sm text-secondary-600 line-clamp-2">{article.excerpt}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-secondary-100 text-secondary-700">
                          {categories.find(c => c.value === article.category)?.label || article.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-secondary-900">{article.author}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(article.status)}`}>
                          {article.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-secondary-900">
                          {article.publishDate ? new Date(article.publishDate).toLocaleDateString() : '-'}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-secondary-900">{article.views || 0}</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button className="btn-outline btn-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </button>
                          <button className="btn-outline btn-xs">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNewsManagement;