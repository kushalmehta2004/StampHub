import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    if (response) {
      switch (response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          if (response.data?.error === 'TOKEN_EXPIRED' || response.data?.error === 'INVALID_TOKEN') {
            localStorage.removeItem('token');
            window.location.href = '/login';
            toast.error('Session expired. Please login again.');
          }
          break;
        case 403:
          toast.error('Access denied. You do not have permission to perform this action.');
          break;
        case 404:
          // Don't show toast for 404s as they might be handled by components
          break;
        case 429:
          toast.error('Too many requests. Please try again later.');
          break;
        case 500:
          toast.error('Server error. Please try again later.');
          break;
        default:
          // For other errors, show the message from the server if available
          if (response.data?.message && response.status >= 400) {
            toast.error(response.data.message);
          }
      }
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout. Please check your connection.');
    } else if (error.message === 'Network Error') {
      toast.error('Network error. Please check your connection.');
    } else {
      toast.error('An unexpected error occurred.');
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  // Auth endpoints
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    profile: '/auth/profile',
    verify: '/auth/verify',
    changePassword: '/auth/change-password',
  },
  
  // Catalog endpoints
  catalog: {
    items: '/catalog',
    item: (id) => `/catalog/${id}`,
    featured: '/catalog/featured/items',
    categories: '/catalog/meta/categories',
    postalCircles: '/catalog/meta/postal-circles',
  },
  
  // Order endpoints
  orders: {
    create: '/orders',
    myOrders: '/orders/my-orders',
    order: (id) => `/orders/${id}`,
    cancel: (id) => `/orders/${id}/cancel`,
    updateStatus: (id) => `/orders/${id}/status`,
  },
  
  // User endpoints
  users: {
    deposit: '/users/deposit',
    transactions: '/users/transactions',
    wishlist: '/users/wishlist',
    wishlistItem: (id) => `/users/wishlist/${id}`,
    dashboard: '/users/dashboard',
  },
  
  // Payment endpoints
  payments: {
    createRazorpayOrder: '/payments/create-razorpay-order',
    verifyPayment: '/payments/verify-razorpay-payment',
    paymentFailed: '/payments/payment-failed',
    status: (orderId) => `/payments/status/${orderId}`,
  },
  
  // Admin endpoints
  admin: {
    users: '/users',
    user: (id) => `/users/${id}`,
    userStatus: (id) => `/users/${id}/status`,
    orders: '/orders',
    catalog: '/catalog',
  },
};

// Helper functions for common API patterns
export const apiHelpers = {
  // GET request with query parameters
  get: (url, params = {}) => {
    return api.get(url, { params });
  },
  
  // POST request
  post: (url, data = {}) => {
    return api.post(url, data);
  },
  
  // PUT request
  put: (url, data = {}) => {
    return api.put(url, data);
  },
  
  // DELETE request
  delete: (url) => {
    return api.delete(url);
  },
  
  // Upload file
  upload: (url, formData) => {
    return api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default api;