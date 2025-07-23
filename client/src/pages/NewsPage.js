import React, { useState, useEffect } from 'react';
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
  ArrowRight,
  FileText
} from 'lucide-react';

const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [news, setNews] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);

  useEffect(() => {
    // Load news from localStorage (managed by admin)
    const storedNews = localStorage.getItem('admin_news');
    if (storedNews) {
      const newsData = JSON.parse(storedNews);
      setNews(newsData);
      setFeaturedArticle(newsData[0] || null);
    }
  }, []);

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All News', count: news.length },
    { id: 'releases', name: 'New Releases', count: news.filter(a => a.category === 'releases').length },
    { id: 'exhibitions', name: 'Exhibitions', count: news.filter(a => a.category === 'exhibitions').length },
    { id: 'market-analysis', name: 'Market Analysis', count: news.filter(a => a.category === 'market-analysis').length },
    { id: 'community', name: 'Community', count: news.filter(a => a.category === 'community').length }
  ];

  // Filter articles based on category and search
  const filteredNews = news.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Trending topics (can be made dynamic)
  const trendingTopics = [
    { name: 'India Post 2024', count: 23 },
    { name: 'Gandhi Commemoratives', count: 18 },
    { name: 'Philatelic Exhibitions', count: 15 },
    { name: 'Stamp Preservation', count: 12 },
    { name: 'Market Analysis', count: 10 }
  ];

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">
              News & Updates
            </h1>
            <p className="text-secondary-600">
              Stay updated with the latest in philatelic world
            </p>
          </div>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <div className="card mb-8 overflow-hidden">
            <div className="relative">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="badge bg-white text-primary-600 font-medium">
                    Featured Article
                  </span>
                  <span className="text-primary-100 text-sm">
                    {formatTimeAgo(featuredArticle.publishedAt)}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {featuredArticle.title}
                </h2>
                <p className="text-primary-100 text-lg mb-6 max-w-3xl">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{featuredArticle.authorAvatar}</span>
                      <div>
                        <p className="text-white font-medium">{featuredArticle.author}</p>
                        <p className="text-primary-200 text-sm">{featuredArticle.readTime} min read</p>
                      </div>
                    </div>
                    <span className="text-primary-200 flex items-center space-x-1">
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
        )}

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
                      placeholder="Search news articles..."
                      className="input pl-10 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-48">
                    <select
                      className="input w-full"
                      value={activeCategory}
                      onChange={(e) => setActiveCategory(e.target.value)}
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name} ({category.count})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* News Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredNews.length > 0 ? filteredNews.map((article) => (
                <div key={article.id} className="card card-hover">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="badge-secondary text-sm capitalize">
                        {article.category.replace('-', ' ')}
                      </span>
                      <span className="text-xs text-secondary-500">
                        {formatTimeAgo(article.publishedAt)}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-secondary-900 mb-3 hover:text-primary-600 cursor-pointer line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-secondary-600 text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{article.authorAvatar}</span>
                          <div>
                            <p className="text-sm font-medium text-secondary-900">{article.author}</p>
                            <p className="text-xs text-secondary-500">{article.readTime} min read</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-secondary-500">
                        <span className="flex items-center space-x-1 text-xs">
                          <Eye className="w-3 h-3" />
                          <span>{article.views}</span>
                        </span>
                        <span className="flex items-center space-x-1 text-xs">
                          <Heart className="w-3 h-3" />
                          <span>{article.likes}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-2">
                  <div className="card">
                    <div className="card-body text-center py-12">
                      <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-12 h-12 text-secondary-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                        No news articles yet
                      </h3>
                      <p className="text-secondary-600">
                        News articles will be published by the admin and appear here.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Trending Topics */}
            <div className="card mb-6">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-secondary-900">Trending Topics</h2>
              </div>
              <div className="card-body">
                <div className="space-y-3">
                  {trendingTopics.map((topic) => (
                    <div key={topic.name} className="flex items-center justify-between hover:bg-secondary-50 p-2 rounded cursor-pointer">
                      <span className="text-sm text-secondary-700">{topic.name}</span>
                      <span className="text-xs bg-secondary-200 text-secondary-600 px-2 py-1 rounded-full">
                        {topic.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="card">
              <div className="card-body">
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">
                  Stay Updated
                </h3>
                <p className="text-sm text-secondary-600 mb-4">
                  Get the latest philatelic news and updates delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input w-full text-sm"
                  />
                  <button className="btn-primary w-full text-sm">
                    Subscribe
                  </button>
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