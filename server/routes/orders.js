const express = require('express');
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const CatalogItem = require('../models/CatalogItem');
const User = require('../models/User');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Calculate shipping cost based on India Post rates
const calculateShippingCost = (items, method = 'registered_post') => {
  const totalWeight = items.reduce((weight, item) => weight + (item.quantity * 0.1), 0); // Assume 100g per item
  
  const rates = {
    registered_post: Math.max(25, Math.ceil(totalWeight / 0.5) * 15), // ₹25 base + ₹15 per 500g
    speed_post: Math.max(40, Math.ceil(totalWeight / 0.5) * 25), // ₹40 base + ₹25 per 500g
    express: Math.max(60, Math.ceil(totalWeight / 0.5) * 35) // ₹60 base + ₹35 per 500g
  };
  
  return rates[method] || rates.registered_post;
};

// Create new order
router.post('/', authenticateToken, [
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('items.*.catalogItem').isMongoId().withMessage('Invalid catalog item ID'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('shippingAddress.firstName').trim().isLength({ min: 2 }).withMessage('First name is required'),
  body('shippingAddress.lastName').trim().isLength({ min: 2 }).withMessage('Last name is required'),
  body('shippingAddress.street').trim().isLength({ min: 5 }).withMessage('Street address is required'),
  body('shippingAddress.city').trim().isLength({ min: 2 }).withMessage('City is required'),
  body('shippingAddress.state').trim().isLength({ min: 2 }).withMessage('State is required'),
  body('shippingAddress.pincode').matches(/^[1-9][0-9]{5}$/).withMessage('Valid pincode is required'),
  body('shippingAddress.phone').matches(/^[6-9]\d{9}$/).withMessage('Valid phone number is required'),
  body('payment.method').isIn(['deposit_account', 'razorpay']).withMessage('Invalid payment method'),
  body('shipping.method').optional().isIn(['registered_post', 'speed_post', 'express']).withMessage('Invalid shipping method')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { items, shippingAddress, payment, shipping } = req.body;

    // Validate and process items
    const orderItems = [];
    let subtotal = 0;

    for (const item of items) {
      const catalogItem = await CatalogItem.findById(item.catalogItem);
      
      if (!catalogItem || !catalogItem.isActive) {
        return res.status(400).json({
          message: `Item not found or not available: ${item.catalogItem}`,
          error: 'ITEM_NOT_AVAILABLE'
        });
      }

      if (!catalogItem.isInStock(item.quantity)) {
        return res.status(400).json({
          message: `Insufficient stock for item: ${catalogItem.name}`,
          error: 'INSUFFICIENT_STOCK'
        });
      }

      const itemSubtotal = catalogItem.price * item.quantity;
      subtotal += itemSubtotal;

      orderItems.push({
        catalogItem: catalogItem._id,
        name: catalogItem.name,
        price: catalogItem.price,
        quantity: item.quantity,
        subtotal: itemSubtotal
      });

      // Reserve stock
      await catalogItem.reserveStock(item.quantity);
    }

    // Calculate shipping cost
    const shippingCost = calculateShippingCost(orderItems, shipping?.method);
    const total = subtotal + shippingCost;

    // Check deposit account balance if using deposit payment
    if (payment.method === 'deposit_account') {
      const user = await User.findById(req.user._id);
      if (user.depositAccount.balance < total) {
        // Release reserved stock
        for (const item of items) {
          const catalogItem = await CatalogItem.findById(item.catalogItem);
          await catalogItem.releaseStock(item.quantity);
        }
        
        return res.status(400).json({
          message: 'Insufficient deposit account balance',
          error: 'INSUFFICIENT_BALANCE',
          required: total,
          available: user.depositAccount.balance
        });
      }
    }

    // Create order
    const order = new Order({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      pricing: {
        subtotal,
        shippingCost,
        total
      },
      payment: {
        method: payment.method,
        status: payment.method === 'deposit_account' ? 'completed' : 'pending'
      },
      shipping: {
        method: shipping?.method || 'registered_post'
      },
      status: payment.method === 'deposit_account' ? 'confirmed' : 'pending_payment'
    });

    await order.save();

    // Process deposit account payment
    if (payment.method === 'deposit_account') {
      const user = await User.findById(req.user._id);
      await user.deductFromDeposit(total, `Order payment - ${order.orderNumber}`, order._id);
      
      // Reduce actual stock
      for (const item of orderItems) {
        const catalogItem = await CatalogItem.findById(item.catalogItem);
        await catalogItem.reduceStock(item.quantity);
      }
      
      order.payment.paidAt = new Date();
      await order.save();
    }

    // Populate order for response
    const populatedOrder = await Order.findById(order._id)
      .populate('items.catalogItem', 'name images category')
      .populate('user', 'firstName lastName email');

    res.status(201).json({
      message: 'Order created successfully',
      data: populatedOrder
    });

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      message: 'Failed to create order',
      error: 'ORDER_CREATION_ERROR'
    });
  }
});

