import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-hot-toast';

// Content reducer
const contentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
        error: null
      };
    case 'SET_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'LOAD_CATALOG_SUCCESS':
      return {
        ...state,
        loading: false,
        catalog: action.payload,
        error: null
      };
    case 'LOAD_NEWS_SUCCESS':
      return {
        ...state,
        loading: false,
        news: action.payload,
        error: null
      };
    case 'LOAD_EVENTS_SUCCESS':
      return {
        ...state,
        loading: false,
        events: action.payload,
        error: null
      };
    case 'UPDATE_CATALOG_ITEM':
      return {
        ...state,
        catalog: state.catalog.map(item => 
          item.id === action.payload.id ? { ...item, ...action.payload.updates } : item
        )
      };
    case 'DELETE_CATALOG_ITEM':
      return {
        ...state,
        catalog: state.catalog.filter(item => item.id !== action.payload)
      };
    case 'ADD_CATALOG_ITEM':
      return {
        ...state,
        catalog: [action.payload, ...state.catalog]
      };
    case 'UPDATE_NEWS_ARTICLE':
      return {
        ...state,
        news: state.news.map(article => 
          article.id === action.payload.id ? { ...article, ...action.payload.updates } : article
        )
      };
    case 'DELETE_NEWS_ARTICLE':
      return {
        ...state,
        news: state.news.filter(article => article.id !== action.payload)
      };
    case 'ADD_NEWS_ARTICLE':
      return {
        ...state,
        news: [action.payload, ...state.news]
      };
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map(event => 
          event.id === action.payload.id ? { ...event, ...action.payload.updates } : event
        )
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload)
      };
    case 'ADD_EVENT':
      return {
        ...state,
        events: [action.payload, ...state.events]
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  catalog: [],
  news: [],
  events: [],
  loading: false,
  error: null
};

// Create context
const ContentContext = createContext();

