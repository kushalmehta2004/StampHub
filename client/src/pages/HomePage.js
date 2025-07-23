import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Star, 
  Shield, 
  Truck, 
  Users,
  Mail,
  Search,
  ShoppingCart,
  Award
} from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: <Mail className="w-8 h-8 text-primary-600" />,
      title: 'Comprehensive Catalog',
      description: 'Access stamps and postal items from all Indian postal circles in one place.'
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-600" />,
      title: 'Secure Payments',
      description: 'Safe and secure transactions with multiple payment options including deposit accounts.'
    },
    {
      icon: <Truck className="w-8 h-8 text-primary-600" />,
      title: 'Nationwide Delivery',
      description: 'Fast and reliable delivery across India through India Post services.'
    },
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: 'Community Platform',
      description: 'Connect with fellow philatelists and share your passion for stamp collecting.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Philatelic Items' },
    { number: '23', label: 'Postal Circles' },
    { number: '5,000+', label: 'Happy Collectors' },
    { number: '99.9%', label: 'Uptime' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-secondary-900 leading-tight">
                  India's Premier
                  <span className="text-gradient block">
                    Philatelic Platform
                  </span>
                </h1>
                <p className="text-lg text-secondary-600 leading-relaxed">
                  Discover, collect, and connect with authentic stamps and postal items 
                  from all Indian postal circles. Your gateway to the fascinating world 
                  of philately.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/catalog" className="btn-primary btn-lg">
                  Explore Catalog
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link to="/register" className="btn-outline btn-lg">
                  Join Community
                </Link>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 bg-primary-100 border-2 border-white rounded-full flex items-center justify-center"
                      >
                        <span className="text-xs font-medium text-primary-600">
                          {String.fromCharCode(64 + i)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-secondary-600">
                    Join 5,000+ collectors
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-secondary-600 ml-2">4.9/5 rating</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-custom-lg p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-secondary-900">
                      Featured Collection
                    </h3>
                    <span className="badge-primary">New Release</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-secondary-50 rounded-lg p-4 text-center">
                        <div className="w-16 h-20 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <Mail className="w-8 h-8 text-primary-600" />
                        </div>
                        <p className="text-xs text-secondary-600">Commemorative {i}</p>
                        <p className="text-sm font-medium text-secondary-900">₹{5 + i}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Link to="/catalog" className="btn-primary w-full">
                    View All Items
                  </Link>
                </div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-primary-200 to-accent-200 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-tr from-accent-200 to-primary-200 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
              Why Choose National Philately?
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              We're committed to making philatelic collecting accessible, secure, 
              and enjoyable for collectors across India.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-secondary-900">
                  {feature.title}
                </h3>
                <p className="text-secondary-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-secondary-900">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-secondary-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Getting started with National Philately is simple and straightforward.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                icon: <Users className="w-8 h-8" />,
                title: 'Create Account',
                description: 'Sign up and set up your National Philately Deposit Account for seamless transactions.'
              },
              {
                step: '2',
                icon: <Search className="w-8 h-8" />,
                title: 'Browse & Discover',
                description: 'Explore our comprehensive catalog of stamps and postal items from all postal circles.'
              },
              {
                step: '3',
                icon: <ShoppingCart className="w-8 h-8" />,
                title: 'Order & Collect',
                description: 'Place your order securely and receive authentic philatelic items at your doorstep.'
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-secondary-200 text-center space-y-4">
                  <div className="w-16 h-16 bg-primary-600 text-white rounded-2xl flex items-center justify-center mx-auto">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900">
                    {step.title}
                  </h3>
                  <p className="text-secondary-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-accent-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                
                {/* Arrow for desktop */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-secondary-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Ready to Start Your Philatelic Journey?
              </h2>
              <p className="text-lg text-primary-100">
                Join thousands of collectors who trust National Philately for 
                authentic stamps and exceptional service.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn bg-white text-primary-600 hover:bg-primary-50 btn-lg">
                <Award className="w-5 h-5 mr-2" />
                Start Collecting Today
              </Link>
              <Link to="/catalog" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 btn-lg">
                Browse Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;