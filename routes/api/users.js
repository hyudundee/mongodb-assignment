const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Post = require('../../models/Post');


// @route Get a specific user by id
// @desc  
router.post('/getone', async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (!user) {
      return res(404).json({ msg: 'No user under this ID'});
    }
    res.json(user);
  } catch (err) {console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'User id is invalid' });
    }
    res.status(500).send('Server Error');
  }
});

router.post('/join', async (req, res) => {
  try {
    const {id1, id2} = req.body;
    if (id1 === id2) {
      return res
        .status(400)
        .json({ msg: "Cannot join a user with him/herself as firends"})
    }
    const user1 = await User.findById(id1);
    const user2 = await User.findById(id2);
    const u1_u2_alreay_connected = user1.friends
      .map((f) => f.user)
      .indexOf(id2);
    if (u1_u2_alreay_connected > -1) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Users were already friends' }] });
    }
    user1.friends.unshift(insert2);
    user2.friends.unshift(insert1);
    await user1.save();
    await user2.save();
    res.json({
      msg: "Below users are joined as friends successfully!",
      user1: user1.name,
      user2: user2.name,
      user1_friends: user1.friends,
      user2_friends: user2.friends
    })
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'User id is invalid' });
    }
    console.log(err)
    res.status(500).send('Server Error');
  }
});
router.post('/unjoin', async (req, res) => {try {
  const {id1, id2} = req.body;
  if (id1 === id2) {
    return res
      .status(400)
      .json({ msg: "Cannot unjoin a user as a friend from him/herself"})
  }
  const user1 = await User.findById(id1);
  const user2 = await User.findById(id2);
  if (user1.friends.length === 0 || user1.friends.length === 0) {
    return res
      .status(400)
      .json({ msg: "Cannot remove from empty friends list"});
  }
  const removeidx1 = user1.friends
    .map((f) => f.user)
    .indexOf(id2)
  const removeidx2 = user2.friends
  .map((f) => f.user)
  .indexOf(id1)

  if (removeidx1 === -1 || removeidx2 === -1)  {
    return res
      .status(400)
      .json({ msg: "Cannot unjoin users who are not friends" });
  }
  user1.friends.splice(removeidx1, 1);
  user2.friends.splice(removeidx2, 1);
  await user1.save();
  await user2.save();
  res.json({
    msg: "Below users are unjoined as friends successfully!",
    user1: user1.name,
    user2: user2.name,
    user1_friends: user1.friends,
    user2_friends: user2.friends
  })
} catch (err) {
  if (err.kind === 'ObjectId') {
    return res.status(400).json({ msg: 'User id is invalid' });
  }
  console.log(err)
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
