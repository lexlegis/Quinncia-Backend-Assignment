'use strict';

const express = require('express');
const commentsService = require('../../services/comments');
const upload = require('../../../handlers/multer')
let router = express.Router();

router.get('/:photoId', commentsService.getComments);
router.post('/', commentsService.postComment);

module.exports = router;
