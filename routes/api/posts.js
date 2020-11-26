const e = require('express');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post');
const User = require('../../models/User');

// @route POST api/posts/create
// @desc  post posts
router.post('/create', async (req, res) => {
  try {  
    const { userid, text, name } = req.body;
    const post = new Post({
      user: userid,
      text: text,
      name: name,
    })
    console.log(post)
    await post.save();
    res.json({ msg: "tweet created!",
               post: post})
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

// @route POST api/posts/update
// @desc  update posts
router.post('/update', async (req, res) => {
  try {
    const { tweetid, text, username } = req.body;
    console.log(req.body)
    let post = await Post.findById(tweetid);
    if (post) {
      post.text = text;
      post.username = username;
      await post.save();
      res.json({ msg: "tweet updated!",
                post: post})
    } else {
      return res.status(400).json({ errors: [{ msg: 'Tweet does not exists'}]});
    }
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Tweet id is invalid' });
    }
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

// @route POST api/posts/delete
// @desc  post posts
router.post('/delete', async (req, res) => {
  try {  
    const { id } = req.body;
    const post = await Post.findById(id);
    if (post) {
      await post.remove();
      res.json({ msg: "tweet deleted!",
      post: post})
    } else {
      res.json({ msg: "No tweet under this id"})
    }
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Tweet id is invalid' });
    }
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

// @route POST api/posts/delete
// @desc  post posts
router.post('/getone', async (req, res) => {
  try {  
    const { id } = req.body;
    const post = await Post.findById(id);
    if (post) {
      res.json({ msg: "tweet found!",
      post: post})
    } else {
      res.json({ msg: "No tweet under this id"})
    }
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Tweet id is invalid' });
    }
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

// @route POST api/posts/getfriends
// @desc  post posts
router.post('/getfriends', async (req, res) => {
  try {  
    const { userid } = req.body;
    const user = await User.findById(userid)
    const A = user.friends
    let friends = []
    for (let i = 0; i < A.length; i++) {
      friends.unshift(A[i].user.toString())
    }
    if (friends.length === 0) {
      return res
        .status(400)
        .json({ msg: "User has no friends, please add friends and try again" })
    }
    const posts = await Post.find();
    const postsfound = await posts.filter((post) =>
      friends.indexOf(post.user.toString()) > -1
    );
    res.json({ msg: "friends posts are found here!",
               postsfound: postsfound
  })
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Tweet id is invalid' });
    }
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

module.exports = router;
