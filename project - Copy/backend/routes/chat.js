const express = require('express');
const Chat = require('../models/Chat');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get chat for a property
router.get('/property/:propertyId', authMiddleware, async (req, res) => {
  try {
    const { propertyId } = req.params;
    
    const chat = await Chat.findOne({
      property: propertyId,
      $or: [{ buyer: req.userId }, { seller: req.userId }]
    })
    .populate('buyer', 'firstName lastName')
    .populate('seller', 'firstName lastName')
    .populate('property', 'title');

    res.json(chat);
  } catch (error) {
    console.error('Fetch chat error:', error);
    res.status(500).json({ message: 'Failed to fetch chat' });
  }
});

// Send message
router.post('/property/:propertyId/message', authMiddleware, async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { content, receiverId } = req.body;

    // Check user's message limit
    const user = await User.findById(req.userId);
    const subscription = user.subscription;
    
    const messageLimit = getMessageLimit(subscription.plan);
    
    if (messageLimit > 0 && subscription.messagesUsed >= messageLimit) {
      return res.status(403).json({
        message: 'Message limit reached',
        subscriptionRequired: true
      });
    }

    // Find or create chat
    let chat = await Chat.findOne({
      property: propertyId,
      buyer: req.userId,
      seller: receiverId
    });

    if (!chat) {
      chat = new Chat({
        property: propertyId,
        buyer: req.userId,
        seller: receiverId,
        messages: []
      });
    }

    // Add message
    chat.messages.push({
      sender: req.userId,
      content,
      timestamp: new Date()
    });

    await chat.save();

    // Increment user's message count
    user.subscription.messagesUsed += 1;
    await user.save();

    await chat.populate('buyer', 'firstName lastName');
    await chat.populate('seller', 'firstName lastName');
    await chat.populate('property', 'title');

    res.json({
      message: 'Message sent successfully',
      chat
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

// Get user's chats
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const chats = await Chat.find({
      $or: [{ buyer: req.userId }, { seller: req.userId }]
    })
    .populate('buyer', 'firstName lastName')
    .populate('seller', 'firstName lastName')
    .populate('property', 'title images price')
    .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (error) {
    console.error('Fetch user chats error:', error);
    res.status(500).json({ message: 'Failed to fetch chats' });
  }
});

function getMessageLimit(plan) {
  const limits = {
    free: 5,
    basic: 50,
    pro: -1, // unlimited
    enterprise: -1 // unlimited
  };
  return limits[plan] || 5;
}

module.exports = router;