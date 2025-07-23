import React, { useState } from 'react';
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Plus,
  Search,
  Filter,
  ThumbsUp,
  MessageCircle,
  User,
  Clock,
  Pin,
  Star,
  Eye,
  Award
} from 'lucide-react';

const CommunityForumPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // Sample forum data
  const categories = [
    { id: 'all', name: 'All Discussions', count: 156, icon: MessageSquare },
    { id: 'general', name: 'General Discussion', count: 45, icon: Users },
    { id: 'identification', name: 'Stamp Identification', count: 38, icon: Search },
    { id: 'collecting-tips', name: 'Collecting Tips', count: 28, icon: Star },
    { id: 'market-trends', name: 'Market & Trends', count: 22, icon: TrendingUp },
    { id: 'exhibitions', name: 'Exhibitions & Events', count: 15, icon: Award },
    { id: 'technical', name: 'Technical Questions', count: 8, icon: MessageSquare }
  ];

  const discussions = [
    {
      id: '1',
      title: 'How to identify genuine vs fake Gandhi stamps?',
      author: 'PhilatelyExpert',
      authorAvatar: '👨‍🏫',
      category: 'identification',
      isPinned: true,
      createdAt: '2024-01-15T10:30:00Z',
      lastActivity: '2024-01-15T15:45:00Z',
      replies: 23,
      views: 456,
      likes: 18,
      tags: ['authentication', 'gandhi', 'tips'],
      excerpt: 'I recently acquired some Gandhi commemorative stamps and want to verify their authenticity. What are the key features to look for?'
    },
    {
      id: '2',
      title: 'Best practices for storing rare stamps',
      author: 'CollectorPro',
      authorAvatar: '👩‍💼',
      category: 'collecting-tips',
      createdAt: '2024-01-14T14:20:00Z',
      lastActivity: '2024-01-15T12:30:00Z',
      replies: 15,
      views: 234,
      likes: 12,
      tags: ['storage', 'preservation', 'rare-stamps'],
      excerpt: 'Looking for advice on proper storage methods for valuable stamps. Temperature, humidity, and container recommendations?'
    },
    {
      id: '3',
      title: 'Upcoming Delhi Philatelic Exhibition 2024',
      author: 'EventsAdmin',
      authorAvatar: '🎪',
      category: 'exhibitions',
      createdAt: '2024-01-13T09:15:00Z',
      lastActivity: '2024-01-14T18:20:00Z',
      replies: 8,
      views: 189,
      likes: 25,
      tags: ['delhi', 'exhibition', '2024', 'event'],
      excerpt: 'Official announcement for the Delhi Philatelic Exhibition. Registration details, dates, and special attractions.'
    },
    {
      id: '4',
      title: 'Market trends for Indian commemorative stamps',
      author: 'MarketAnalyst',  
      authorAvatar: '📈',
      category: 'market-trends',
      createdAt: '2024-01-12T16:45:00Z',
      lastActivity: '2024-01-13T11:10:00Z',
      replies: 12,
      views: 345,
      likes: 9,
      tags: ['market', 'commemorative', 'trends', 'analysis'],
      excerpt: 'Analysis of price trends for Indian commemorative stamps over the past year. Which themes are gaining value?'
    }
  ];

  const topContributors = [
    { name: 'PhilatelyExpert', avatar: '👨‍🏫', posts: 234, reputation: 1250 },
    { name: 'CollectorPro', avatar: '👩‍💼', posts: 189, reputation: 980 },
    { name: 'StampMaster', avatar: '👨‍🎓', posts: 156, reputation: 875 },
    { name: 'VintageCollector', avatar: '👵', posts: 134, reputation: 720 }
  ];

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesCategory = activeCategory === 'all' || discussion.category === activeCategory;
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.lastActivity) - new Date(a.lastActivity);
      case 'popular':
        return b.likes - a.likes;
      case 'replies':
        return b.replies - a.replies;
      case 'views':
        return b.views - a.views;
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">
              Community Forum
            </h1>
            <p className="text-secondary-600">
              Connect with fellow philatelists, share knowledge, and get expert advice
            </p>
          </div>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Start Discussion
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-4">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-secondary-900">Categories</h2>
              </div>
              <div className="card-body p-0">
                <nav className="space-y-1">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-secondary-50 ${
                          activeCategory === category.id 
                            ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600' 
                            : 'text-secondary-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <span className="text-xs bg-secondary-200 text-secondary-600 px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Top Contributors */}
            <div className="card mt-6">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-secondary-900">Top Contributors</h2>
              </div>
              <div className="card-body">
                <div className="space-y-3">
                  {topContributors.map((contributor, index) => (
                    <div key={contributor.name} className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full text-sm">
                        {contributor.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-secondary-900 truncate">
                          {contributor.name}
                        </p>
                        <p className="text-xs text-secondary-600">
                          {contributor.posts} posts • {contributor.reputation} pts
                        </p>
                      </div>
                      {index < 3 && (
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-yellow-100 text-yellow-600' :
                          index === 1 ? 'bg-gray-100 text-gray-600' :
                          'bg-orange-100 text-orange-600'
                        }`}>
                          {index + 1}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="card mb-6">
              <div className="card-body">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search discussions, tags, or content..."
                      className="input pl-10 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      className="input"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="recent">Most Recent</option>
                      <option value="popular">Most Liked</option>
                      <option value="replies">Most Replies</option>
                      <option value="views">Most Viewed</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Discussions List */}
            <div className="space-y-4">
              {sortedDiscussions.map((discussion) => (
                <div key={discussion.id} className="card hover:shadow-md transition-shadow">
                  <div className="card-body">
                    <div className="flex items-start space-x-4">
                      {/* Author Avatar */}
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">{discussion.authorAvatar}</span>
                      </div>

                      {/* Discussion Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {discussion.isPinned && (
                              <Pin className="w-4 h-4 text-primary-600" />
                            )}
                            <h3 className="text-lg font-semibold text-secondary-900 hover:text-primary-600 cursor-pointer">
                              {discussion.title}
                            </h3>
                          </div>
                          <span className="text-xs text-secondary-500 whitespace-nowrap ml-4">
                            {formatTimeAgo(discussion.lastActivity)}
                          </span>
                        </div>

                        <p className="text-secondary-600 text-sm mb-3 line-clamp-2">
                          {discussion.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex items-center space-x-2 mb-3">
                          {discussion.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="badge-secondary text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Meta Information */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-secondary-600">
                            <span className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{discussion.author}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{discussion.replies} replies</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{discussion.views} views</span>
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="flex items-center space-x-1 text-secondary-600 hover:text-primary-600">
                              <ThumbsUp className="w-4 h-4" />
                              <span className="text-sm">{discussion.likes}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {sortedDiscussions.length === 0 && (
              <div className="card">
                <div className="card-body text-center py-12">
                  <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-12 h-12 text-secondary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                    No discussions found
                  </h3>
                  <p className="text-secondary-600 mb-4">
                    {searchTerm 
                      ? 'Try adjusting your search terms or browse different categories.'
                      : 'Be the first to start a discussion in this category!'
                    }
                  </p>
                  <button className="btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Start New Discussion
                  </button>
                </div>
              </div>
            )}

            {/* Pagination */}
            {sortedDiscussions.length > 0 && (
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
        </div>
      </div>
    </div>
  );
};

export default CommunityForumPage;