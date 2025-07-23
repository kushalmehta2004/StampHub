const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const CatalogItem = require('../models/CatalogItem');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Add funds to deposit account
router.post('/deposit', authenticateToken, [
  body('amount').isFloat({ min: 1, max: 50000 }).withMessage('Amount must be between ₹1 and ₹50,000'),
  body('description').optional().trim().isLength({ max: 200 }).withMessage('Description cannot exceed 200 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { amount, description = 'Deposit account top-up' } = req.body;
    const user = await User.findById(req.user._id);

    await user.addToDeposit(amount, description);

    res.json({
      message: 'Funds added successfully',
      data: {
        newBalance: user.depositAccount.balance,
        transaction: user.depositAccount.transactions[user.depositAccount.transactions.length - 1]
      }
    });

  } catch (error) {
    console.error('Deposit error:', error);
    res.status(500).json({
      message: 'Failed to add funds',
      error: 'DEPOSIT_ERROR'
    });
  }
});

// Get deposit account transactions
router.get('/transactions', authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const user = await User.findById(req.user._id)
      .populate('depositAccount.transactions.orderId', 'orderNumber status');

    const transactions = user.depositAccount.transactions
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(skip, skip + limit);

    const totalTransactions = user.depositAccount.transactions.length;
    const totalPages = Math.ceil(totalTransactions / limit);

    res.json({
      message: 'Transactions retrieved successfully',
      data: {
        transactions,
        currentBalance: user.depositAccount.balance,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalTransactions,
          itemsPerPage: limit
        }
      }
    });

  } catch (error) {
    console.error('Transactions fetch error:', error);
    res.status(500).json({
      message: 'Failed to fetch transactions',
      error: 'TRANSACTIONS_FETCH_ERROR'
    });
  }
});

// Add item to wishlist
router.post('/wishlist/:itemId', authenticateToken, async (req, res) => {
  try {
    const { itemId } = req.params;

    // Check if item exists
    const item = await CatalogItem.findById(itemId);
    if (!item || !item.isActive) {
      return res.status(404).json({
        message: 'Item not found or not available',
        error: 'ITEM_NOT_FOUND'
      });
    }

    const user = await User.findById(req.user._id);

    // Check if item is already in wishlist
    if (user.wishlist.includes(itemId)) {
      return res.status(400).json({
        message: 'Item already in wishlist',
        error: 'ITEM_ALREADY_IN_WISHLIST'
      });
    }

    user.wishlist.push(itemId);
    await user.save();

    res.json({
      message: 'Item added to wishlist successfully',
      data: {
        wishlistCount: user.wishlist.length
      }
    });

  } catch (error) {
    console.error('Wishlist add error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid item ID',
        error: 'INVALID_ID'
      });
    }

    res.status(500).json({
      message: 'Failed to add item to wishlist',
      error: 'WISHLIST_ADD_ERROR'
    });
  }
});

// Remove item from wishlist
router.delete('/wishlist/:itemId', authenticateToken, async (req, res) => {
  try {
    const { itemId } = req.params;
    const user = await User.findById(req.user._id);

    const itemIndex = user.wishlist.indexOf(itemId);
    if (itemIndex === -1) {
      return res.status(404).json({
        message: 'Item not found in wishlist',
        error: 'ITEM_NOT_IN_WISHLIST'
      });
    }

    user.wishlist.splice(itemIndex, 1);
    await user.save();

    res.json({
      message: 'Item removed from wishlist successfully',
      data: {
        wishlistCount: user.wishlist.length
      }
    });

  } catch (error) {
    console.error('Wishlist remove error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid item ID',
        error: 'INVALID_ID'
      });
    }

    res.status(500).json({
      message: 'Failed to remove item from wishlist',
      error: 'WISHLIST_REMOVE_ERROR'
    });
  }
});

// Get user's wishlist
router.get('/wishlist', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'wishlist',
        match: { isActive: true },
        select: 'name description category postalCircle price images releaseDate rating stock'
      });

    res.json({
      message: 'Wishlist retrieved successfully',
      data: {
        items: user.wishlist,
        count: user.wishlist.length
      }
    });

  } catch (error) {
    console.error('Wishlist fetch error:', error);
    res.status(500).json({
      message: 'Failed to fetch wishlist',
      error: 'WISHLIST_FETCH_ERROR'
    });
  }
});

// Get user dashboard data
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('wishlist', 'name price images')
      .select('-password');

    // Get recent orders (last 5)
    const Order = require('../models/Order');
    const recentOrders = await Order.find({ user: req.user._id })
      .populate('items.catalogItem', 'name images')
      .sort({ createdAt: -1 })
      .limit(5);

    // Get order statistics
    const orderStats = await Order.aggregate([
      { $match: { user: user._id } },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$pricing.total' },
          completedOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0] }
          },
          pendingOrders: {
            $sum: { $cond: [{ $in: ['$status', ['pending_payment', 'confirmed', 'processing', 'shipped']] }, 1, 0] }
          }
        }
      }
    ]);

    const stats = orderStats[0] || {
      totalOrders: 0,
      totalSpent: 0,
      completedOrders: 0,
      pendingOrders: 0
    };

    res.json({
      message: 'Dashboard data retrieved successfully',
      data: {
        user,
        recentOrders,
        statistics: stats,
        wishlistCount: user.wishlist.length
      }
    });

  } catch (error) {
    console.error('Dashboard fetch error:', error);
    res.status(500).json({
      message: 'Failed to fetch dashboard data',
      error: 'DASHBOARD_FETCH_ERROR'
    });
  }
});

// Admin routes

// Get all users (Admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const search = req.query.search;

    const filter = {};
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const [users, totalCount] = await Promise.all([
      User.find(filter)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      User.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      message: 'Users retrieved successfully',
      data: {
        users,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalCount,
          itemsPerPage: limit
        }
      }
    });

  } catch (error) {
    console.error('Users fetch error:', error);
    res.status(500).json({
      message: 'Failed to fetch users',
      error: 'USERS_FETCH_ERROR'
    });
  }
});

// Get user by ID (Admin only)
router.get('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('wishlist', 'name price images')
      .select('-password');

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        error: 'USER_NOT_FOUND'
      });
    }

    // Get user's order statistics
    const Order = require('../models/Order');
    const orderStats = await Order.aggregate([
      { $match: { user: user._id } },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$pricing.total' },
          completedOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0] }
          }
        }
      }
    ]);

    const stats = orderStats[0] || {
      totalOrders: 0,
      totalSpent: 0,
      completedOrders: 0
    };

    res.json({
      message: 'User retrieved successfully',
      data: {
        user,
        statistics: stats
      }
    });

  } catch (error) {
    console.error('User fetch error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid user ID',
        error: 'INVALID_ID'
      });
    }

    res.status(500).json({
      message: 'Failed to fetch user',
      error: 'USER_FETCH_ERROR'
    });
  }
});

// Update user status (Admin only)
router.put('/:id/status', authenticateToken, requireAdmin, [
  body('isActive').isBoolean().withMessage('isActive must be a boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { isActive } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        error: 'USER_NOT_FOUND'
      });
    }

    res.json({
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      data: user
    });

  } catch (error) {
    console.error('User status update error:', error);
    res.status(500).json({
      message: 'Failed to update user status',
      error: 'STATUS_UPDATE_ERROR'
    });
  }
});

module.exports = router;