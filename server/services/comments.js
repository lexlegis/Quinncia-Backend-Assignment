'use strict';
require('../../handlers/cloudinary');
require('../models/Comment');
const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const socketIO = require('../../handlers/socketIO');

async function getComments(req, res) {
  try {
    const photoId = req.params.photoId;
  const comments = await Comment.find({photoId: photoId})
    .lean()
    .sort({
      createdAt: 'desc'
    });
  res.json({'comments': comments});
  } catch(error) {
    console.log("error: " + error);
    res.json({'comments': null});
  }
}

async function postComment(req, res) {
  try {
    const comment = new Comment();
    comment.text = req.body.text; 
    comment.userId = req.body.userId; // TODO change with auth
    comment.photoId = req.body.photoId;
    if(req.body.parentComment) {
      comment.parentComment = req.body.parentComment;
    }
    await comment.save();
    socketIO.emitMessage('new comment', JSON.stringify(comment));
    res.json({success: true});
  } catch(error) {
    console.log("error: " + error);
    res.json({success: false});
  }
}

module.exports = {
  getComments: getComments,
  postComment: postComment
}