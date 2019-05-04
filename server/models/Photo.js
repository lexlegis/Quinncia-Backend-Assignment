const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  publicId: String,
  createdAt: {
    type: Date, 
    default: Date.now
  },
  userId: String,
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Photo', PhotoSchema);