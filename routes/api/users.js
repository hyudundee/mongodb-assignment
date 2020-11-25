const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Post = require('../../models/Post');


// @route GET api/users
// @desc  Test route
router.post('/getone', async (req, res) => {
  try {
    console.log(req.body.email)
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
})
router.post('/delete', async (req, res) => {
  try {
    // const user = await (await User.findById(req.user.email));
    console.log(req.headers['content-type']);
    console.log(req.body.email)
    // res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/users
// @desc  Register user
router.post('/', [
  check(
    'name',
    'Name is required')
    .not()
    .isEmpty(),
  check(
    'email',
    'Please enter a valid email address')
    .isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters')
    .isLength({ min: 6 })
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array });
  }

  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email: email});
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists'}]});
    }
    user = new User({
      name,
      email,
      password  
    });
    await user.save();
    res.send('User registered') 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
