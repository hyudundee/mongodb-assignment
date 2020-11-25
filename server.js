const { check, validationResult } = require('express-validator');
const User = require('./models/User');
const Post = require('./models/Post');


const express = require('express');
const connectDB = require('./config/db');
const app = express();

const bodyParser = require("body-parser");

// Connect database
connectDB();

// Init Middleware
app.use(express.json({extended: false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.set('view engine', 'ejs');
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// app.get('/test', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));


// main page
app.get('/', async (req, res) => {
  try {
    const user = await User.find().sort({ date: -1 });
    const post = await Post.find().sort({ date: -1 })
    res.render("users/user", { users: user, posts: post });
    // res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});



// Users CRUD operation

app.get('/user/one', (req, res) => {
  console.log(req.body)
  res.send('hi')
})

app.post('/user/geta', (req, res) => {
  console.log(req.body.id)
  res.send('hi')
})
app.post('/delete', (req, res) => {
  console.log(req.body)
  res.send('hi')
})

app.post('/api/users/update', (req, res) => {
  console.log(req.body)
})