import React, { useState } from 'react';
import { 
  Calendar, 
  User, 
  Clock, 
  Eye,
  Tag,
  Search,
  Filter,
  TrendingUp,
  BookOpen,
  Share2,
  Bookmark,
  ArrowRight
} from 'lucide-react';

const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample news data
  const categories = [
    { id: 'all', name: 'All News', count: 45 },
    { id: 'releases', name: 'New Releases', count: 12 },
    { id: 'exhibitions', name: 'Exhibitions', count: 8 },
    { id: 'market', name: 'Market News', count: 15 },
    { id: 'education', name: 'Educational', count: 10 }
  ];

  const featuredArticle = {
    id: '1',
    title: 'India Post Announces Special Commemorative Series for 2024',
    excerpt: 'India Post has unveiled an ambitious plan for 2024, featuring over 50 special commemorative stamps celebrating significant milestones in Indian history, culture, and achievements.',
    content: 'The year 2024 marks several important anniversaries and celebrations that will be honored through special philatelic releases...',
    author: 'Rajesh Kumar',
    authorAvatar: '👨‍💼',
    category: 'releases',
    publishedAt: '2024-01-15T10:00:00Z',
    readTime: 5,
    views: 1234,
    likes: 89,
    image: '🎯',
    tags: ['commemorative', 'india-post', '2024', 'releases']
  };

  const articles = [
    {
      id: '2',
      title: 'Delhi Philatelic Exhibition 2024: A Grand Success',
      excerpt: 'The recent Delhi Philatelic Exhibition showcased rare collections and drew enthusiasts from across the country.',
      author: 'Priya Sharma',
      authorAvatar: '👩‍🎨',
      category: 'exhibitions',
      publishedAt: '2024-01-14T15:30:00Z',
      readTime: 3,
      views: 567,
      likes: 45,
      image: '🏛️',
      tags: ['exhibition', 'delhi', 'collectors']
    },
    {
      id: '3',
      title: 'Market Trends: Gandhi Stamps See 20% Value Increase',
      excerpt: 'Analysis shows commemorative Gandhi stamps have appreciated significantly in the past quarter.',
      author: 'Market Analyst',
      authorAvatar: '📊',
      category: 'market',
      publishedAt: '2024-01-13T12:00:00Z',
      readTime: 4,
      views: 890,
      likes: 67,
      image: '📈',
      tags: ['market', 'gandhi', 'trends', 'valuation']
    },
    {
      id: '4',
      title: 'Beginner\'s Guide to Stamp Preservation',
      excerpt: 'Essential tips and techniques for preserving your stamp collection for future generations.',
      author: 'Dr. Anil Gupta',
      authorAvatar: '👨‍🔬',
      category: 'education',
      publishedAt: '2024-01-12T09:45:00Z',
      readTime: 6,
      views: 1123,
      likes: 98,
      image: '🔬',
      tags: ['preservation', 'tips', 'beginner', 'guide']
    },
    {
      id: '5',
      title: 'Rare Mysore State Stamp Discovered in Private Collection',
      excerpt: 'A previously unknown variant of a Mysore state stamp has been authenticated and valued.',
      author: 'Heritage Team',
      authorAvatar: '🏺',
      category: 'releases',
      publishedAt: '2024-01-11T14:20:00Z',
      readTime: 4,
      views: 789,
      likes: 56,
      image: '💎',
      tags: ['rare', 'mysore', 'discovery', 'authentication']
    }
  ];

  const trendingTopics = [
    { name: 'India Post 2024', count: 23 },
    { name: 'Gandhi Commemoratives', count: 18 },
    { name: 'Philatelic Exhibitions', count: 15 },
    { name: 'Stamp Preservation', count: 12 },
    { name: 'Market Analysis', count: 10 }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Philatelic News & Articles
          </h1>
          <p className="text-secondary-600">
            Stay updated with the latest news, releases, and insights from the world of philately
          </p>
        </div>

        {/* Featured Article */}
        <div className="card mb-8 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center p-8">
              <span className="text-6xl">{featuredArticle.image}</span>
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex items-center space-x-2 mb-3">
                <span className="badge-primary">Featured</span>
                <span className="badge-secondary">{featuredArticle.category}</span>
              </div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-3 hover:text-primary-600 cursor-pointer">
                {featuredArticle.title}
              </h2>
              <p className="text-secondary-600 mb-4 line-clamp-3">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-secondary-600">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{featuredArticle.authorAvatar}</span>
                    <span>{featuredArticle.author}</span>
                  </div>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{featuredArticle.readTime} min read</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{featuredArticle.views}</span>
                  </span>
                </div>
                <button className="btn-primary">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filter */}
            <div className="card mb-6">
              <div className="card-body">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search articles, topics, or authors..."
                      className="input pl-10 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeCategory === category.id
                            ? 'bg-primary-600 text-white'
                            : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredArticles.map((article) => (
                <div key={article.id} className="card card-hover">
                  <div className="aspect-video bg-gradient-to-br from-primary-100 to-accent-100 rounded-t-xl flex items-center justify-center">
                    <span className="text-4xl">{article.image}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="badge-secondary text-xs">{article.category}</span>
                      <span className="text-xs text-secondary-500">
                        {formatTimeAgo(article.publishedAt)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2 hover:text-primary-600 cursor-pointer line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-secondary-600 text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-secondary-600">
                        <div className="flex items-center space-x-1">
                          <span>{article.authorAvatar}</span>
                          <span>{article.author}</span>
                        </div>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.readTime}m</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{article.views}</span>
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button className="p-1 text-secondary-600 hover:text-primary-600">
                          <Bookmark className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-secondary-600 hover:text-primary-600">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="card">
                <div className="card-body text-center py-12">
                  <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-12 h-12 text-secondary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                    No articles found
                  </h3>
                  <p className="text-secondary-600">
                    Try adjusting your search terms or browse different categories.
                  </p>
                </div>
              </div>
            )}

            {/* Pagination */}
            {filteredArticles.length > 0 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <button className="btn-outline">Previous</button>
                  <button className="btn-primary">1</button>
                  <button className="btn-outline">2</button>
                  <button className="btn-outline">3</button>
                  <button className="btn-outline">Next</button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <div className="card">
              <div className="card-header">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary-600" />
                  <h2 className="text-lg font-semibold text-secondary-900">Trending Topics</h2>
                </div>
              </div>
              <div className="card-body">
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={topic.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-primary-600">#{index + 1}</span>
                        <span className="text-sm text-secondary-900 cursor-pointer hover:text-primary-600">
                          {topic.name}
                        </span>
                      </div>
                      <span className="text-xs text-secondary-600">{topic.count} articles</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-secondary-900">Stay Updated</h2>
              </div>
              <div className="card-body">
                <p className="text-sm text-secondary-600 mb-4">
                  Get the latest philatelic news and updates delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input w-full"
                  />
                  <button className="btn-primary w-full">
                    Subscribe to Newsletter
                  </button>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-secondary-900">Categories</h2>
              </div>
              <div className="card-body">
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-colors ${
                        activeCategory === category.id
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-secondary-700 hover:bg-secondary-50'
                      }`}
                    >
                      <span className="text-sm">{category.name}</span>
                      <span className="text-xs bg-secondary-200 text-secondary-600 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-secondary-900">Recent Activity</h2>
              </div>
              <div className="card-body">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-secondary-600">5 new articles published</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-secondary-600">2 exhibitions announced</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-secondary-600">Market report updated</span>
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

export default NewsPage;