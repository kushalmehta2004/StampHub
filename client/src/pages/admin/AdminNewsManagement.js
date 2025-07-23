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

  // Sample news articles data
  const sampleNewsArticles = [
    {
      id: '1',
      title: 'New Commemorative Stamps Released for World Post Day 2024',
      slug: 'world-post-day-2024-commemorative-stamps',
      excerpt: 'India Post announces special edition stamps celebrating international postal heritage and modern communication.',
      content: 'Full article content here...',
      category: 'releases',
      subcategory: 'commemorative',
      author: 'Admin Team',
      authorId: 'admin-1',
      status: 'published',
      publishDate: '2024-01-20',
      lastModified: '2024-01-21',
      scheduledDate: null,
      featured: true,
      featuredImage: '/images/news/world-post-day-2024.jpg',
      tags: ['world-post-day', 'commemorative', 'india-post', '2024'],
      views: 2450,
      likes: 124,
      shares: 45,
      comments: 23,
      readTime: 5,
      seoTitle: 'World Post Day 2024 Commemorative Stamps | India Post',
      metaDescription: 'Discover the new commemorative stamps released for World Post Day 2024...',
      priority: 'high',
      isBreaking: false,
      newsletter: true,
      socialShared: true
    },
    {
      id: '2',
      title: 'Mysore Palace Stamp Series Wins International Design Award',
      slug: 'mysore-palace-stamp-design-award',
      excerpt: 'The Mysore Palace heritage stamp series has been recognized at the International Philatelic Design Awards.',
      content: 'Full article content here...',
      category: 'awards',
      subcategory: 'recognition',
      author: 'Priya Sharma',
      authorId: 'author-2',
      status: 'published',
      publishDate: '2024-01-18',
      lastModified: '2024-01-19',
      scheduledDate: null,
      featured: false,
      featuredImage: '/images/news/mysore-palace-award.jpg',
      tags: ['mysore-palace', 'design-award', 'heritage', 'international'],
      views: 1890,
      likes: 89,
      shares: 32,
      comments: 15,
      readTime: 3,
      seoTitle: 'Mysore Palace Stamps Win International Design Award',
      metaDescription: 'Mysore Palace heritage stamp series wins prestigious international award...',
      priority: 'medium',
      isBreaking: false,
      newsletter: true,
      socialShared: true
    },
    {
      id: '3',
      title: 'Digital Philately Platform Launches Advanced Search Features',
      slug: 'digital-philately-advanced-search',
      excerpt: 'New AI-powered search capabilities make stamp discovery easier for collectors worldwide.',
      content: 'Full article content here...',
      category: 'technology',
      subcategory: 'platform-updates',
      author: 'Tech Team',
      authorId: 'tech-1',
      status: 'draft',
      publishDate: null,
      lastModified: '2024-01-22',
      scheduledDate: '2024-01-25',
      featured: false,
      featuredImage: '/images/news/digital-platform-update.jpg',
      tags: ['digital-philately', 'ai-search', 'technology', 'platform'],
      views: 0,
      likes: 0,
      shares: 0,
      comments: 0,
      readTime: 4,
      seoTitle: 'Advanced Search Features for Digital Philately',
      metaDescription: 'Discover new AI-powered search features for stamp collectors...',
      priority: 'medium',
      isBreaking: false,
      newsletter: false,
      socialShared: false
    },
    {
      id: '4',
      title: 'Rare Gandhi Stamp Sells for Record Price at Auction',
      slug: 'gandhi-stamp-record-auction',
      excerpt: 'A 1948 Gandhi memorial stamp with printing error fetches ₹50 lakhs at Mumbai auction.',
      content: 'Full article content here...',
      category: 'auctions',
      subcategory: 'record-sales',
      author: 'Auction Reporter',
      authorId: 'reporter-1',
      status: 'published',
      publishDate: '2024-01-15',
      lastModified: '2024-01-16',
      scheduledDate: null,
      featured: true,
      featuredImage: '/images/news/gandhi-stamp-auction.jpg',
      tags: ['gandhi', 'auction', 'record-price', 'rare-stamps'],
      views: 3200,
      likes: 186,
      shares: 78,
      comments: 34,
      readTime: 6,
      seoTitle: 'Rare Gandhi Stamp Breaks Auction Records',
      metaDescription: 'Historic Gandhi stamp with printing error sells for record price...',
      priority: 'high',
      isBreaking: true,
      newsletter: true,
      socialShared: true
    },
    {
      id: '5',
      title: 'Young Philatelists Program Expands to Rural Schools',
      slug: 'young-philatelists-rural-expansion',
      excerpt: 'Educational initiative brings stamp collecting to students in remote villages across India.',
      content: 'Full article content here...',
      category: 'education',
      subcategory: 'outreach',
      author: 'Education Team',
      authorId: 'edu-1',
      status: 'scheduled',
      publishDate: null,
      lastModified: '2024-01-21',
      scheduledDate: '2024-01-30',
      featured: false,
      featuredImage: '/images/news/young-philatelists.jpg',
      tags: ['education', 'youth', 'rural', 'outreach'],
      views: 0,
      likes: 0,
      shares: 0,
      comments: 0,
      readTime: 4,
      seoTitle: 'Young Philatelists Program Reaches Rural Schools',
      metaDescription: 'Educational stamp collecting program expands to rural areas...',
      priority: 'medium',
      isBreaking: false,
      newsletter: true,
      socialShared: false
    }
  ];

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
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    const matchesStatus = !selectedStatus || article.status === selectedStatus;
    const matchesAuthor = !selectedAuthor || article.authorId === selectedAuthor;
    return matchesSearch && matchesCategory && matchesStatus && matchesAuthor;
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="w-4 h-4" />;
      case 'draft':
        return <Edit className="w-4 h-4" />;
      case 'scheduled':
        return <Clock className="w-4 h-4" />;
      case 'archived':
        return <Archive className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const handleSelectAll = () => {
    if (selectedArticles.length === filteredArticles.length) {
      setSelectedArticles([]);
    } else {
      setSelectedArticles(filteredArticles.map(article => article.id));
    }
  };

  const handleSelectArticle = (articleId) => {
    if (selectedArticles.includes(articleId)) {
      setSelectedArticles(selectedArticles.filter(id => id !== articleId));
    } else {
      setSelectedArticles([...selectedArticles, articleId]);
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on articles:`, selectedArticles);
    setSelectedArticles([]);
    setShowBulkActions(false);
  };

  const handleStatusChange = (articleId, newStatus) => {
    setNewsArticles(articles => 
      articles.map(article => 
        article.id === articleId 
          ? { ...article, status: newStatus, lastModified: new Date().toISOString().split('T')[0] }
          : article
      )
    );
  };

  const handleDeleteArticle = (articleId) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setNewsArticles(articles => articles.filter(article => article.id !== articleId));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  useEffect(() => {
    setShowBulkActions(selectedArticles.length > 0);
  }, [selectedArticles]);

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">News Management</h1>
            <p className="text-secondary-600 mt-1">Create and manage news articles and announcements</p>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/admin/news/analytics" className="btn-outline btn-sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </Link>
            <Link to="/admin/news/new" className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Write Article
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Published</p>
                  <p className="text-2xl font-bold text-green-600">
                    {newsArticles.filter(article => article.status === 'published').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Draft Articles</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {newsArticles.filter(article => article.status === 'draft').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Edit className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Scheduled</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {newsArticles.filter(article => article.status === 'scheduled').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Total Views</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {newsArticles.reduce((sum, article) => sum + article.views, 0).toLocaleString()}
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
        <div className="card mb-6">
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
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
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
              >
                {authors.map(author => (
                  <option key={author.value} value={author.value}>
                    {author.label}
                  </option>
                ))}
              </select>

              <select 
                className="input"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="publishDate">Publish Date</option>
                <option value="lastModified">Last Modified</option>
                <option value="title">Title</option>
                <option value="views">Views</option>
                <option value="likes">Likes</option>
              </select>
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
                    {selectedArticles.length} article(s) selected
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleBulkAction('publish')}
                    className="btn-outline btn-sm text-green-600 border-green-300 hover:bg-green-50"
                  >
                    Publish
                  </button>
                  <button 
                    onClick={() => handleBulkAction('draft')}
                    className="btn-outline btn-sm text-yellow-600 border-yellow-300 hover:bg-yellow-50"
                  >
                    Move to Draft
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

        {/* Articles List */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-secondary-900">
                Articles ({filteredArticles.length})
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="btn-outline btn-sm"
                >
                  {sortOrder === 'asc' ? '↑' : '↓'} Sort
                </button>
              </div>
            </div>
          </div>
          <div className="card-body p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : (
              <div className="space-y-4 p-6">
                {filteredArticles.map((article) => (
                  <div key={article.id} className="border border-secondary-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
                    <div className="flex items-start space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedArticles.includes(article.id)}
                        onChange={() => handleSelectArticle(article.id)}
                        className="mt-1 rounded border-secondary-300"
                      />
                      
                      {/* Article Image */}
                      <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Image className="w-8 h-8 text-primary-600" />
                      </div>

                      {/* Article Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              {article.isBreaking && (
                                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                                  Breaking
                                </span>
                              )}
                              {article.featured && (
                                <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full font-medium">
                                  Featured
                                </span>
                              )}
                              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(article.priority)}`}>
                                {article.priority} priority
                              </span>
                              <span className="text-xs text-secondary-500 capitalize">
                                {article.category}
                              </span>
                            </div>
                            
                            <h3 className="text-lg font-semibold text-secondary-900 mb-2 line-clamp-2">
                              {article.title}
                            </h3>
                            
                            <p className="text-sm text-secondary-600 mb-3 line-clamp-2">
                              {article.excerpt}
                            </p>

                            <div className="flex items-center space-x-4 text-sm text-secondary-500">
                              <div className="flex items-center space-x-1">
                                <User className="w-4 h-4" />
                                <span>{article.author}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {article.status === 'published' 
                                    ? formatDate(article.publishDate)
                                    : article.status === 'scheduled' 
                                      ? `Scheduled: ${formatDate(article.scheduledDate)}`
                                      : `Modified: ${formatDate(article.lastModified)}`
                                  }
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{article.readTime} min read</span>
                              </div>
                            </div>

                            {/* Performance Stats */}
                            {article.status === 'published' && (
                              <div className="flex items-center space-x-4 mt-3 text-sm text-secondary-600">
                                <div className="flex items-center space-x-1">
                                  <Eye className="w-4 h-4" />
                                  <span>{article.views.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MessageSquare className="w-4 h-4" />
                                  <span>{article.comments}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Share2 className="w-4 h-4" />
                                  <span>{article.shares}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <span>❤️ {article.likes}</span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Status and Actions */}
                          <div className="flex flex-col items-end space-y-2">
                            <select
                              value={article.status}
                              onChange={(e) => handleStatusChange(article.id, e.target.value)}
                              className={`text-xs px-2 py-1 rounded-full border-0 ${getStatusColor(article.status)}`}
                            >
                              <option value="published">Published</option>
                              <option value="draft">Draft</option>
                              <option value="scheduled">Scheduled</option>
                              <option value="archived">Archived</option>
                            </select>

                            <div className="flex items-center space-x-1">
                              <Link
                                to={`/admin/news/${article.id}/edit`}
                                className="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </Link>
                              <Link
                                to={`/news/${article.slug}`}
                                className="p-2 text-secondary-600 hover:text-secondary-700 hover:bg-secondary-50 rounded-lg transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => handleDeleteArticle(article.id)}
                                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                              >
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNewsManagement;