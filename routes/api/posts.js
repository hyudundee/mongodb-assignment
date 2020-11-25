const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post');
const User = require('../../models/User');

// @route POST api/posts
// @desc  post posts

module.exports = router;