// Get user's orders
router.get('/my-orders', authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [orders, totalCount] = await Promise.all([
      Order.find({ user: req.user._id })
        .populate('items.catalogItem', 'name images category')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Order.countDocuments({ user: req.user._id })
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      message: 'Orders retrieved successfully',
      data: {
        orders,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalCount,
          itemsPerPage: limit
        }
      }
    });

  } catch (error) {
    console.error('Orders fetch error:', error);
    res.status(500).json({
      message: 'Failed to fetch orders',
      error: 'ORDERS_FETCH_ERROR'
    });
  }
});

// Get single order
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.catalogItem', 'name images category specifications')
      .populate('user', 'firstName lastName email phone');

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
        error: 'ORDER_NOT_FOUND'
      });
    }

    // Check if user owns the order or is admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Access denied',
        error: 'ACCESS_DENIED'
      });
    }

    res.json({
      message: 'Order retrieved successfully',
      data: order
    });

  } catch (error) {
    console.error('Order fetch error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid order ID',
        error: 'INVALID_ID'
      });
    }

    res.status(500).json({
      message: 'Failed to fetch order',
      error: 'ORDER_FETCH_ERROR'
    });
  }
});

// Cancel order
router.put('/:id/cancel', authenticateToken, [
  body('reason').optional().trim().isLength({ max: 500 }).withMessage('Cancellation reason cannot exceed 500 characters')
], async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
        error: 'ORDER_NOT_FOUND'
      });
    }

    // Check if user owns the order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Access denied',
        error: 'ACCESS_DENIED'
      });
    }

    // Check if order can be cancelled
    if (!order.canBeCancelled()) {
      return res.status(400).json({
        message: 'Order cannot be cancelled at this stage',
        error: 'CANNOT_CANCEL',
        currentStatus: order.status
      });
    }

    // Process cancellation
    order.cancellation = {
      reason: req.body.reason || 'Cancelled by customer',
      requestedAt: new Date()
    };

    // Release reserved stock
    for (const item of order.items) {
      const catalogItem = await CatalogItem.findById(item.catalogItem);
      if (catalogItem) {
        await catalogItem.releaseStock(item.quantity);
      }
    }

    // Refund to deposit account if payment was completed
    if (order.payment.status === 'completed' && order.payment.method === 'deposit_account') {
      const user = await User.findById(req.user._id);
      await user.addToDeposit(order.pricing.total, `Refund for cancelled order - ${order.orderNumber}`, order._id);
      
      order.cancellation.refundAmount = order.pricing.total;
      order.cancellation.refundStatus = 'processed';
      order.cancellation.processedAt = new Date();
    }

    await order.updateStatus('cancelled', `Order cancelled: ${order.cancellation.reason}`, req.user._id);

    res.json({
      message: 'Order cancelled successfully',
      data: order
    });

  } catch (error) {
    console.error('Order cancellation error:', error);
    res.status(500).json({
      message: 'Failed to cancel order',
      error: 'ORDER_CANCELLATION_ERROR'
    });
  }
});

// Admin routes

// Get all orders (Admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const status = req.query.status;

    const filter = {};
    if (status) filter.status = status;

    const [orders, totalCount] = await Promise.all([
      Order.find(filter)
        .populate('user', 'firstName lastName email')
        .populate('items.catalogItem', 'name category')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Order.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      message: 'Orders retrieved successfully',
      data: {
        orders,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalCount,
          itemsPerPage: limit
        }
      }
    });

  } catch (error) {
    console.error('Admin orders fetch error:', error);
    res.status(500).json({
      message: 'Failed to fetch orders',
      error: 'ORDERS_FETCH_ERROR'
    });
  }
});

// Update order status (Admin only)
router.put('/:id/status', authenticateToken, requireAdmin, [
  body('status').isIn([
    'pending_payment', 'payment_failed', 'confirmed', 'processing',
    'shipped', 'delivered', 'cancelled', 'refunded'
  ]).withMessage('Invalid status'),
  body('note').optional().trim().isLength({ max: 500 }).withMessage('Note cannot exceed 500 characters'),
  body('trackingNumber').optional().trim().isLength({ max: 100 }).withMessage('Tracking number cannot exceed 100 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { status, note, trackingNumber } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
        error: 'ORDER_NOT_FOUND'
      });
    }

    // Update tracking number if provided
    if (trackingNumber && status === 'shipped') {
      order.shipping.trackingNumber = trackingNumber;
      order.shipping.estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
    }

    // Mark delivery date if delivered
    if (status === 'delivered') {
      order.shipping.actualDelivery = new Date();
    }

    await order.updateStatus(status, note, req.user._id);

    res.json({
      message: 'Order status updated successfully',
      data: order
    });

  } catch (error) {
    console.error('Order status update error:', error);
    res.status(500).json({
      message: 'Failed to update order status',
      error: 'STATUS_UPDATE_ERROR'
    });
  }
});

module.exports = router;