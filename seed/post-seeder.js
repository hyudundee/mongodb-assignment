const Post = require('../models/Post');
const mongoose = require('mongoose');

try {
  mongoose.connect("mongodb+srv://peteryu:peteryu@cluster0.y73ab.mongodb.net/Cluster0?retryWrites=true&w=majority");
  const posts = [
    new Post({
      user: "5fbdc561c95cd02360302274",
      text: "I take baseball course this afternoon",
      name: "Jessie Fry"
    }),
    new Post({
      user: "5fbdc561c95cd02360302275",
      text: "I feel lucky today",
      name: "Hugo Orr"
    }),
    new Post({
      user: "5fbdc561c95cd02360302276",
      text: "I have bacon and eggs for breakfirst",
      name: "Addison Case"
    }),
    new Post({
      user: "5fbdc561c95cd02360302277",
      text: "I have brocallis and tomatoes for breakfirst",
      name: "Brittany Schmidt"
    }),
    new Post({
      user: "5fbdc561c95cd02360302278",
      text: "I have brocallis and tomatoes for breakfirst",
      name: "Miller Richardson"
    }),
    new Post({
      user: "5fbdc561c95cd02360302274",
      text: "I have brocallis and milk and butter for breakfirst",
      name: "Miller Richardson"
    }),new Post({
      user: "5fbdc561c95cd02360302274",
      text: "I take football course this afternoon",
      name: "Jessie Fry"
    }),
    new Post({
      user: "5fbdc561c95cd02360302275",
      text: "I feel not so lucky today",
      name: "Hugo Orr"
    }),
    new Post({
      user: "5fbdc561c95cd02360302276",
      text: "I have bacon and bread for breakfirst",
      name: "Addison Case"
    }),
    new Post({
      user: "5fbdc561c95cd02360302277",
      text: "I have brocallis and steak for breakfirst",
      name: "Brittany Schmidt"
    }),
    new Post({
      user: "5fbdc561c95cd02360302278",
      text: "I have mushrooms and tomatoes for breakfirst",
      name: "Miller Richardson"
    }),
  ]
  let done = 0; 
  for (let i = 0; i < posts.length; i++) {
    posts[i].save(() => {
      done++;
      if (done === posts.length) {
        console.log(posts);
        mongoose.disconnect();
      }
    });
  }
} catch (err) {
  console.error(err.message33);
  process.exit(1);
}