// Content provider component
export const ContentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contentReducer, initialState);

  // Simulate API calls - In real app, these would be actual API calls
  const contentService = {
    // Catalog Services
    getCatalogItems: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: '1',
              name: 'Gandhi 150th Anniversary',
              category: 'stamps',
              price: 25,
              stock: 150,
              status: 'active',
              availability: 'in-stock',
              lastUpdated: new Date().toISOString()
            },
            {
              id: '2',
              name: 'Kerala Backwaters',
              category: 'stamps',
              price: 15,
              stock: 25,
              status: 'active',
              availability: 'low-stock',
              lastUpdated: new Date().toISOString()
            }
          ]);
        }, 1000);
      });
    },

    updateCatalogItem: async (id, updates) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ id, updates: { ...updates, lastUpdated: new Date().toISOString() } });
        }, 500);
      });
    },

    deleteCatalogItem: async (id) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(id);
        }, 500);
      });
    },

    addCatalogItem: async (itemData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: Date.now().toString(),
            ...itemData,
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
          });
        }, 500);
      });
    },

    // News Services
    getNewsArticles: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: '1',
              title: 'New Commemorative Stamps Released',
              status: 'published',
              publishDate: '2024-01-20',
              author: 'Admin Team',
              views: 2450,
              lastModified: new Date().toISOString()
            },
            {
              id: '2',
              title: 'Mysore Palace Stamp Wins Award',
              status: 'published',
              publishDate: '2024-01-18',
              author: 'Priya Sharma',
              views: 1890,
              lastModified: new Date().toISOString()
            }
          ]);
        }, 1000);
      });
    },

    updateNewsArticle: async (id, updates) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ id, updates: { ...updates, lastModified: new Date().toISOString() } });
        }, 500);
      });
    },

    deleteNewsArticle: async (id) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(id);
        }, 500);
      });
    },

    addNewsArticle: async (articleData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: Date.now().toString(),
            ...articleData,
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString()
          });
        }, 500);
      });
    },

    // Events Services
    getEvents: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: '1',
              title: 'National Philatelic Exhibition 2024',
              status: 'upcoming',
              startDate: '2024-03-15',
              city: 'New Delhi',
              registeredCount: 2340,
              lastUpdated: new Date().toISOString()
            },
            {
              id: '2',
              title: 'Mumbai Stamp Collectors Meetup',
              status: 'upcoming',
              startDate: '2024-02-10',
              city: 'Mumbai',
              registeredCount: 67,
              lastUpdated: new Date().toISOString()
            }
          ]);
        }, 1000);
      });
    },

    updateEvent: async (id, updates) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ id, updates: { ...updates, lastUpdated: new Date().toISOString() } });
        }, 500);
      });
    },

    deleteEvent: async (id) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(id);
        }, 500);
      });
    },

    addEvent: async (eventData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: Date.now().toString(),
            ...eventData,
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
          });
        }, 500);
      });
    }
  };

  // Catalog functions
  const loadCatalog = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const catalog = await contentService.getCatalogItems();
      dispatch({ type: 'LOAD_CATALOG_SUCCESS', payload: catalog });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Failed to load catalog');
    }
  };

  const updateCatalogItem = async (id, updates) => {
    try {
      const result = await contentService.updateCatalogItem(id, updates);
      dispatch({ type: 'UPDATE_CATALOG_ITEM', payload: result });
      toast.success('Item updated successfully');
      
      // If stock is updated and becomes 0, reflect on user interface
      if (updates.stock === 0) {
        toast.info('Item is now out of stock - users will see updated status');
      } else if (updates.stock > 0 && updates.availability === 'out-of-stock') {
        // Auto-update availability when stock is added
        const availabilityUpdate = {
          ...updates,
          availability: updates.stock <= 50 ? 'low-stock' : 'in-stock'
        };
        dispatch({ type: 'UPDATE_CATALOG_ITEM', payload: { id, updates: availabilityUpdate } });
      }
    } catch (error) {
      toast.error('Failed to update item');
    }
  };

  const deleteCatalogItem = async (id) => {
    try {
      await contentService.deleteCatalogItem(id);
      dispatch({ type: 'DELETE_CATALOG_ITEM', payload: id });
      toast.success('Item deleted successfully');
    } catch (error) {
      toast.error('Failed to delete item');
    }
  };

  const addCatalogItem = async (itemData) => {
    try {
      const newItem = await contentService.addCatalogItem(itemData);
      dispatch({ type: 'ADD_CATALOG_ITEM', payload: newItem });
      toast.success('New item added successfully');
    } catch (error) {
      toast.error('Failed to add item');
    }
  };

  // News functions
  const loadNews = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const news = await contentService.getNewsArticles();
      dispatch({ type: 'LOAD_NEWS_SUCCESS', payload: news });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Failed to load news');
    }
  };

  const updateNewsArticle = async (id, updates) => {
    try {
      const result = await contentService.updateNewsArticle(id, updates);
      dispatch({ type: 'UPDATE_NEWS_ARTICLE', payload: result });
      toast.success('Article updated successfully');
      
      // If status changed to published, notify
      if (updates.status === 'published') {
        toast.success('Article is now live on the website');
      }
    } catch (error) {
      toast.error('Failed to update article');
    }
  };

  const deleteNewsArticle = async (id) => {
    try {
      await contentService.deleteNewsArticle(id);
      dispatch({ type: 'DELETE_NEWS_ARTICLE', payload: id });
      toast.success('Article deleted successfully');
    } catch (error) {
      toast.error('Failed to delete article');
    }
  };

  const addNewsArticle = async (articleData) => {
    try {
      const newArticle = await contentService.addNewsArticle(articleData);
      dispatch({ type: 'ADD_NEWS_ARTICLE', payload: newArticle });
      toast.success('Article created successfully');
    } catch (error) {
      toast.error('Failed to create article');
    }
  };

  // Events functions
  const loadEvents = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const events = await contentService.getEvents();
      dispatch({ type: 'LOAD_EVENTS_SUCCESS', payload: events });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Failed to load events');
    }
  };

  const updateEvent = async (id, updates) => {
    try {
      const result = await contentService.updateEvent(id, updates);
      dispatch({ type: 'UPDATE_EVENT', payload: result });
      toast.success('Event updated successfully');
      
      // If status changed, notify
      if (updates.status === 'cancelled') {
        toast.info('Event cancelled - registered users will be notified');
      } else if (updates.status === 'published') {
        toast.success('Event is now visible to users');
      }
    } catch (error) {
      toast.error('Failed to update event');
    }
  };

  const deleteEvent = async (id) => {
    try {
      await contentService.deleteEvent(id);
      dispatch({ type: 'DELETE_EVENT', payload: id });
      toast.success('Event deleted successfully');
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };

  const addEvent = async (eventData) => {
    try {
      const newEvent = await contentService.addEvent(eventData);
      dispatch({ type: 'ADD_EVENT', payload: newEvent });
      toast.success('Event created successfully');
    } catch (error) {
      toast.error('Failed to create event');
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Load initial data
  useEffect(() => {
    loadCatalog();
    loadNews();
    loadEvents();
  }, []);

  // Context value
  const value = {
    ...state,
    // Catalog functions
    loadCatalog,
    updateCatalogItem,
    deleteCatalogItem,
    addCatalogItem,
    // News functions
    loadNews,
    updateNewsArticle,
    deleteNewsArticle,
    addNewsArticle,
    // Events functions
    loadEvents,
    updateEvent,
    deleteEvent,
    addEvent,
    // Utility functions
    clearError
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};

// Custom hook to use content context
export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export default ContentContext;