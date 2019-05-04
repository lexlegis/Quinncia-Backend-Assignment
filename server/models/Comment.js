const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  photoId: String,
  parentComment: String,
  createdAt: {
    type: Date, 
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', CommentSchema);