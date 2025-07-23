import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  Eye,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Minus,
  Globe,
  Smartphone,
  Monitor,
  MapPin,
  Clock,
  Star,
  MessageSquare,
  Share2,
  Heart,
  Target,
  Award,
  Zap,
  Activity
} from 'lucide-react';

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState({});
  const [dateRange, setDateRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Analytics data - will be fetched from API
  const sampleAnalytics = {
    overview: {
      totalRevenue: 0,
      revenueGrowth: 0,
      totalOrders: 0,
      ordersGrowth: 0,
      totalUsers: 0,
      usersGrowth: 0,
      conversionRate: 0,
      conversionGrowth: 0,
      avgOrderValue: 0,
      aovGrowth: 0,
      totalSessions: 0,
      sessionsGrowth: 0,
      bounceRate: 0,
      bounceGrowth: 0,
      pageViews: 0,
      pageViewsGrowth: 0
    },
    sales: {
      dailySales: [],
      topProducts: [],
      salesByCategory: [],
      paymentMethods: []
    },
    users: {
      userGrowth: [],
      userTypes: [],
      topLocations: [],
      deviceTypes: []
    },
    engagement: {
      pageViews: [],
      socialShares: [],
      contentPerformance: [],
      userEngagement: {
        avgSessionDuration: '0m 0s',
        pagesPerSession: 0,
        returnVisitorRate: 0,
        emailOpenRate: 0,
        emailClickRate: 0
      }
    }
  };

  const dateRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'sales', label: 'Sales', icon: DollarSign },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'engagement', label: 'Engagement', icon: Activity }
  ];

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setAnalytics(sampleAnalytics);
      setIsLoading(false);
    }, 1000);
  }, [dateRange]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const formatPercentage = (num) => {
    return `${num > 0 ? '+' : ''}${num}%`;
  };

  const getGrowthIcon = (growth) => {
    if (growth > 0) return <ArrowUp className="w-4 h-4 text-green-600" />;
    if (growth < 0) return <ArrowDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  const getGrowthColor = (growth) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-600 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-secondary-900">
                  {formatCurrency(analytics.overview?.totalRevenue || 0)}
                </p>
                <div className={`flex items-center mt-2 text-sm ${getGrowthColor(analytics.overview?.revenueGrowth || 0)}`}>
                  {getGrowthIcon(analytics.overview?.revenueGrowth || 0)}
                  <span className="ml-1">{formatPercentage(analytics.overview?.revenueGrowth || 0)}</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-600 mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-secondary-900">
                  {formatNumber(analytics.overview?.totalOrders || 0)}
                </p>
                <div className={`flex items-center mt-2 text-sm ${getGrowthColor(analytics.overview?.ordersGrowth || 0)}`}>
                  {getGrowthIcon(analytics.overview?.ordersGrowth || 0)}
                  <span className="ml-1">{formatPercentage(analytics.overview?.ordersGrowth || 0)}</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-600 mb-1">Total Users</p>
                <p className="text-2xl font-bold text-secondary-900">
                  {formatNumber(analytics.overview?.totalUsers || 0)}
                </p>
                <div className={`flex items-center mt-2 text-sm ${getGrowthColor(analytics.overview?.usersGrowth || 0)}`}>
                  {getGrowthIcon(analytics.overview?.usersGrowth || 0)}
                  <span className="ml-1">{formatPercentage(analytics.overview?.usersGrowth || 0)}</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-600 mb-1">Conversion Rate</p>
                <p className="text-2xl font-bold text-secondary-900">
                  {analytics.overview?.conversionRate || 0}%
                </p>
                <div className={`flex items-center mt-2 text-sm ${getGrowthColor(analytics.overview?.conversionGrowth || 0)}`}>
                  {getGrowthIcon(analytics.overview?.conversionGrowth || 0)}
                  <span className="ml-1">{formatPercentage(analytics.overview?.conversionGrowth || 0)}</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-600 mb-1">Avg Order Value</p>
                <p className="text-xl font-bold text-secondary-900">
                  {formatCurrency(analytics.overview?.avgOrderValue || 0)}
                </p>
                <div className={`flex items-center mt-2 text-sm ${getGrowthColor(analytics.overview?.aovGrowth || 0)}`}>
                  {getGrowthIcon(analytics.overview?.aovGrowth || 0)}
                  <span className="ml-1">{formatPercentage(analytics.overview?.aovGrowth || 0)}</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-600 mb-1">Total Sessions</p>
                <p className="text-xl font-bold text-secondary-900">
                  {formatNumber(analytics.overview?.totalSessions || 0)}
                </p>
                <div className={`flex items-center mt-2 text-sm ${getGrowthColor(analytics.overview?.sessionsGrowth || 0)}`}>
                  {getGrowthIcon(analytics.overview?.sessionsGrowth || 0)}
                  <span className="ml-1">{formatPercentage(analytics.overview?.sessionsGrowth || 0)}</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-teal-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-600 mb-1">Bounce Rate</p>
                <p className="text-xl font-bold text-secondary-900">
                  {analytics.overview?.bounceRate || 0}%
                </p>
                <div className={`flex items-center mt-2 text-sm ${getGrowthColor(analytics.overview?.bounceGrowth || 0)}`}>
                  {getGrowthIcon(analytics.overview?.bounceGrowth || 0)}
                  <span className="ml-1">{formatPercentage(analytics.overview?.bounceGrowth || 0)}</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-600 mb-1">Page Views</p>
                <p className="text-xl font-bold text-secondary-900">
                  {formatNumber(analytics.overview?.pageViews || 0)}
                </p>
                <div className={`flex items-center mt-2 text-sm ${getGrowthColor(analytics.overview?.pageViewsGrowth || 0)}`}>
                  {getGrowthIcon(analytics.overview?.pageViewsGrowth || 0)}
                  <span className="ml-1">{formatPercentage(analytics.overview?.pageViewsGrowth || 0)}</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-cyan-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Revenue Trend</h3>
          </div>
          <div className="card-body">
            <div className="h-64 bg-secondary-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-secondary-400 mx-auto mb-2" />
                <p className="text-secondary-600">Revenue chart visualization</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">User Growth</h3>
          </div>
          <div className="card-body">
            <div className="h-64 bg-secondary-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-secondary-400 mx-auto mb-2" />
                <p className="text-secondary-600">User growth chart visualization</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSales = () => (
    <div className="space-y-6">
      {/* Top Products */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Top Selling Products</h3>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            {analytics.sales?.topProducts?.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Package className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-secondary-600">{product.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(product.revenue)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sales by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Sales by Category</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {analytics.sales?.salesByCategory?.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{category.category}</span>
                    <span className="text-sm text-secondary-600">{category.percentage}%</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full" 
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">{formatCurrency(category.revenue)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Payment Methods</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {analytics.sales?.paymentMethods?.map((method, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{method.method}</span>
                    <span className="text-sm text-secondary-600">{method.percentage}%</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${method.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">{formatCurrency(method.amount)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      {/* User Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">User Types</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {analytics.users?.userTypes?.map((type, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                    <span className="font-medium">{type.type}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatNumber(type.count)}</p>
                    <p className="text-sm text-secondary-600">{type.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Device Types</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {analytics.users?.deviceTypes?.map((device, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      {device.device === 'Mobile' && <Smartphone className="w-4 h-4" />}
                      {device.device === 'Desktop' && <Monitor className="w-4 h-4" />}
                      {device.device === 'Tablet' && <Monitor className="w-4 h-4" />}
                      <span className="text-sm font-medium">{device.device}</span>
                    </div>
                    <span className="text-sm text-secondary-600">{device.percentage}%</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${device.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">{formatNumber(device.users)} users</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Locations */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Top Locations</h3>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            {analytics.users?.topLocations?.map((location, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{location.city}</h4>
                    <p className="text-sm text-secondary-600">{location.state}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatNumber(location.users)}</p>
                  <p className="text-sm text-secondary-600">users</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEngagement = () => (
    <div className="space-y-6">
      {/* Top Pages */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Top Pages</h3>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            {analytics.engagement?.pageViews?.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Eye className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{page.page}</h4>
                    <p className="text-sm text-secondary-600">Unique: {formatNumber(page.uniqueViews)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatNumber(page.views)}</p>
                  <p className="text-sm text-secondary-600">views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="card">
          <div className="card-body text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-lg font-bold">{analytics.engagement?.userEngagement?.avgSessionDuration}</p>
            <p className="text-sm text-secondary-600">Avg Session</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <Eye className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-lg font-bold">{analytics.engagement?.userEngagement?.pagesPerSession}</p>
            <p className="text-sm text-secondary-600">Pages/Session</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <RefreshCw className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-lg font-bold">{analytics.engagement?.userEngagement?.returnVisitorRate}%</p>
            <p className="text-sm text-secondary-600">Return Rate</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <Mail className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-lg font-bold">{analytics.engagement?.userEngagement?.emailOpenRate}%</p>
            <p className="text-sm text-secondary-600">Email Open</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <Target className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-lg font-bold">{analytics.engagement?.userEngagement?.emailClickRate}%</p>
            <p className="text-sm text-secondary-600">Email Click</p>
          </div>
        </div>
      </div>

      {/* Social Shares */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Social Media Shares</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {analytics.engagement?.socialShares?.map((social, index) => (
              <div key={index} className="text-center p-4 bg-secondary-50 rounded-lg">
                <Share2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-lg font-bold">{formatNumber(social.shares)}</p>
                <p className="text-sm text-secondary-600">{social.platform}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Analytics & Reports</h1>
            <p className="text-secondary-600 mt-1">Comprehensive insights into your platform performance</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              className="input"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              {dateRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
            <button className="btn-outline btn-sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="btn-outline btn-sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-secondary-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'sales' && renderSales()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'engagement' && renderEngagement()}
      </div>
    </div>
  );
};

export default AdminAnalytics;