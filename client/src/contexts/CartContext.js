import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
      };
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(
        item => item.catalogItem._id === action.payload.catalogItem._id
      );
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return {
          ...state,
          items: updatedItems,
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.catalogItem._id === action.payload.itemId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          item => item.catalogItem._id !== action.payload
        ),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: [],
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  // Add item to cart
  const addToCart = (catalogItem, quantity = 1) => {
    // Check if item is in stock
    if (!catalogItem.isInStock || catalogItem.stock.available < quantity) {
      toast.error('Item is out of stock');
      return;
    }

    const cartItem = {
      catalogItem,
      quantity,
      price: catalogItem.price,
      subtotal: catalogItem.price * quantity,
    };

    dispatch({ type: 'ADD_ITEM', payload: cartItem });
    toast.success(`${catalogItem.name} added to cart`);
  };

  // Update item quantity
  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const item = state.items.find(item => item.catalogItem._id === itemId);
    if (item && item.catalogItem.stock.available < quantity) {
      toast.error('Not enough stock available');
      return;
    }

    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { itemId, quantity },
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    const item = state.items.find(item => item.catalogItem._id === itemId);
    if (item) {
      dispatch({ type: 'REMOVE_ITEM', payload: itemId });
      toast.success(`${item.catalogItem.name} removed from cart`);
    }
  };

  // Clear entire cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Cart cleared');
  };

  // Get cart totals
  const getCartTotals = () => {
    const subtotal = state.items.reduce((total, item) => {
      return total + (item.catalogItem.price * item.quantity);
    }, 0);

    const itemCount = state.items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    // Calculate shipping (simplified - based on item count)
    const shippingCost = itemCount > 0 ? Math.max(25, Math.ceil(itemCount / 5) * 15) : 0;
    
    const total = subtotal + shippingCost;

    return {
      subtotal,
      shippingCost,
      total,
      itemCount,
    };
  };

  // Check if item is in cart
  const isInCart = (itemId) => {
    return state.items.some(item => item.catalogItem._id === itemId);
  };

  // Get item quantity in cart
  const getItemQuantity = (itemId) => {
    const item = state.items.find(item => item.catalogItem._id === itemId);
    return item ? item.quantity : 0;
  };

  const value = {
    items: state.items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotals,
    isInCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;