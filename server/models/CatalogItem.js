const mongoose = require('mongoose');

const catalogItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true,
    maxlength: [200, 'Item name cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Item description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'stamps',
      'first-day-covers',
      'postal-stationery',
      'commemorative-items',
      'cancellations',
      'miniature-sheets',
      'souvenir-sheets',
      'booklets'
    ]
  },
  subcategory: {
    type: String,
    trim: true
  },
  theme: {
    type: String,
    enum: [
      'history',
      'culture',
      'nature',
      'sports',
      'personalities',
      'festivals',
      'monuments',
      'flora-fauna',
      'technology',
      'art',
      'literature',
      'freedom-struggle',
      'other'
    ]
  },
  postalCircle: {
    type: String,
    required: [true, 'Postal circle is required'],
    enum: [
      'Andhra Pradesh',
      'Assam',
      'Bihar',
      'Delhi',
      'Gujarat',
      'Haryana',
      'Himachal Pradesh',
      'Jammu & Kashmir',
      'Karnataka',
      'Kerala',
      'Madhya Pradesh',
      'Maharashtra',
      'North East',
      'Odisha',
      'Punjab',
      'Rajasthan',
      'Tamil Nadu',
      'Telangana',
      'Uttar Pradesh',
      'Uttarakhand',
      'West Bengal',
      'Chhattisgarh',
      'Jharkhand'
    ]
  },
  releaseDate: {
    type: Date,
    required: [true, 'Release date is required']
  },
  releaseYear: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  denomination: {
    type: String,
    trim: true
  },
  images: [{
    url: { type: String, required: true },
    alt: { type: String, required: true },
    isPrimary: { type: Boolean, default: false }
  }],
  specifications: {
    size: String,
    perforation: String,
    printingProcess: String,
    designer: String,
    printer: String,
    paperType: String,
    colors: [String]
  },
  stock: {
    quantity: { type: Number, required: true, min: 0 },
    reserved: { type: Number, default: 0, min: 0 },
    available: { type: Number, default: 0, min: 0 }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [String],
  seoTitle: String,
  seoDescription: String,
  views: {
    type: Number,
    default: 0
  },
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Indexes for better query performance
catalogItemSchema.index({ category: 1, isActive: 1 });
catalogItemSchema.index({ postalCircle: 1, isActive: 1 });
catalogItemSchema.index({ releaseYear: -1, isActive: 1 });
catalogItemSchema.index({ price: 1, isActive: 1 });
catalogItemSchema.index({ isFeatured: 1, isActive: 1 });
catalogItemSchema.index({ name: 'text', description: 'text', tags: 'text' });

// Pre-save middleware to calculate available stock
catalogItemSchema.pre('save', function(next) {
  this.available = this.stock.quantity - this.stock.reserved;
  this.releaseYear = this.releaseDate.getFullYear();
  next();
});

// Virtual for primary image
catalogItemSchema.virtual('primaryImage').get(function() {
  const primary = this.images.find(img => img.isPrimary);
  return primary || this.images[0] || null;
});

// Method to check if item is in stock
catalogItemSchema.methods.isInStock = function(quantity = 1) {
  return this.available >= quantity;
};

// Method to reserve stock
catalogItemSchema.methods.reserveStock = function(quantity) {
  if (!this.isInStock(quantity)) {
    throw new Error('Insufficient stock');
  }
  this.stock.reserved += quantity;
  this.available = this.stock.quantity - this.stock.reserved;
  return this.save();
};

// Method to release reserved stock
catalogItemSchema.methods.releaseStock = function(quantity) {
  this.stock.reserved = Math.max(0, this.stock.reserved - quantity);
  this.available = this.stock.quantity - this.stock.reserved;
  return this.save();
};

// Method to reduce actual stock (after order completion)
catalogItemSchema.methods.reduceStock = function(quantity) {
  if (this.stock.quantity < quantity) {
    throw new Error('Insufficient stock');
  }
  this.stock.quantity -= quantity;
  this.stock.reserved = Math.max(0, this.stock.reserved - quantity);
  this.available = this.stock.quantity - this.stock.reserved;
  return this.save();
};

// Method to increment view count
catalogItemSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

module.exports = mongoose.model('CatalogItem', catalogItemSchema);