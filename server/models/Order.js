const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    catalogItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CatalogItem',
      required: true
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    subtotal: { type: Number, required: true }
  }],
  shippingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: 'India' },
    phone: { type: String, required: true }
  },
  pricing: {
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, required: true, default: 0 },
    tax: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true }
  },
  payment: {
    method: {
      type: String,
      enum: ['deposit_account', 'razorpay', 'cod'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    paidAt: Date,
    failureReason: String
  },
  shipping: {
    method: {
      type: String,
      enum: ['registered_post', 'speed_post', 'express'],
      default: 'registered_post'
    },
    trackingNumber: String,
    carrier: { type: String, default: 'India Post' },
    estimatedDelivery: Date,
    actualDelivery: Date
  },
  status: {
    type: String,
    enum: [
      'pending_payment',
      'payment_failed',
      'confirmed',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
      'refunded'
    ],
    default: 'pending_payment'
  },
  statusHistory: [{
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    note: String,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  notes: {
    customer: String,
    admin: String
  },
  cancellation: {
    reason: String,
    requestedAt: Date,
    processedAt: Date,
    refundAmount: Number,
    refundStatus: {
      type: String,
      enum: ['pending', 'processed', 'failed']
    }
  }
}, {
  timestamps: true
});

// Indexes
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ 'payment.status': 1 });

// Pre-save middleware to generate order number
orderSchema.pre('save', async function(next) {
  if (this.isNew && !this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    // Find the last order of the day
    const lastOrder = await this.constructor.findOne({
      orderNumber: new RegExp(`^PHI${year}${month}${day}`)
    }).sort({ orderNumber: -1 });
    
    let sequence = 1;
    if (lastOrder) {
      const lastSequence = parseInt(lastOrder.orderNumber.slice(-4));
      sequence = lastSequence + 1;
    }
    
    this.orderNumber = `PHI${year}${month}${day}${String(sequence).padStart(4, '0')}`;
  }
  next();
});

// Method to add status update
orderSchema.methods.updateStatus = function(newStatus, note = '', updatedBy = null) {
  this.status = newStatus;
  this.statusHistory.push({
    status: newStatus,
    note,
    updatedBy
  });
  return this.save();
};

// Method to calculate total
orderSchema.methods.calculateTotal = function() {
  const subtotal = this.items.reduce((sum, item) => sum + item.subtotal, 0);
  this.pricing.subtotal = subtotal;
  this.pricing.total = subtotal + this.pricing.shippingCost + this.pricing.tax - this.pricing.discount;
  return this.pricing.total;
};

// Virtual for formatted order number
orderSchema.virtual('formattedOrderNumber').get(function() {
  return this.orderNumber;
});

// Method to check if order can be cancelled
orderSchema.methods.canBeCancelled = function() {
  return ['pending_payment', 'confirmed', 'processing'].includes(this.status);
};

// Method to check if order can be refunded
orderSchema.methods.canBeRefunded = function() {
  return ['delivered'].includes(this.status) && 
         this.payment.status === 'completed';
};

// Static method to get order statistics
orderSchema.statics.getOrderStats = function(startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: '$pricing.total' },
        averageOrderValue: { $avg: '$pricing.total' },
        completedOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0] }
        },
        cancelledOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
        }
      }
    }
  ]);
};

module.exports = mongoose.model('Order', orderSchema);