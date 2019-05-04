'use strict';

const passport = require('passport'); // TODO
const express = require('express');
const photosService = require('../../services/photos');
const upload = require('../../../handlers/multer')
let router = express.Router();

router.get('/', photosService.getPhotos);
router.get('/:publicId', photosService.getPhoto);
router.post('/upload', upload.single('image'), photosService.uploadPhoto);
router.delete('/delete', photosService.deletePhoto);

module.exports = router;
