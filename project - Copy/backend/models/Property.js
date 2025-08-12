const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: String,
    price: Number,
    location: String,
    bhk: String,
    area: String,
    amenities: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', propertySchema);
