import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, Mail } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* 404 Illustration */}
        <div className="relative">
          <div className="text-9xl font-bold text-primary-200 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-primary-600 rounded-2xl flex items-center justify-center">
              <Mail className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-secondary-900">
            Page Not Found
          </h1>
          <p className="text-lg text-secondary-600 leading-relaxed">
            Sorry, we couldn't find the page you're looking for. 
            The page might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn-primary btn-lg"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-outline btn-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="pt-8 border-t border-secondary-200">
          <p className="text-sm text-secondary-600 mb-4">
            Looking for something specific? Try these popular pages:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/catalog"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Browse Catalog
            </Link>
            <Link
              to="/about"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Contact Support
            </Link>
            <Link
              to="/help"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Help Center
            </Link>
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
          <div className="flex items-center space-x-3 mb-4">
            <Search className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-secondary-900">
              Can't find what you're looking for?
            </h3>
          </div>
          <p className="text-secondary-600 text-sm mb-4">
            Try searching our catalog or contact our support team for assistance.
          </p>
          <div className="flex gap-2">
            <Link
              to="/catalog"
              className="btn-primary flex-1"
            >
              Search Catalog
            </Link>
            <Link
              to="/contact"
              className="btn-secondary flex-1"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;