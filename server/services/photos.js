'use strict';
require('../../handlers/cloudinary');
require('../models/Photo');
const mongoose = require('mongoose');
const Photo = mongoose.model('Photo');
const cloudinary = require('cloudinary');
const socketIO = require('../../handlers/socketIO');

async function getPhotos(req, res) {
  try {
  const photos = await Photo.find({isDeleted: false})
    .lean()
    .sort({
      createdAt: 'desc'
    });
  res.json({'photos': photos});
  } catch(error) {
    console.log("error: " + error);
    res.json({'photos': null});
  }
}

async function getPhoto(req, res) {
  try {
    const photo = await Photo.findOne({publicId: req.params.publicId, isDeleted: false}).lean();
    res.json({'photo': photo});
  } catch(error) {
    console.log("error: " + error);
    res.json({'photo': null});
  }
}

async function uploadPhoto(req, res) {
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    console.log(JSON.stringify(result));
    const photo = new Photo();
    photo.user = req.body.user; // TODO change with auth
    photo.imageUrl = result.secure_url;
    photo.publicId = result.public_id;
    await photo.save();
    socketIO.emitMessage('new photo', JSON.stringify(photo));
    res.json({success: true});
  } catch(error) {
    console.log("error: " + error);
    res.json({success: false});
  }
}

async function deletePhoto(req, res) {
  try {
    const publicId = req.body.publicId;
    await Photo.updateOne({publicId: publicId}, {isDeleted: true});
    // await cloudinary.v2.uploader.destroy(publicId);
    socketIO.emitMessage('deleted photo', publicId);
    res.json({success: true});
  } catch(error) {
    console.log("error: " + error);
    res.json({success: false});
  }
}

module.exports = {
  getPhotos: getPhotos,
  getPhoto: getPhoto,
  uploadPhoto: uploadPhoto,
  deletePhoto: deletePhoto
}