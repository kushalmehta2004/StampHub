const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const CatalogItem = require('../models/CatalogItem');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
router.post('/create-razorpay-order', authenticateToken, [
  body('orderId').isMongoId().withMessage('Invalid order ID')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { orderId } = req.body;

    // Find the order
    const order = await Order.findById(orderId);
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

    // Check if order is in correct state
    if (order.status !== 'pending_payment') {
      return res.status(400).json({
        message: 'Order is not in pending payment state',
        error: 'INVALID_ORDER_STATE',
        currentStatus: order.status
      });
    }

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(order.pricing.total * 100), // Amount in paise
      currency: 'INR',
      receipt: order.orderNumber,
      notes: {
        orderId: order._id.toString(),
        userId: req.user._id.toString()
      }
    });

    // Update order with Razorpay order ID
    order.payment.razorpayOrderId = razorpayOrder.id;
    await order.save();

    res.json({
      message: 'Razorpay order created successfully',
      data: {
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        key: process.env.RAZORPAY_KEY_ID,
        orderDetails: {
          orderNumber: order.orderNumber,
          total: order.pricing.total,
          items: order.items.length
        }
      }
    });

  } catch (error) {
    console.error('Razorpay order creation error:', error);
    res.status(500).json({
      message: 'Failed to create Razorpay order',
      error: 'RAZORPAY_ORDER_ERROR'
    });
  }
});

// Verify Razorpay payment
router.post('/verify-razorpay-payment', authenticateToken, [
  body('razorpay_order_id').notEmpty().withMessage('Razorpay order ID is required'),
  body('razorpay_payment_id').notEmpty().withMessage('Razorpay payment ID is required'),
  body('razorpay_signature').notEmpty().withMessage('Razorpay signature is required'),
  body('orderId').isMongoId().withMessage('Invalid order ID')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId
    } = req.body;

    // Find the order
    const order = await Order.findById(orderId);
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

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      // Mark payment as failed
      order.payment.status = 'failed';
      order.payment.failureReason = 'Invalid signature';
      order.status = 'payment_failed';
      await order.save();

      return res.status(400).json({
        message: 'Payment verification failed',
        error: 'INVALID_SIGNATURE'
      });
    }

    // Payment successful - update order
    order.payment.status = 'completed';
    order.payment.razorpayPaymentId = razorpay_payment_id;
    order.payment.razorpaySignature = razorpay_signature;
    order.payment.paidAt = new Date();
    order.status = 'confirmed';

    await order.save();

    // Reduce actual stock for all items
    for (const item of order.items) {
      const catalogItem = await CatalogItem.findById(item.catalogItem);
      if (catalogItem) {
        await catalogItem.reduceStock(item.quantity);
      }
    }

    // Add status history
    await order.updateStatus('confirmed', 'Payment completed successfully');

    res.json({
      message: 'Payment verified successfully',
      data: {
        orderNumber: order.orderNumber,
        paymentId: razorpay_payment_id,
        amount: order.pricing.total,
        status: order.status
      }
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      message: 'Payment verification failed',
      error: 'PAYMENT_VERIFICATION_ERROR'
    });
  }
});

// Handle payment failure
router.post('/payment-failed', authenticateToken, [
  body('orderId').isMongoId().withMessage('Invalid order ID'),
  body('error').optional().isObject().withMessage('Error must be an object')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { orderId, error } = req.body;

    // Find the order
    const order = await Order.findById(orderId);
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

    // Update order status
    order.payment.status = 'failed';
    order.payment.failureReason = error?.description || 'Payment failed';
    order.status = 'payment_failed';

    await order.save();

    // Release reserved stock
    for (const item of order.items) {
      const catalogItem = await CatalogItem.findById(item.catalogItem);
      if (catalogItem) {
        await catalogItem.releaseStock(item.quantity);
      }
    }

    await order.updateStatus('payment_failed', `Payment failed: ${order.payment.failureReason}`);

    res.json({
      message: 'Payment failure recorded',
      data: {
        orderNumber: order.orderNumber,
        status: order.status,
        failureReason: order.payment.failureReason
      }
    });

  } catch (error) {
    console.error('Payment failure handling error:', error);
    res.status(500).json({
      message: 'Failed to handle payment failure',
      error: 'PAYMENT_FAILURE_HANDLING_ERROR'
    });
  }
});

// Get payment status
router.get('/status/:orderId', authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
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

    res.json({
      message: 'Payment status retrieved successfully',
      data: {
        orderNumber: order.orderNumber,
        paymentStatus: order.payment.status,
        orderStatus: order.status,
        amount: order.pricing.total,
        paymentMethod: order.payment.method,
        paidAt: order.payment.paidAt,
        failureReason: order.payment.failureReason
      }
    });

  } catch (error) {
    console.error('Payment status fetch error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid order ID',
        error: 'INVALID_ID'
      });
    }

    res.status(500).json({
      message: 'Failed to fetch payment status',
      error: 'PAYMENT_STATUS_ERROR'
    });
  }
});

// Webhook for Razorpay (for additional security and automation)
router.post('/webhook', async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const body = JSON.stringify(req.body);

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return res.status(400).json({ message: 'Invalid signature' });
    }

    const event = req.body.event;
    const paymentEntity = req.body.payload.payment.entity;

    if (event === 'payment.captured') {
      // Find order by Razorpay order ID
      const order = await Order.findOne({
        'payment.razorpayOrderId': paymentEntity.order_id
      });

      if (order && order.payment.status !== 'completed') {
        order.payment.status = 'completed';
        order.payment.razorpayPaymentId = paymentEntity.id;
        order.payment.paidAt = new Date();
        order.status = 'confirmed';
        
        await order.save();
        await order.updateStatus('confirmed', 'Payment captured via webhook');

        // Reduce stock if not already done
        for (const item of order.items) {
          const catalogItem = await CatalogItem.findById(item.catalogItem);
          if (catalogItem && catalogItem.stock.reserved >= item.quantity) {
            await catalogItem.reduceStock(item.quantity);
          }
        }
      }
    } else if (event === 'payment.failed') {
      // Find order by Razorpay order ID
      const order = await Order.findOne({
        'payment.razorpayOrderId': paymentEntity.order_id
      });

      if (order && order.payment.status === 'pending') {
        order.payment.status = 'failed';
        order.payment.failureReason = paymentEntity.error_description || 'Payment failed';
        order.status = 'payment_failed';
        
        await order.save();
        await order.updateStatus('payment_failed', 'Payment failed via webhook');

        // Release reserved stock
        for (const item of order.items) {
          const catalogItem = await CatalogItem.findById(item.catalogItem);
          if (catalogItem) {
            await catalogItem.releaseStock(item.quantity);
          }
        }
      }
    }

    res.json({ status: 'ok' });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: 'Webhook processing failed' });
  }
});

module.exports = router;