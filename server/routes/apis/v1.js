'use strict';

const registerController = require('../../controllers/apis/register');
const loginController = require('../../controllers/apis/login');
const photosController = require('../../controllers/apis/photos');
const commentsController = require('../../controllers/apis/comments');
const express = require('express');

let router = express.Router();

router.use('/register', registerController);
router.use('/login', loginController);
router.use('/photos', photosController);
router.use('/comments', commentsController);

module.exports = router;