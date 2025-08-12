const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Fetch profile error:', error);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password; // Prevent password update through this route

    const user = await User.findByIdAndUpdate(
      req.userId,
      updates,
      { new: true }
    ).select('-password');

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

// Add/remove favorite
router.post('/favorites/:propertyId', authMiddleware, async (req, res) => {
  try {
    const { propertyId } = req.params;
    const user = await User.findById(req.userId);

    const isFavorite = user.favorites.includes(propertyId);

    if (isFavorite) {
      user.favorites = user.favorites.filter(id => id.toString() !== propertyId);
    } else {
      user.favorites.push(propertyId);
    }

    await user.save();

    res.json({
      message: isFavorite ? 'Removed from favorites' : 'Added to favorites',
      isFavorite: !isFavorite
    });
  } catch (error) {
    console.error('Favorite toggle error:', error);
    res.status(500).json({ message: 'Failed to update favorites' });
  }
});

// Get user favorites
router.get('/favorites', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    console.error('Fetch favorites error:', error);
    res.status(500).json({ message: 'Failed to fetch favorites' });
  }
});

// Update subscription
router.post('/subscription', authMiddleware, async (req, res) => {
  try {
    const { plan } = req.body;
    
    const user = await User.findById(req.userId);
    user.subscription.plan = plan;
    user.subscription.messagesUsed = 0; // Reset messages on plan change
    user.subscription.validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    await user.save();

    res.json({
      message: 'Subscription updated successfully',
      subscription: user.subscription
    });
  } catch (error) {
    console.error('Update subscription error:', error);
    res.status(500).json({ message: 'Failed to update subscription' });
  }
});

module.exports = router;