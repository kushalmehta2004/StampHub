import { apiHelpers, endpoints } from './api';

export const authService = {
  // Login user
  login: (credentials) => {
    return apiHelpers.post(endpoints.auth.login, credentials);
  },

  // Register user
  register: (userData) => {
    return apiHelpers.post(endpoints.auth.register, userData);
  },

  // Get user profile
  getProfile: () => {
    return apiHelpers.get(endpoints.auth.profile);
  },

  // Update user profile
  updateProfile: (userData) => {
    return apiHelpers.put(endpoints.auth.profile, userData);
  },

  // Change password
  changePassword: (passwordData) => {
    return apiHelpers.put(endpoints.auth.changePassword, passwordData);
  },

  // Verify token
  verifyToken: () => {
    return apiHelpers.get(endpoints.auth.verify);
  },
};