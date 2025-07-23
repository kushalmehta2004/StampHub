const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[6-9]\d{9}$/, 'Please enter a valid Indian phone number']
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { 
      type: String, 
      required: true,
      match: [/^[1-9][0-9]{5}$/, 'Please enter a valid pincode']
    },
    country: { type: String, default: 'India' }
  },
  depositAccount: {
    balance: { type: Number, default: 0, min: 0 },
    transactions: [{
      type: { type: String, enum: ['credit', 'debit'], required: true },
      amount: { type: Number, required: true },
      description: { type: String, required: true },
      orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
      timestamp: { type: Date, default: Date.now }
    }]
  },
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CatalogItem'
  }],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ 'depositAccount.balance': 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Get full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Add to deposit account
userSchema.methods.addToDeposit = function(amount, description, orderId = null) {
  this.depositAccount.balance += amount;
  this.depositAccount.transactions.push({
    type: 'credit',
    amount,
    description,
    orderId
  });
  return this.save();
};

// Deduct from deposit account
userSchema.methods.deductFromDeposit = function(amount, description, orderId = null) {
  if (this.depositAccount.balance < amount) {
    throw new Error('Insufficient balance');
  }
  this.depositAccount.balance -= amount;
  this.depositAccount.transactions.push({
    type: 'debit',
    amount,
    description,
    orderId
  });
  return this.save();
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);