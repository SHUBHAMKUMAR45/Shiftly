const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: ['Flat', 'Plot', 'Shop', 'House'], // matches UI chip options
      required: true,
    },
    price: { type: Number, required: true }, // numeric for slider
    location: { type: String, required: true },
    bhk: {
      type: String,
      enum: ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'], // matches UI
    },
    area: { type: Number }, // in sq ft, numeric
    amenities: [{ type: String }], // array for multiple selection
    images: [{ type: String }], // store image URLs
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', propertySchema);
