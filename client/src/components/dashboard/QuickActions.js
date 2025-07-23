import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  MessageSquare,
  Calendar,
  BookOpen,
  Video,
  Award,
  TrendingUp,
  Users
} from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: 'Browse Catalog',
      description: 'Discover new stamps and postal items',
      icon: ShoppingCart,
      href: '/catalog',
      color: 'bg-blue-100 text-blue-600',
      bgColor: 'hover:bg-blue-50'
    },
    {
      title: 'My Collection',
      description: 'Manage your personal collection',
      icon: Star,
      href: '/collection',
      color: 'bg-purple-100 text-purple-600',
      bgColor: 'hover:bg-purple-50'
    },
    {
      title: 'Community Forum',
      description: 'Connect with fellow collectors',
      icon: MessageSquare,
      href: '/community',
      color: 'bg-green-100 text-green-600',
      bgColor: 'hover:bg-green-50'
    },
    {
      title: 'Upcoming Events',
      description: 'Join exhibitions and meetups',
      icon: Calendar,
      href: '/events',
      color: 'bg-orange-100 text-orange-600',
      bgColor: 'hover:bg-orange-50'
    },
    {
      title: 'Expert Consultation',
      description: 'Get professional advice',
      icon: Video,
      href: '/experts',
      color: 'bg-red-100 text-red-600',
      bgColor: 'hover:bg-red-50'
    },
    {
      title: 'Learning Hub',
      description: 'Enhance your philatelic knowledge',
      icon: BookOpen,
      href: '/learn',
      color: 'bg-indigo-100 text-indigo-600',
      bgColor: 'hover:bg-indigo-50'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'purchase',
      message: 'Purchased Gandhi 150th Anniversary Stamp',
      time: '2 hours ago',
      icon: ShoppingCart,
      color: 'text-green-600'
    },
    {
      id: '2',
      type: 'wishlist',
      message: 'Added Kerala Backwaters to wishlist',
      time: '1 day ago',
      icon: Heart,
      color: 'text-red-600'
    },
    {
      id: '3',
      type: 'forum',
      message: 'Replied to "Authentication Tips" discussion',
      time: '2 days ago',
      icon: MessageSquare,
      color: 'text-blue-600'
    },
    {
      id: '4',
      type: 'collection',
      message: 'Updated "Wildlife Series" collection',
      time: '3 days ago',
      icon: Star,
      color: 'text-purple-600'
    }
  ];

  const achievements = [
    {
      id: '1',
      title: 'First Purchase',
      description: 'Made your first stamp purchase',
      icon: '🏅',
      unlocked: true
    },
    {
      id: '2',
      title: 'Community Member',
      description: 'Posted your first forum message',
      icon: '🤝',
      unlocked: true
    },
    {
      id: '3',
      title: 'Collector',
      description: 'Created your first collection',
      icon: '📚',
      unlocked: false,
      progress: 75
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-semibold text-secondary-900">Quick Actions</h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.title}
                  to={action.href}
                  className={`p-4 rounded-xl border-2 border-transparent transition-all duration-200 ${action.bgColor} hover:border-primary-200 group`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${action.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-secondary-900 mb-1 group-hover:text-primary-600">
                    {action.title}
                  </h3>
                  <p className="text-sm text-secondary-600">
                    {action.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-semibold text-secondary-900">Recent Activities</h2>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-secondary-900">
                        {activity.message}
                      </p>
                      <p className="text-xs text-secondary-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-secondary-200">
              <Link
                to="/activity"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                View all activities →
              </Link>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-semibold text-secondary-900">Achievements</h2>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                    achievement.unlocked ? 'bg-green-100' : 'bg-secondary-100'
                  }`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      achievement.unlocked ? 'text-secondary-900' : 'text-secondary-600'
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-xs ${
                      achievement.unlocked ? 'text-secondary-600' : 'text-secondary-500'
                    }`}>
                      {achievement.description}
                    </p>
                    {!achievement.unlocked && achievement.progress && (
                      <div className="mt-1">
                        <div className="w-full bg-secondary-200 rounded-full h-1.5">
                          <div 
                            className="bg-primary-600 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                  {achievement.unlocked && (
                    <div className="text-green-600">
                      <Award className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-secondary-200">
              <Link
                to="/achievements"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                View all achievements →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trending & Recommendations */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Trending Items */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-secondary-900">Trending Items</h2>
            </div>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {[
                { name: 'Gandhi 150th Anniversary', price: '₹25', trend: '+15%' },
                { name: 'Kerala Backwaters', price: '₹45', trend: '+8%' },
                { name: 'Space Exploration Series', price: '₹120', trend: '+22%' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-10 bg-gradient-to-br from-primary-100 to-accent-100 rounded flex items-center justify-center">
                      <span className="text-xs">📮</span>
                    </div>
                    <div>
                      <p className="font-medium text-secondary-900 text-sm">{item.name}</p>
                      <p className="text-xs text-secondary-600">{item.price}</p>
                    </div>
                  </div>
                  <span className="text-xs text-green-600 font-medium">{item.trend}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-secondary-200">
              <Link
                to="/catalog?sort=trending"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                View trending catalog →
              </Link>
            </div>
          </div>
        </div>

        {/* Community Highlights */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-secondary-900">Community Highlights</h2>
            </div>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {[
                { title: 'New Delhi Exhibition 2024', replies: 23, author: 'Admin' },
                { title: 'Authentication Tips for Beginners', replies: 15, author: 'Expert' },
                { title: 'Rare Find: Mysore State Stamp', replies: 8, author: 'Collector' }
              ].map((discussion, index) => (
                <div key={index} className="p-3 bg-secondary-50 rounded-lg">
                  <h4 className="font-medium text-secondary-900 text-sm mb-1">
                    {discussion.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-secondary-600">
                    <span>by {discussion.author}</span>
                    <span>{discussion.replies} replies</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-secondary-200">
              <Link
                to="/community"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Join community discussions →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;