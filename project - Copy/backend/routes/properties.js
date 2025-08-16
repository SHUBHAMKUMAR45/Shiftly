// routes/propertyRoutes.js
const express = require('express');
const Property = require('../models/Property');
const router = express.Router();

// Create Property
router.post('/', async (req, res) => {
  try {
    const property = new Property(req.body);
    const savedProperty = await property.save();

    res.status(201).json({
      success: true,
      data: savedProperty,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Get All Properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: properties,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Get Single Property by ID
// GET /api/properties/:id
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }
    res.json({ success: true, data: property });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});



module.exports = router;

// const express = require('express');
// const Property = require('../models/Property');
// const authMiddleware = require('../middleware/auth');

// const router = express.Router();

// // Get all properties with filters
// // router.get('/', async (req, res) => {
// //   try {
// //     const {
// //       page = 1,
// //       limit = 10,
// //       search,
// //       category,
// //       propertyType,
// //       minPrice,
// //       maxPrice,
// //       bhk,
// //       city
// //     } = req.query;

// //     // Build filter object
// //     const filter = {};

// //     if (search) {
// //       filter.$text = { $search: search };
// //     }

// //     if (category) {
// //       filter.category = category;
// //     }

// //     if (propertyType) {
// //       filter.propertyType = propertyType;
// //     }

// //     if (minPrice || maxPrice) {
// //       filter.price = {};
// //       if (minPrice) filter.price.$gte = parseInt(minPrice);
// //       if (maxPrice) filter.price.$lte = parseInt(maxPrice);
// //     }

// //     if (bhk) {
// //       filter.bhk = bhk;
// //     }

// //     if (city) {
// //       filter.city = city;
// //     }

// //     const properties = await Property.find(filter)
// //       .populate('owner', 'firstName lastName phoneNumber')
// //       .sort({ createdAt: -1 })
// //       .limit(limit * 1)
// //       .skip((page - 1) * limit);

// //     const total = await Property.countDocuments(filter);

// //     res.json({
// //       properties,
// //       totalPages: Math.ceil(total / limit),
// //       currentPage: page,
// //       total
// //     });
// //   } catch (error) {
// //     console.error('Fetch properties error:', error);
// //     res.status(500).json({ message: 'Failed to fetch properties' });
// //   }
// // });

// router.post('/', async (req, res) => {
//   try {
//     const propertyData = { ...req.body, owner: req.userId };
//     const property = new Property(propertyData);
//     await property.save();
//     await property.populate('owner', 'firstName lastName phoneNumber');
//     res
//       .status(201)
//       .json({ message: 'Property created successfully', property });
//   } catch (error) {
//     console.error('Create property error:', error);
//     res.status(500).json({ message: 'Failed to create property' });
//   }
// });

// // Get single property
// router.get('/:id', async (req, res) => {
//   try {
//     const property = await Property.findById(req.params.id)
//       .populate('owner', 'firstName lastName phoneNumber email');

//     if (!property) {
//       return res.status(404).json({ message: 'Property not found' });
//     }

//     // Increment views
//     property.views += 1;
//     await property.save();

//     res.json(property);
//   } catch (error) {
//     console.error('Fetch property error:', error);
//     res.status(500).json({ message: 'Failed to fetch property' });
//   }
// });

// // Create property (protected)
// router.post('/', authMiddleware, async (req, res) => {
//   try {
//     const propertyData = {
//       ...req.body,
//       owner: req.userId
//     };

//     const property = new Property(propertyData);
//     await property.save();

//     await property.populate('owner', 'firstName lastName phoneNumber');

//     res.status(201).json({
//       message: 'Property created successfully',
//       property
//     });
//   } catch (error) {
//     console.error('Create property error:', error);
//     res.status(500).json({ message: 'Failed to create property' });
//   }
// });

// // Get trending properties
// router.get('/featured/trending', async (req, res) => {
//   try {
//     const properties = await Property.find({ isTrending: true })
//       .populate('owner', 'firstName lastName')
//       .limit(10)
//       .sort({ views: -1 });

//     res.json(properties);
//   } catch (error) {
//     console.error('Fetch trending properties error:', error);
//     res.status(500).json({ message: 'Failed to fetch trending properties' });
//   }
// });

// // Get recommended properties
// router.get('/featured/recommended', authMiddleware, async (req, res) => {
//   try {
//     // Simple recommendation based on user's viewed properties
//     const properties = await Property.find({})
//       .populate('owner', 'firstName lastName')
//       .limit(10)
//       .sort({ views: -1 });

//     res.json(properties);
//   } catch (error) {
//     console.error('Fetch recommended properties error:', error);
//     res.status(500).json({ message: 'Failed to fetch recommended properties' });
//   }
// });

// module.exports = router;
