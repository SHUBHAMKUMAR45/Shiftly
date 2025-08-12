const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  age: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true,
    enum: ['M', 'F', 'Other']
  },
  role: {
    type: String,
    default: 'both',
    enum: ['buyer', 'seller', 'both']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  subscription: {
    plan: {
      type: String,
      default: 'free',
      enum: ['free', 'basic', 'pro', 'enterprise']
    },
    messagesUsed: {
      type: Number,
      default: 0
    },
    validUntil: {
      type: Date,
      default: null
    }
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);