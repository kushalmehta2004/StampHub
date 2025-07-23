import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
        loading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token'),
  loading: true,
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          // For demo, use stored user data
          const user = JSON.parse(userData);
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              user,
              token,
            },
          });
        } catch (error) {
          // If demo fails, try API verification
          try {
            const response = await authService.verifyToken();
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: {
                user: response.data.user,
                token,
              },
            });
          } catch (apiError) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            dispatch({ type: 'LOGOUT' });
          }
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      
      // For demo purposes, handle direct user/token objects
      if (credentials.user && credentials.token) {
        const { user, token } = credentials;
        
        // Store token in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        dispatch({ 
          type: 'LOGIN_SUCCESS', 
          payload: { user, token } 
        });
        
        return { user, token };
      }
      
      // Regular API login
      const response = await authService.login(credentials);
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token },
      });

      toast.success(`Welcome back, ${user.firstName || user.name}!`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: errorMessage,
      });
      toast.error(errorMessage);
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      console.log('Registration data being sent:', userData);
      const response = await authService.register(userData);
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token },
      });

      toast.success(`Welcome to Philately Platform, ${user.firstName}!`);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response?.data);
      const errorMessage = error.response?.data?.message || 'Registration failed';
      
      // Show validation errors if available
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach(err => {
          toast.error(`${err.path}: ${err.msg}`);
        });
      } else {
        toast.error(errorMessage);
      }
      
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: errorMessage,
      });
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  // Update user function (for wallet balance, etc.)
  const updateUser = (userData) => {
    dispatch({
      type: 'UPDATE_USER',
      payload: userData,
    });
    // Update localStorage
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const response = await authService.updateProfile(userData);
      dispatch({
        type: 'UPDATE_USER',
        payload: response.data.user,
      });
      toast.success('Profile updated successfully');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Profile update failed';
      toast.error(errorMessage);
      throw error;
    }
  };

  // Change password
  const changePassword = async (passwordData) => {
    try {
      await authService.changePassword(passwordData);
      toast.success('Password changed successfully');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Password change failed';
      toast.error(errorMessage);
      throw error;
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateUser,
    updateProfile,
    changePassword,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;